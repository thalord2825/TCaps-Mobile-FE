// Product code types
export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  code: string;
  name: string;
  description: string;
  image?: string; // base64 or URL
}

export interface ProductUpdateInput {
  id: string;
  name?: string;
  description?: string;
  image?: string;
}

export interface ProductDeleteInput {
  id: string;
}

