<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Direcciones</h1>

      <router-link
        to="/createAddress"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Crear Dirección
      </router-link>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="px-4 py-2 border">Calle</th>
              <th class="px-4 py-2 border">Número</th>
              <th class="px-4 py-2 border">Latitud</th>
              <th class="px-4 py-2 border">Longitud</th>
              <th class="px-4 py-2 border">Usuario</th>
              <th class="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="address in addresses" :key="address.id" class="hover:bg-gray-100 transition">
              <td class="px-4 py-2 border">{{ address.street }}</td>
              <td class="px-4 py-2 border">{{ address.number }}</td>
              <td class="px-4 py-2 border">{{ address.latitude }}</td>
              <td class="px-4 py-2 border">{{ address.longitude }}</td>
              <td class="px-4 py-2 border">{{ address.user?.name || '—' }}</td>
              <td class="px-4 py-2 border flex space-x-4">
                <router-link
                  :to="`/addresses/update/${address.id}`"
                  class="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <PencilIcon class="w-5 h-5 mr-1" />
                  Editar
                </router-link>
                <button
                  @click="deleteAddress(address.id)"
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
import { onMounted, computed } from 'vue';
import { useAddressStore } from '@/store/AddressStore';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next';

const store = useAddressStore();

onMounted(() => {
  store.fetchAddresses();
});

const addresses = computed(() => store.addresses);

const deleteAddress = async (id?: number) => {
  if (!id) return;
  await store.removeAddress(id);
  await store.fetchAddresses();
};
</script>
