import { BrandService } from '../services/brand.service';
import { Brand } from '../models/brand.model';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    createBrand(brand: Brand): Promise<Brand>;
    getBrand(id: string): Promise<Brand>;
    getAllBrands(): Promise<Brand[]>;
    updateBrand(id: string, brand: Partial<Brand>): Promise<Brand>;
    deleteBrand(id: string): Promise<void>;
}
