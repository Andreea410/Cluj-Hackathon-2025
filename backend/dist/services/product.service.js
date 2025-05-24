"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let ProductService = class ProductService extends base_service_1.BaseService {
    constructor(productRepository) {
        super(productRepository);
        this.productRepository = productRepository;
    }
    async createProduct(product) {
        const existingProduct = await this.productRepository.findByName(product.name);
        if (existingProduct) {
            throw new Error('A product with this name already exists');
        }
        return this.create(product);
    }
    async updateProduct(id, product) {
        if (product.name) {
            const existingProduct = await this.productRepository.findByName(product.name);
            if (existingProduct && existingProduct.id !== id) {
                throw new Error('A product with this name already exists');
            }
        }
        if (product.stock !== undefined && product.stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        if (product.price !== undefined && product.price < 0) {
            throw new Error('Price cannot be negative');
        }
        return this.update(id, product);
    }
    async getProductsByBrand(brandId) {
        return this.productRepository.findByBrandId(brandId);
    }
    async getProductsByPriceRange(minPrice, maxPrice) {
        if (minPrice < 0 || maxPrice < 0) {
            throw new Error('Price cannot be negative');
        }
        if (minPrice > maxPrice) {
            throw new Error('Minimum price cannot be greater than maximum price');
        }
        return this.productRepository.findByPriceRange(minPrice, maxPrice);
    }
    async getInStockProducts() {
        return this.productRepository.findInStock();
    }
    async getOutOfStockProducts() {
        return this.productRepository.findOutOfStock();
    }
    async getProductWithBrand(id) {
        const result = await this.productRepository.findWithBrand(id);
        if (!result) {
            throw new Error('Product not found');
        }
        return result;
    }
    async searchProducts(query) {
        return this.productRepository.searchProducts(query);
    }
    async updateStock(id, quantity) {
        const product = await this.findById(id);
        const newStock = product.stock + quantity;
        if (newStock < 0) {
            throw new Error('Cannot reduce stock below 0');
        }
        return this.update(id, { stock: newStock });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ProductService);
//# sourceMappingURL=product.service.js.map