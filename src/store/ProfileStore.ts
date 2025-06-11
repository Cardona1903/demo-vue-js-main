// src/stores/ProfileStore.ts
import { defineStore } from 'pinia';
import type { Profile } from '@/models/Profile';
import ProfileService from '@/service/ProfileService';

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    profiles: [] as Profile[],
    currentProfile: null as Profile | null,
    userProfile: null as Profile | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProfiles() {
      this.loading = true;
      this.error = null;
      try {
        this.profiles = await ProfileService.getProfiles();
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch profiles';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProfile(id: number) {
      this.loading = true;
      this.error = null;
      try {
        this.currentProfile = await ProfileService.getProfile(id);
      } catch (error: any) {
        this.error = error.message || `Failed to fetch profile ${id}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProfileByUser(userId: number) {
      this.loading = true;
      this.error = null;
      try {
        this.userProfile = await ProfileService.getProfileByUser(userId);
      } catch (error: any) {
        this.error = error.message || `Failed to fetch profile for user ${userId}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createProfile(userId: number, profileData: FormData) {
      this.loading = true;
      this.error = null;
      try {
        const createdProfile = await ProfileService.createProfile(userId, profileData);
        this.profiles.push(createdProfile);
        return createdProfile;
      } catch (error: any) {
        this.error = error.message || 'Failed to create profile';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(id: number, profileData: FormData) {
      this.loading = true;
      this.error = null;
      try {
        const updatedProfile = await ProfileService.updateProfile(id, profileData);
        const index = this.profiles.findIndex(p => p.id === id);
        if (index !== -1) {
          this.profiles[index] = updatedProfile;
        }
        if (this.currentProfile?.id === id) {
          this.currentProfile = updatedProfile;
        }
        if (this.userProfile?.id === id) {
          this.userProfile = updatedProfile;
        }
        return updatedProfile;
      } catch (error: any) {
        this.error = error.message || `Failed to update profile ${id}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProfile(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await ProfileService.deleteProfile(id);
        this.profiles = this.profiles.filter(profile => profile.id !== id);
        if (this.currentProfile?.id === id) {
          this.currentProfile = null;
        }
        if (this.userProfile?.id === id) {
          this.userProfile = null;
        }
      } catch (error: any) {
        this.error = error.message || `Failed to delete profile ${id}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getProfileImageUrl(filename: string): Promise<string> {
      try {
        return await ProfileService.getProfileImage(filename);
      } catch (error: any) {
        this.error = error.message || `Failed to get image URL for ${filename}`;
        throw error;
      }
    }
  },
  getters: {
    getProfileById: (state) => (id: number) => {
      return state.profiles.find(profile => profile.id === id);
    },
  },
});