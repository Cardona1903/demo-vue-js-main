<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Roles</h1>

      <router-link
        to="/createRole"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Crear Rol
      </router-link>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="px-4 py-2 border">Nombre</th>
              <th class="px-4 py-2 border">Descripción</th>
              <th class="px-4 py-2 border">Usuarios asignados</th>
              <th class="px-4 py-2 border">Permisos</th>
              <th class="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-100 transition">
              <td class="px-4 py-2 border">{{ role.name }}</td>
              <td class="px-4 py-2 border">{{ role.description }}</td>
              <td class="px-4 py-2 border">{{ role.users?.length || 0 }}</td>
              <td class="px-4 py-2 border">
                <ul>
                  <li v-for="perm in role.permissions" :key="perm.id" class="text-sm">
                    {{ perm.method }} {{ perm.url }}
                  </li>
                </ul>
              </td>
              <td class="px-4 py-2 border flex space-x-4">
                <router-link
                  :to="`/roles/update/${role.id}`"
                  class="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <PencilIcon class="w-5 h-5 mr-1" />
                  Editar
                </router-link>
                <button
                  @click="deleteRole(role.id)"
                  class="text-red-600 hover:text-red-800 flex items-center"
                >
                  <TrashIcon class="w-5 h-5 mr-1" />
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoleStore } from '@/store/RoleStore';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next';

const store = useRoleStore();

onMounted(() => {
  store.fetchRoles();
});

const roles = computed(() => store.roles);

const deleteRole = async (id?: number) => {
  if (!id) return;
  await store.removeRole(id);
  await store.fetchRoles();
};
</script>
