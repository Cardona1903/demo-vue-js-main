// src/stores/UserStore.ts
import { defineStore } from 'pinia';
import type { User } from '@/models/User';
import UserService from '@/service/UserService';

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    Users: [] as User[],
    currentUser: null as User | null,
    userUser: null as User | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        this.Users = await UserService.getUsers();
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch Users';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchUser(id: number) {
      this.loading = true;
      this.error = null;
      try {
        this.currentUser = await UserService.getUser(id);
      } catch (error: any) {
        this.error = error.message || `Failed to fetch User ${id}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserByUser(userId: number) {
      this.loading = true;
      this.error = null;
      try {
        this.userUser = await UserService.getUserByUser(userId);
      } catch (error: any) {
        this.error = error.message || `Failed to fetch User for user ${userId}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createUser(userId: number, UserData: FormData) {
      this.loading = true;
      this.error = null;
      try {
        const createdUser = await UserService.createUser(userId, UserData);
        this.Users.push(createdUser);
        return createdUser;
      } catch (error: any) {
        this.error = error.message || 'Failed to create User';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateUser(id: number, UserData: FormData) {
      this.loading = true;
      this.error = null;
      try {
        const updatedUser = await UserService.updateUser(id, UserData);
        const index = this.Users.findIndex(p => p.id === id);
        if (index !== -1) {
          this.Users[index] = updatedUser;
        }
        if (this.currentUser?.id === id) {
          this.currentUser = updatedUser;
        }
        if (this.userUser?.id === id) {
          this.userUser = updatedUser;
        }
        return updatedUser;
      } catch (error: any) {
        this.error = error.message || `Failed to update User ${id}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await UserService.deleteUser(id);
        this.Users = this.Users.filter(User => User.id !== id);
        if (this.currentUser?.id === id) {
          this.currentUser = null;
        }
        if (this.userUser?.id === id) {
          this.userUser = null;
        }
      } catch (error: any) {
        this.error = error.message || `Failed to delete User ${id}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getUserImageUrl(filename: string): Promise<string> {
      try {
        return await UserService.getUserImage(filename);
      } catch (error: any) {
        this.error = error.message || `Failed to get image URL for ${filename}`;
        throw error;
      }
    }
  },
  getters: {
    getUserById: (state) => (id: number) => {
      return state.Users.find(User => User.id === id);
    },
  },
});