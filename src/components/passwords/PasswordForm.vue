<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Password } from '@/models/Password';

const props = defineProps<{
  modelValue: Password;
  submitting?: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localPassword = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(localPassword, newVal);
});

const updateField = (field: keyof Password, value: any) => {
  localPassword[field] = value;
  emit('update:modelValue', { ...localPassword });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="content">Contraseña:</label>
      <input
        id="content"
        type="password"
        v-model="localPassword.content"
        @input="updateField('content', localPassword.content)"
      />
    </div>

    <div>
      <label for="startAt">Fecha de inicio:</label>
      <input
        id="startAt"
        type="date"
        v-model="localPassword.startAt"
        @input="updateField('startAt', localPassword.startAt)"
      />
    </div>

    <div>
      <label for="endAt">Fecha de fin:</label>
      <input
        id="endAt"
        type="date"
        v-model="localPassword.endAt"
        @input="updateField('endAt', localPassword.endAt)"
      />
    </div>

    <div>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Contraseña' }}
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
input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #38b2ac;
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
