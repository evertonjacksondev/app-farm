import axios, { AxiosInstance } from 'axios';
import { ProducerDto } from '../dto/Producer-dto';

export class ProducerRequest {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://application.integraja.com.br:8001/v1/producer',
    });
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Unexpected Axios error');
    }
    throw error;
  }

  async createProducer(data: ProducerDto): Promise<any> {
    try {
      const response = await this.instance.post('', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getProducerList(page = 1, limit = 10): Promise<any> {
    try {
      const response = await this.instance.get('/list', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getProducerById(id: number): Promise<any> {
    try {
      const response = await this.instance.get(`/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateProducer(id: number, data: ProducerDto): Promise<any> {
    try {
      const response = await this.instance.put(`/${id}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteProducer(id: number): Promise<any> {
    try {
      const response = await this.instance.delete(`/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
