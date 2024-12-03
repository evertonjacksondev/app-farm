import axios, { AxiosInstance } from 'axios';
import { CreateAgricultureDTO } from '../dto/Create-Agriculture-dto';
import { UpdateAgricultureDTO } from '../dto/Update-Agriculture-dto';

export class AgricultureRequest {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://application.integraja.com.br:8001/v1/cultura',
    });
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro inesperado na API de Agricultura');
    }
    throw error;
  }

  async getAgricultureList(page = 1, limit = 10): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      const response = await this.instance.get('/list', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createAgriculture(data: CreateAgricultureDTO): Promise<any> {
    try {
      const response = await this.instance.post('/', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async getAgricultureById(id: number): Promise<any> {
    try {
      const response = await this.instance.get(`/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateAgriculture(id: number, data: UpdateAgricultureDTO): Promise<any> {
    try {
      const response = await this.instance.put(`/${id}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteAgriculture(id: number): Promise<void> {
    try {
      const response = await this.instance.delete(`/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
