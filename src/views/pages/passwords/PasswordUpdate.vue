<template>
    <div>
        <h1>Editar Contraseña</h1>
        <PasswordForm v-if="route.params.id" :PasswordId="parseInt(route.params.id)" @submit="updatePassword" />
    </div>
</template>

<script setup lang="ts">
import { Passwordoute } from 'vue-router';
import PasswordForm from '@/components/passwords/PasswordForm.vue';
const route = Passwordoute();
</script>
