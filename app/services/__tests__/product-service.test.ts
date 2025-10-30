import { ProductCreateInput } from "../../types/product.types";
import { productService } from "../product-service";

describe("productService.createProduct", () => {
  it("creates a product and returns a new id", async () => {
    const input: ProductCreateInput = {
      code: "TEST01",
      name: "Test Product",
      description: "A test product",
      image: "https://example.com/image.png",
    };
    const result = await productService.createProduct(input);
    expect(result.success).toBe(true);
    expect(typeof result.data).toBe("string");
  });

  it("fails to create a product with duplicate code", async () => {
    const input: ProductCreateInput = {
      code: "TEST02",
      name: "Another Product",
      description: "Second product",
      image: "https://example.com/image.png",
    };
    await productService.createProduct(input);
    const result = await productService.createProduct(input);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/already exists/i);
  });

  it("returns error if code is missing", async () => {
    // @ts-expect-error - purposely missing code
    const result = await productService.createProduct({ name: "", description: "", image: "" });
    expect(result.success).toBe(false);
  });
});
