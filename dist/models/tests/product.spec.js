"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const product = new product_1.Products();
describe(' >>> Product Model', () => {
    it('should have an index method', () => {
        expect(product.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(product.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(product.index).toBeDefined();
    });
    it('Create method should create a new product', async () => {
        const newproduct = await product.create({
            name: 'Table Clock',
            price: 5.49
        });
        expect(newproduct.name).toEqual("Table Clock");
        expect(+newproduct.price).toEqual(5.49);
    });
    it('Get all products : index', async () => {
        const products = await product.index();
        expect(product).length >= 1;
    });
    it('Show product by id', async () => {
        const productById = await product.show("1");
        expect(productById).toBeTruthy;
    });
});
