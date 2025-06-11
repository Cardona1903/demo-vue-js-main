<template>
    <div>
        <h1>Crear Rol - Permiso</h1>
        <RolePermissionForm @submit="createRolePermission" />
    </div>
</template>

<script setup lang="ts">
import RolePermissionForm from '@/components/rolepermissions/RolePermissionForm.vue';
</script>