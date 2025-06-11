import type { RolePermission } from '@/models/RolePermission';
import RolePermissionService from '@/service/RolePermissionService';
import { defineStore } from 'pinia';

export const useRolePermissionStore = defineStore('rolePermissionStore', {
    state: () => ({
        rolePermissions: [] as RolePermission[],
    }),
    actions: {
        async fetchRolePermissions() {
            let response = await RolePermissionService.getRolePermissions();
            this.rolePermissions = response.data;
            return this.rolePermissions;
        },
        async getRolePermission(id: string) {
            return await RolePermissionService.getRolePermission(id);
        },
        async addRolePermission(rolePermission: RolePermission) {
            return await RolePermissionService.createRolePermission(rolePermission);
        },
        async editRolePermission(id: string, rolePermission: RolePermission) {
            return await RolePermissionService.updateRolePermission(id, rolePermission);
        },
        async removeRolePermission(id: string) {
            return await RolePermissionService.deleteRolePermission(id);
        },
    }
});