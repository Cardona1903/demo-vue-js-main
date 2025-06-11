<template>
    <div>
        <h1>Crear Rol</h1>
        <RoleForm @submit="createRole" />
    </div>
</template>

<script setup lang="ts">
import RoleForm from '@/components/roles/RoleForm.vue';
</script>