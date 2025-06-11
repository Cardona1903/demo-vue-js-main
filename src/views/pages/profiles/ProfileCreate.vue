<template>
    <div>
        <h1>Crear Perfil</h1>
        <ProfileForm v-model="form" :onSubmit="createProfile" @submit="createProfile" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProfileForm from '@/components/profiles/ProfileForm.vue';

// Define the reactive form object
const form = ref({});

// Define the createProfile function
function createProfile() {
    // Implement profile creation logic here
    console.log('Profile created:', form.value);
}
</script>