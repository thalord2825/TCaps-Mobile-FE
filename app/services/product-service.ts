import { addProduct, deleteProduct as removeProduct, sampleProducts, updateProduct } from "../data/sample-products";
import { ApiResponse } from "../types/api-response.types";
import { Product, ProductCreateInput, ProductUpdateInput } from "../types/product.types";

// Helper to generate ID
function generateId(): string {
  return `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    await delay(500);
    return {
      success: true,
      data: sampleProducts,
    };
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    await delay(400);
    const product = sampleProducts.find((p) => p.id === id);
    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }
    return {
      success: true,
      data: product,
    };
  },

  async createProduct(input: ProductCreateInput): Promise<ApiResponse<string>> {
    await delay(600);

    // Validate code uniqueness
    const existing = sampleProducts.find((p) => p.code === input.code);
    if (existing) {
      return {
        success: false,
        error: "Product code already exists",
      };
    }

    const now = new Date().toISOString();
    const newProduct: Product = {
      id: generateId(),
      code: input.code,
      name: input.name,
      description: input.description,
      imageUrl: input.image || undefined,
      createdAt: now,
      updatedAt: now,
    };

    addProduct(newProduct);

    return {
      success: true,
      data: newProduct.id,
      message: "Product created successfully",
    };
  },

  async updateProduct(input: ProductUpdateInput): Promise<ApiResponse<string>> {
    await delay(500);
    const updated = updateProduct(input.id, {
      name: input.name,
      description: input.description,
      imageUrl: input.image,
    });

    if (!updated) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    return {
      success: true,
      data: updated.id,
      message: "Product updated successfully",
    };
  },

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    await delay(500);
    const deleted = removeProduct(id);

    if (!deleted) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    return {
      success: true,
      message: "Product deleted successfully",
    };
  },
};
