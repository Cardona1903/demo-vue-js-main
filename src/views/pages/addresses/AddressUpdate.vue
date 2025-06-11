<template>
    <div>
        <h1>Editar Direccion</h1>
        <AddressForm v-if="route.params.id" :AddressId="parseInt(route.params.id)" @submit="updateAddress" />
    </div>
</template>

<script setup lang="ts">
import { Addressoute } from 'vue-router';
import AddressForm from '@/components/addresss/AddressForm.vue';
const route = Addressoute();
</script>
