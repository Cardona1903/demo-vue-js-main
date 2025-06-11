<template>
    <div>
        <h1>Editar Rol</h1>
        <RoleForm v-if="route.params.id" :RoleId="parseInt(route.params.id)" @submit="updateRole" />
    </div>
</template>

<script setup lang="ts">
import { Roleoute } from 'vue-router';
import RoleForm from '@/components/roles/RoleForm.vue';
const route = Roleoute();
</script>
