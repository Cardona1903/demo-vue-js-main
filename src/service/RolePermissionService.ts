import axios from 'axios';
import type { RolePermission } from '../models/RolePermission';

const API_URL = import.meta.env.VITE_API_URL + "/role-permissions";

class RolePermissionService {
    async getRolePermissions() {
        const response = await axios.get<RolePermission[]>(API_URL);
        return response;
    }

    async getRolePermission(id: string) {
        const response = await axios.get<RolePermission>(`${API_URL}/${id}`);
        return response;
    }

    async createRolePermission(rolePermission: RolePermission) {
        const response = await axios.post<RolePermission>(API_URL, rolePermission);
        return response;
    }

    async updateRolePermission(id: string, rolePermission: RolePermission) {
        const response = await axios.put<RolePermission>(`${API_URL}/${id}`, rolePermission);
        return response;
    }

    async deleteRolePermission(id: string) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new RolePermissionService();