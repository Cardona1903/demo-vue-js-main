<template>
    <div>
        <h1>Crear Usuario - Rol</h1>
        <UserRoleForm @submit="createUserRole" />
    </div>
</template>

<script setup lang="ts">
import UserRoleForm from '@/components/user_roles/UserRoleForm.vue';
</script>