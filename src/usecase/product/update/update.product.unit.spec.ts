import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product A", 10.56);

const input = {
    id: product.id,
    name: "Product Updated",
    price: 9.99
}

const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  };

describe("Unit test for product update use case", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const updateUseCase = new UpdateProductUseCase(productRepository);
        
        const output = await updateUseCase.execute(input);

        expect(output).toEqual(input);

    })
});
