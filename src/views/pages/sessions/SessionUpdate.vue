<template>
    <div>
        <h1>Editar Sesion</h1>
        <SessionForm v-if="route.params.id" :SessionId="parseInt(route.params.id)" @submit="updateSession" />
    </div>
</template>

<script setup lang="ts">
import { Sessionoute } from 'vue-router';
import SessionForm from '@/components/sessions/SessionForm.vue';
const route = Sessionoute();
</script>
