import { Product } from "../types/product.types";

export const sampleProducts: Product[] = [
  {
    id: "prod-001",
    code: "N001",
    name: "Nón bảo hiểm chính hãng",
    description: "Nón bảo hiểm cao cấp, đạt tiêu chuẩn chất lượng",
    imageUrl: "https://via.placeholder.com/300x300?text=N001",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "prod-002",
    code: "N114",
    name: "Nón thêu logo custom",
    description: "Nón thêu logo theo yêu cầu, chất lượng cao",
    imageUrl: "https://via.placeholder.com/300x300?text=N114",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  },
  {
    id: "prod-003",
    code: "N210",
    name: "Nón in lụa cao cấp",
    description: "Nón in lụa, màu sắc bền đẹp",
    imageUrl: "https://via.placeholder.com/300x300?text=N210",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "prod-004",
    code: "N330",
    name: "Nón vành tròn cổ điển",
    description: "Nón vành tròn thiết kế cổ điển, phong cách",
    imageUrl: "https://via.placeholder.com/300x300?text=N330",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "prod-005",
    code: "N442",
    name: "Nón gắn nút cao cấp",
    description: "Nón có gắn nút chỉnh, tiện lợi",
    imageUrl: "https://via.placeholder.com/300x300?text=N442",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "prod-006",
    code: "N512",
    name: "Nón ủi phẳng đóng gói",
    description: "Nón ủi phẳng, hoàn thiện và đóng gói",
    imageUrl: "https://via.placeholder.com/300x300?text=N512",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
];

// Helper functions
export function getAllProducts(): Product[] {
  return sampleProducts;
}

export function getProductById(id: string): Product | undefined {
  return sampleProducts.find((p) => p.id === id);
}

export function getProductByCode(code: string): Product | undefined {
  return sampleProducts.find((p) => p.code === code);
}

export function addProduct(product: Product): Product {
  sampleProducts.push(product);
  return product;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const index = sampleProducts.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  sampleProducts[index] = {
    ...sampleProducts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return sampleProducts[index];
}

export function deleteProduct(id: string): boolean {
  const index = sampleProducts.findIndex((p) => p.id === id);
  if (index === -1) return false;

  sampleProducts.splice(index, 1);
  return true;
}

