<template>
    <div>
        <h1>Crear User</h1>
        <UserForm v-model="form" :onSubmit="createUser" @submit="createUser" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserForm from '@/components/users/UserForm.vue';

// Define the reactive form object
const form = ref({});

// Define the createUser function
function createUser() {
    // Implement User creation logic here
    console.log('User created:', form.value);
}
</script>