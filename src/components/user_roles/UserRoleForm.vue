<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { UserRole } from '@/models/UserRole';
import type { User } from '@/models/User';
import type { Role } from '@/models/Role';

const props = defineProps<{
  modelValue: UserRole;
  submitting?: boolean;
  usersList?: User[];
  rolesList?: Role[];
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localUserRole = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(localUserRole, newVal);
});

const updateField = (field: keyof UserRole, value: any) => {
  localUserRole[field] = value;
  emit('update:modelValue', { ...localUserRole });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="startAt">Inicio:</label>
      <input
        id="startAt"
        type="datetime-local"
        v-model="localUserRole.startAt"
        @input="updateField('startAt', localUserRole.startAt)"
      />
    </div>

    <div>
      <label for="endAt">Fin:</label>
      <input
        id="endAt"
        type="datetime-local"
        v-model="localUserRole.endAt"
        @input="updateField('endAt', localUserRole.endAt)"
      />
    </div>

    <div>
      <label for="user">Usuario:</label>
      <select
        id="user"
        v-model="localUserRole.user"
        @change="updateField('user', localUserRole.user)"
      >
        <option disabled value="">Selecciona un usuario</option>
        <option
          v-for="user in usersList"
          :key="user.id"
          :value="user"
        >
          {{ user.username }}
        </option>
      </select>
    </div>

    <div>
      <label for="role">Rol:</label>
      <select
        id="role"
        v-model="localUserRole.role"
        @change="updateField('role', localUserRole.role)"
      >
        <option disabled value="">Selecciona un rol</option>
        <option
          v-for="role in rolesList"
          :key="role.id"
          :value="role"
        >
          {{ role.name }}
        </option>
      </select>
    </div>

    <div>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Relación' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  font-weight: bold;
}
input, select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #38a169;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
