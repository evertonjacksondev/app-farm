export interface ProducerDto {
    name: string;
    document: string;
    address: string;
    UF?: string;
    city: string;
    number: number;
    neighborhood: string;
    phone: string;
    document_type:string;
    
  }
  


export class UserErrosDto {
    name?: { message: string };
    UF?: { message: string };
    city?: { message: string };
    document?: { message: string };
    document_type?: { message: string };
    address?:{message:string};
    neighborhood?:{message:string};
    number?: { message: number};
    phone?: { message:string };
    
}

