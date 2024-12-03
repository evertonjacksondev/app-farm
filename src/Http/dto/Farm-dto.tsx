export interface CreateFarmDto {
    producerId: number;
    address: string;
    phone: string;
    email: string;
    farmName: string;
    UF: string;
    city: string;
    number: number;
    neighborhood: string;
    totalArea: number;
    arable: number;
  }
  

export class FarmErrosDto {
    name_producer?: { message: string }
    farm_name?: { message: string }
    farm_area_total?: { message: string }
    farm_area_used?: { message: string }
}

