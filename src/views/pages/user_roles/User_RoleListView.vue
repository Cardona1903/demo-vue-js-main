<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">Asignaciones de Roles</h1>

      <router-link
        to="/user-roles/create"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Asignar Rol a Usuario
      </router-link>

      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 rounded-lg bg-white">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="px-4 py-2 border">Usuario</th>
              <th class="px-4 py-2 border">Rol</th>
              <th class="px-4 py-2 border">Inicio</th>
              <th class="px-4 py-2 border">Fin</th>
              <th class="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="ur in userRoles"
              :key="ur.id"
              class="hover:bg-gray-100 transition"
            >
              <td class="px-4 py-2 border">{{ ur.user?.name || '—' }}</td>
              <td class="px-4 py-2 border">{{ ur.role?.name || '—' }}</td>
              <td class="px-4 py-2 border">{{ formatDate(ur.startAt) }}</td>
              <td class="px-4 py-2 border">{{ formatDate(ur.endAt) }}</td>
              <td class="px-4 py-2 border flex space-x-4">
                <router-link
                  :to="`/user-roles/update/${ur.id}`"
                  class="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <PencilIcon class="w-5 h-5 mr-1" />
                  Editar
                </router-link>
                <button
                  @click="deleteUserRole(ur.id)"
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
import { useUserRoleStore } from '@/store/UserRoleStore';
import { onMounted, computed } from 'vue';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next';

const store = useUserRoleStore();

onMounted(() => {
  store.fetchUserRoles();
});

const userRoles = computed(() => store.userRoles);

const deleteUserRole = async (id?: string) => {
  if (!id) return;
  await store.removeUserRole(id);
  await store.fetchUserRoles();
};

const formatDate = (date?: Date) => {
  return date ? new Date(date).toLocaleDateString() : '—';
};
</script>
