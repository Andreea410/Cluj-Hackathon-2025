import { BaseService } from './base.service';
import { Product } from '../models/product.model';
import { IProductRepository } from '../repositories/interfaces/product.repository.interface';
import { Brand } from '../models/brand.model';
export declare class ProductService extends BaseService<Product> {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    createProduct(product: Product): Promise<Product>;
    updateProduct(id: string, product: Partial<Product>): Promise<Product>;
    getProductsByBrand(brandId: string): Promise<Product[]>;
    getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;
    getInStockProducts(): Promise<Product[]>;
    getOutOfStockProducts(): Promise<Product[]>;
    getProductWithBrand(id: string): Promise<{
        product: Product;
        brand: Brand;
    } | null>;
    searchProducts(query: string): Promise<Product[]>;
    updateStock(id: string, quantity: number): Promise<Product>;
}
