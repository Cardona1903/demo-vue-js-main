<template>
    <div>
        <h1>Editar Usuario - Rol</h1>
        <UserRoleForm v-if="route.params.id" :UserRoleId="parseInt(route.params.id)" @submit="updateUserRole" />
    </div>
</template>

<script setup lang="ts">
import { UserRoleoute } from 'vue-router';
import UserRoleForm from '@/components/user_roles/UserRoleForm.vue';
const route = UserRoleoute();
</script>
