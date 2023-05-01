import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product A", 10.56);

const input = {
    id: product.id,
    name: "Product Updated",
    price: 9.99
}


describe("Integration test for product update use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const updateUseCase = new UpdateProductUseCase(productRepository);

        productRepository.create(product);
        
        const output = await updateUseCase.execute(input);

        expect(output).toEqual(input);

    })
});
