import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Brand } from '../models/brand.model';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(product: Product): Promise<Product>;
    getProduct(id: string): Promise<Product>;
    getProductWithBrand(id: string): Promise<{
        product: Product;
        brand: Brand;
    }>;
    getAllProducts(brandId?: string, minPrice?: number, maxPrice?: number, inStock?: boolean, search?: string): Promise<Product[]>;
    updateProduct(id: string, product: Partial<Product>): Promise<Product>;
    updateStock(id: string, quantity: number): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
}
