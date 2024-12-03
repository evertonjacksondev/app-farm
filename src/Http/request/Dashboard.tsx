import axios, { AxiosInstance } from 'axios';

export class DashboardRequest {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://application.integraja.com.br:9001/v1/dashboard',
    });
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro inesperado na API do Dashboard');
    }
    throw error;
  }

  async getTotalFarms(): Promise<{quantityFarms:number}> {
    try {
      const response = await this.instance.get('/total-farms');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTotalArea(): Promise<{quantityTotalAreaFarms:number}> {
    try {
      const response = await this.instance.get('/total-area');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getFarmsByState(): Promise<any> {
    try {
      const response = await this.instance.get('/farms-by-state');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getFarmsByCulture(): Promise<any> {
    try {
      const response = await this.instance.get('/farms-by-culture');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getFarmsByLandUse(): Promise<any> {
    try {
      const response = await this.instance.get('/farms-by-land-use');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllProducers(): Promise<any> {
    try {
      const response = await this.instance.get('/total-producer');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
