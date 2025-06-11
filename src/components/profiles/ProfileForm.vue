<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Profile } from '@/models/Profile';

const props = defineProps<{
  modelValue: Profile;
  submitting?: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localProfile = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(localProfile, newVal);
});

const updateField = (field: keyof Profile, value: any) => {
  localProfile[field] = value;
  emit('update:modelValue', { ...localProfile });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="phone">Teléfono:</label>
      <input
        id="phone"
        type="text"
        v-model="localProfile.phone"
        @input="updateField('phone', localProfile.phone)"
      />
    </div>

    <div>
      <label for="photo">Foto (URL):</label>
      <input
        id="photo"
        type="text"
        v-model="localProfile.photo"
        @input="updateField('photo', localProfile.photo)"
      />
    </div>

    <div>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Perfil' }}
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
