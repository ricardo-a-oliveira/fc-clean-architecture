import { app, sequelize } from "../express";
import request from "supertest";


describe("E2E test for Product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product",
                price: 10.5
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product");
        expect(response.body.price).toBe(10.5);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "product",
        });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product A",
                price: 5.5
            });
        expect(response.status).toBe(200);
        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product B",
                price: 6.99
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(5.5);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Product B");
        expect(product2.price).toBe(6.99);

    });
});
