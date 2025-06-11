<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { Address } from '@/models/Address';
import { useRouter } from 'vue-router';

const props = defineProps<{
  modelValue: Address,
  submitting?: boolean
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localAddress = reactive({ ...props.modelValue });
watch(() => props.modelValue, (newVal) => {
  Object.assign(localAddress, newVal);
});

const updateField = (field: keyof Address, value: any) => {
  localAddress[field] = value;
  emit('update:modelValue', { ...localAddress });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="street">Calle:</label>
      <input
        id="street"
        type="text"
        v-model="localAddress.street"
        @input="updateField('street', localAddress.street)"
      />
    </div>

    <div>
      <label for="number">Número:</label>
      <input
        id="number"
        type="text"
        v-model="localAddress.number"
        @input="updateField('number', localAddress.number)"
      />
    </div>

    <div>
      <label for="latitude">Latitud:</label>
      <input
        id="latitude"
        type="number"
        step="any"
        v-model="localAddress.latitude"
        @input="updateField('latitude', localAddress.latitude)"
      />
    </div>

    <div>
      <label for="longitude">Longitud:</label>
      <input
        id="longitude"
        type="number"
        step="any"
        v-model="localAddress.longitude"
        @input="updateField('longitude', localAddress.longitude)"
      />
    </div>

    <div>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Dirección' }}
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
  background-color: #3490dc;
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
