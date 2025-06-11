<template>
    <div>
        <h1>Editar Rol - Permiso</h1>
        <RolePermissionForm v-if="route.params.id" :RolePermissionId="parseInt(route.params.id)" @submit="updateRolePermission" />
    </div>
</template>

<script setup lang="ts">
import { RolePermissionoute } from 'vue-router';
import RolePermissionForm from '@/components/rolepermissions/RolePermissionForm.vue';
const route = RolePermissionoute();
</script>
