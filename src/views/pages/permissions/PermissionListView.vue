<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Permisos</h1>

      <router-link
        to="createPermission"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Crear Permiso
      </router-link>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="px-4 py-2 border">URL</th>
              <th class="px-4 py-2 border">Método</th>
              <th class="px-4 py-2 border">Entidad</th>
              <th class="px-4 py-2 border">Roles</th>
              <th class="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="permission in permissions" :key="permission.id" class="hover:bg-gray-100 transition">
              <td class="px-4 py-2 border">{{ permission.url }}</td>
              <td class="px-4 py-2 border">{{ permission.method }}</td>
              <td class="px-4 py-2 border">{{ permission.entity }}</td>
              <td class="px-4 py-2 border">
                <ul>
                  <li v-for="role in permission.roles" :key="role.id">{{ role.name }}</li>
                </ul>
              </td>
              <td class="px-4 py-2 border flex space-x-4">
                <router-link
                  :to="`/permissions/update/${permission.id}`"
                  class="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <PencilIcon class="w-5 h-5 mr-1" />
                  Editar
                </router-link>
                <button
                  @click="deletePermission(permission.id)"
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
import { usePermissionStore } from '@/store/PermissionStore';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next';

const store = usePermissionStore();

onMounted(() => {
  store.fetchPermissions();
});

const permissions = computed(() => store.permissions);

const deletePermission = async (id?: number) => {
  if (!id) return;
  await store.removePermission(id);
  await store.fetchPermissions();
};
</script>
