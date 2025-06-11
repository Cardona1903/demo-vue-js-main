<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Permission } from '@/models/Permission';

const props = defineProps<{
  modelValue: Permission;
  submitting?: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localPermission = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(localPermission, newVal);
});

const updateField = (field: keyof Permission, value: any) => {
  localPermission[field] = value;
  emit('update:modelValue', { ...localPermission });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="url">URL:</label>
      <input
        id="url"
        type="text"
        v-model="localPermission.url"
        @input="updateField('url', localPermission.url)"
      />
    </div>

    <div>
      <label for="method">Método HTTP:</label>
      <select
        id="method"
        v-model="localPermission.method"
        @change="updateField('method', localPermission.method)"
      >
        <option disabled value="">Seleccione un método</option>
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
        <option>PATCH</option>
      </select>
    </div>

    <div>
      <label for="entity">Entidad:</label>
      <input
        id="entity"
        type="text"
        v-model="localPermission.entity"
        @input="updateField('entity', localPermission.entity)"
      />
    </div>

    <div>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Permiso' }}
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
input,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #4a90e2;
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
