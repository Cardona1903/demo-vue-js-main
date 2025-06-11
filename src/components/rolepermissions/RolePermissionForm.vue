<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { RolePermission } from '@/models/RolePermission';
import type { Role } from '@/models/Role';
import type { Permission } from '@/models/Permission';

const props = defineProps<{
  modelValue: RolePermission;
  submitting?: boolean;
  rolesList?: Role[];
  permissionsList?: Permission[];
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localRolePermission = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(localRolePermission, newVal);
});

const updateField = (field: keyof RolePermission, value: any) => {
  localRolePermission[field] = value;
  emit('update:modelValue', { ...localRolePermission });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="role">Rol:</label>
      <select
        id="role"
        v-model="localRolePermission.role"
        @change="updateField('role', localRolePermission.role)"
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
      <label for="permission">Permiso:</label>
      <select
        id="permission"
        v-model="localRolePermission.permission"
        @change="updateField('permission', localRolePermission.permission)"
      >
        <option disabled value="">Selecciona un permiso</option>
        <option
          v-for="permission in permissionsList"
          :key="permission.id"
          :value="permission"
        >
          {{ permission.entity }} - {{ permission.method }}
        </option>
      </select>
    </div>

    <div>
      <label for="startAt">Inicio:</label>
      <input
        id="startAt"
        type="date"
        v-model="localRolePermission.startAt"
        @input="updateField('startAt', localRolePermission.startAt)"
      />
    </div>

    <div>
      <label for="endAt">Fin:</label>
      <input
        id="endAt"
        type="date"
        v-model="localRolePermission.endAt"
        @input="updateField('endAt', localRolePermission.endAt)"
      />
    </div>

    <div>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Asignación' }}
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
