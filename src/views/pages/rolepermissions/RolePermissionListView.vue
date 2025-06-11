<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Permisos por Rol</h1>

      <router-link
        to="/role-permissions/create"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Asignar Permiso a Rol
      </router-link>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="px-4 py-2 border">Rol</th>
              <th class="px-4 py-2 border">Permiso</th>
              <th class="px-4 py-2 border">Inicio</th>
              <th class="px-4 py-2 border">Fin</th>
              <th class="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rp in rolePermissions" :key="rp.id" class="hover:bg-gray-100 transition">
              <td class="px-4 py-2 border">{{ rp.role?.name }}</td>
              <td class="px-4 py-2 border">{{ rp.permission?.method }} {{ rp.permission?.url }}</td>
              <td class="px-4 py-2 border">{{ formatDate(rp.startAt) }}</td>
              <td class="px-4 py-2 border">{{ formatDate(rp.endAt) }}</td>
              <td class="px-4 py-2 border flex space-x-4">
                <router-link
                  :to="`/role-permissions/update/${rp.id}`"
                  class="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <PencilIcon class="w-5 h-5 mr-1" />
                  Editar
                </router-link>
                <button
                  @click="deleteRolePermission(rp.id)"
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
import { useRolePermissionStore } from '@/store/RolePermissionStore';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next';

const store = useRolePermissionStore();

onMounted(() => {
  store.fetchRolePermissions();
});

const rolePermissions = computed(() => store.rolePermissions);

const deleteRolePermission = async (id?: string) => {
  if (!id) return;
  await store.removeRolePermission(id);
  await store.fetchRolePermissions();
};

const formatDate = (date?: Date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString();
};
</script>
