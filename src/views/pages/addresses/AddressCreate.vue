<template>
    <div>
        <h1>Crear Direccion</h1>
        <AddressForm @submit="createAddress" />
    </div>
</template>

<script setup lang="ts">
import AddressForm from '@/components/addresses/AddressForm.vue';
</script>