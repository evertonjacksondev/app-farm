import axios, { AxiosInstance } from 'axios';
import { CreateFarmDto } from '../dto/Farm-dto';

export class FarmRequest {
    private instance: AxiosInstance;

    constructor() {
      this.instance = axios.create({
        baseURL: 'https://application.integraja.com.br:8001/v1/farm',
      });
    }
  async createFarm(data: CreateFarmDto) {
    try {
      const response = await this.instance.post('/', data);
      return response.data;
    } catch ({ response }: any) {
      throw response?.data || 'Erro ao criar fazenda';
    }
  }

  async listFarms(page = 1, limit = 10) {
    try {
      const response = await this.instance.get('/list', {
        params: { page, limit },
      });
      return response.data;
    } catch ({ response }: any) {
      throw response?.data || 'Erro ao listar fazendas';
    }
  }

  async getFarmById(id: number) {
    try {
      const response = await this.instance.get(`/${id}`);
      return response.data;
    } catch ({ response }: any) {
      throw response?.data || `Erro ao buscar fazenda com ID ${id}`;
    }
  }

  async updateFarm(id: number, data: CreateFarmDto) {
    try {
      const response = await this.instance.put(`/${id}`, data);
      return response.data;
    } catch ({ response }: any) {
      throw response?.data || `Erro ao atualizar fazenda com ID ${id}`;
    }
  }

  async deleteFarm(id: number) {
    try {
      const response = await this.instance.delete(`/${id}`);
      return response.data;
    } catch ({ response }: any) {
      throw response?.data || `Erro ao excluir fazenda com ID ${id}`;
    }
  }
}
