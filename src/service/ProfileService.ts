// src/services/ProfileService.ts
import api from './axiosConfig';
import type { Profile } from '../models/Profile';

class ProfileService {
  async getProfiles(): Promise<Profile[]> {
    try {
      const response = await api.get('/api/profiles/');
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  }

  async getProfile(id: number): Promise<Profile> {
    try {
      const response = await api.get(`/api/profiles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching profile ${id}:`, error);
      throw error;
    }
  }

  async getProfileByUser(userId: number): Promise<Profile> {
    try {
      const response = await api.get(`/api/profiles/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching profile for user ${userId}:`, error);
      throw error;
    }
  }

  async createProfile(userId: number, profileData: FormData): Promise<Profile> {
    try {
      const response = await api.post(`/api/profiles/user/${userId}`, profileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  async updateProfile(id: number, profileData: FormData): Promise<Profile> {
    try {
      const response = await api.put(`/api/profiles/${id}`, profileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating profile ${id}:`, error);
      throw error;
    }
  }

  async deleteProfile(id: number): Promise<void> {
    try {
      await api.delete(`/api/profiles/${id}`);
    } catch (error) {
      console.error(`Error deleting profile ${id}:`, error);
      throw error;
    }
  }

  async getProfileImage(filename: string): Promise<string> {
    try {
      return `${import.meta.env.VITE_API_URL}/api/profiles/${filename}`;
    } catch (error) {
      console.error(`Error getting image URL for ${filename}:`, error);
      throw error;
    }
  }
}

export default new ProfileService();
