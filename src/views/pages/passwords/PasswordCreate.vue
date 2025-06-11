<template>
    <div>
        <h1>Crear Contraseña</h1>
        <PasswordForm @submit="createPassword" />
    </div>
</template>

<script setup lang="ts">
import PasswordForm from '@/components/passwords/PasswordForm.vue';
</script>