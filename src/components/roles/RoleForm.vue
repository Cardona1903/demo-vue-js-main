<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Role } from '@/models/Role';
// import type { Permission } from '@/models/Permission'; // Solo si usas la sección de permisos

const props = defineProps<{
  modelValue: Role;
  submitting?: boolean;
  // permissionsList?: Permission[]; // Descomenta si deseas gestionar permisos
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const localRole = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(localRole, newVal);
});

const updateField = (field: keyof Role, value: any) => {
  localRole[field] = value;
  emit('update:modelValue', { ...localRole });
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="name">Nombre del Rol:</label>
      <input
        id="name"
        type="text"
        v-model="localRole.name"
        @input="updateField('name', localRole.name)"
      />
    </div>

    <div>
      <label for="description">Descripción:</label>
      <textarea
        id="description"
        v-model="localRole.description"
        @input="updateField('description', localRole.description)"
      ></textarea>
    </div>

    <!--
    <div>
      <label>Permisos:</label>
      <div v-if="permissionsList?.length">
        <div v-for="permission in permissionsList" :key="permission.id">
          <input
            type="checkbox"
            :value="permission"
            :checked="localRole.permissions?.some(p => p.id === permission.id)"
            @change="(e) => {
              const checked = (e.target as HTMLInputElement).checked;
              if (checked) {
                localRole.permissions = [...(localRole.permissions || []), permission];
              } else {
                localRole.permissions = localRole.permissions?.filter(p => p.id !== permission.id);
              }
              updateField('permissions', localRole.permissions);
            }"
          />
          {{ permission.entity }} - {{ permission.method }}
        </div>
      </div>
    </div>
    -->

    <div>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Guardar Rol' }}
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
input, textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}
button {
  background-color: #2e86de;
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
