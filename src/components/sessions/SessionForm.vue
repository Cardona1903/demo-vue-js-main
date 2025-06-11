<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Session } from '@/models/Session';
import type { User } from '@/models/User';

const props = defineProps<{
  modelValue: Session;
  submitting?: boolean;
  usersList?: User[];
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localSession = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(localSession, newVal);
});

const updateField = (field: keyof Session, value: any) => {
  localSession[field] = value;
  emit('update:modelValue', { ...localSession });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="token">Token:</label>
      <input
        id="token"
        type="text"
        v-model="localSession.token"
        @input="updateField('token', localSession.token)"
      />
    </div>

    <div>
      <label for="expiration">Expiración:</label>
      <input
        id="expiration"
        type="datetime-local"
        v-model="localSession.expiration"
        @input="updateField('expiration', localSession.expiration)"
      />
    </div>

    <div>
      <label for="FACode">Código 2FA:</label>
      <input
        id="FACode"
        type="text"
        v-model="localSession.FACode"
        @input="updateField('FACode', localSession.FACode)"
      />
    </div>

    <div>
      <label for="state">Estado:</label>
      <input
        id="state"
        type="text"
        v-model="localSession.state"
        @input="updateField('state', localSession.state)"
      />
    </div>

    <div>
      <label for="user">Usuario:</label>
      <select
        id="user"
        v-model="localSession.user"
        @change="updateField('user', localSession.user)"
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
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Sesión' }}
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
  background-color: #3182ce;
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
