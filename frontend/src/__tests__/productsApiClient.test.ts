import nock from 'nock';
import {changeQuantity, createProduct, getProducts} from "../productsApiClient";

describe('productsApiClient', () => {
    describe('getProducts', () => {
        it('should make a GET request to retrieve all products', async () => {
            const expectedProducts = [{name: 'first-product', quantity: 0}, {name: 'second-product', quantity: 2}];
            nock('http://localhost').get('/products').reply(200, expectedProducts);

            const actualProducts = await getProducts();

            expect(actualProducts).toEqual(expectedProducts);
        });
    });

    describe('createProduct', () => {
        it('should make a POST request to create a product', async () => {
            const scope = nock('http://localhost', {
                reqheaders: {
                    'Content-Type': 'text/plain'
                }
            }).post('/products', 'my-new-product')
                .reply(200, {name: "my-new-product", quantity: 0});

            const response = await createProduct("my-new-product");

            expect(scope.isDone()).toEqual(true);
            expect(response.name).toEqual("my-new-product");
            expect(response.quantity).toEqual(0);
        });
    });

    describe('addQuantity', () => {
        it('should make a POST request to add more quantity to a product', async () => {
            const updatedProductQuantity = [{id: 1, name: 'first-product', quantity: 3}];
            nock('http://localhost').post('/addQuantity/1/3').reply(200, updatedProductQuantity);

            const response = await changeQuantity(1, 3)

            expect(response).toEqual(updatedProductQuantity)
        });
    })
});