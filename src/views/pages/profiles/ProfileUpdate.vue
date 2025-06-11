<template>
    <div>
        <h1>Editar Perfil</h1>
        <ProfileForm v-if="route.params.id" :ProfileId="parseInt(route.params.id)" @submit="updateProfile" />
    </div>
</template>

<script setup lang="ts">
import { Profileoute } from 'vue-router';
import ProfileForm from '@/components/profiles/ProfileForm.vue';
const route = Profileoute();
</script>
