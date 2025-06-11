<template>
    <div>
        <h1>Editar User</h1>
        <UserForm
            v-if="UserId !== null"
            :UserId="UserId"
            :modelValue="User"
            @submit="updateUser"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UserForm from '@/components/users/UserForm.vue';

const route = useRoute();
const UserId = ref<number | null>(null);
const User = ref<any>({}); // Replace 'any' with your User type if available

onMounted(() => {
    const idParam = route.params.id;
    // Ensure idParam is a string before parsing
    if (typeof idParam === 'string') {
        UserId.value = parseInt(idParam, 10);
    } else if (Array.isArray(idParam) && typeof idParam[0] === 'string') {
        UserId.value = parseInt(idParam[0], 10);
    } else {
        UserId.value = null;
    }
    // TODO: Fetch the User data by UserId and assign to 'User.value'
});

function updateUser(updatedUser: any) {
    // TODO: Implement the update logic
    // For example, send updatedUser to your API
    User.value = updatedUser;
}
</script>
