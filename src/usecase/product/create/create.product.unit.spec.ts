import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Product 1",
    price: 10.0
};


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {

    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        
        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            type: input.type,
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when type is invalid", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.type = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrowError (
            "Product type not supported"
        )
    });

    
});