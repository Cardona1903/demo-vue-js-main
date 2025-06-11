<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { User } from '@/models/User';

const props = defineProps<{
  modelValue: User;
  submitting?: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localUser = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(localUser, newVal);
});

const updateField = (field: keyof User, value: any) => {
  localUser[field] = value;
  emit('update:modelValue', { ...localUser });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="name">Nombre:</label>
      <input
        id="name"
        type="text"
        v-model="localUser.name"
        @input="updateField('name', localUser.name)"
        required
      />
    </div>

    <div>
      <label for="email">Email:</label>
      <input
        id="email"
        type="email"
        v-model="localUser.email"
        @input="updateField('email', localUser.email)"
        required
      />
    </div>

    <div>
      <label for="password">Contraseña:</label>
      <input
        id="password"
        type="password"
        v-model="localUser.password"
        @input="updateField('password', localUser.password)"
        :required="!localUser.id"
      />
    </div>

    <div>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Usuario' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
/* Estilos iguales a ProfileForm.vue */
</style>