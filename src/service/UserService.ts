// src/services/UserService.ts
import api from './axiosConfig';
import type { User } from '../models/User';

class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get('/api/Users/');
      return response.data;
    } catch (error) {
      console.error('Error fetching Users:', error);
      throw error;
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const response = await api.get(`/api/Users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching User ${id}:`, error);
      throw error;
    }
  }

  async getUserByUser(userId: number): Promise<User> {
    try {
      const response = await api.get(`/api/Users/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching User for user ${userId}:`, error);
      throw error;
    }
  }

  async createUser(userId: number, UserData: FormData): Promise<User> {
    try {
      const response = await api.post(`/api/Users/user/${userId}`, UserData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error);
      throw error;
    }
  }

  async updateUser(id: number, UserData: FormData): Promise<User> {
    try {
      const response = await api.put(`/api/Users/${id}`, UserData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating User ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/api/Users/${id}`);
    } catch (error) {
      console.error(`Error deleting User ${id}:`, error);
      throw error;
    }
  }

  async getUserImage(filename: string): Promise<string> {
    try {
      return `${import.meta.env.VITE_API_URL}/api/Users/${filename}`;
    } catch (error) {
      console.error(`Error getting image URL for ${filename}:`, error);
      throw error;
    }
  }
}

export default new UserService();
