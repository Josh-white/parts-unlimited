import {act, render, screen} from "@testing-library/react";
import React from "react";
import {ProductDisplay} from "../../components/ProductDisplay";
import userEvent from "@testing-library/user-event";
import {changeQuantity} from "../../productsApiClient";

jest.mock("../../productsApiClient");

const mockChangeQuantity = changeQuantity as jest.MockedFunction<typeof changeQuantity>;

describe("when I view the inventory with zero quantity", () => {

  beforeEach(() => {
    const createAlertMessage = jest.fn()
    const product = {id: 1, name: "a product", quantity: 0};
    render(<ProductDisplay product={product} createAlertMessage={createAlertMessage}/>);

  })

  it("should display the products and inventory", async () => {

    expect(await screen.findByText("a product")).toBeInTheDocument();
    const currentInventory = await screen.getAllByLabelText('Current Inventory')
    expect(currentInventory[0].innerHTML).toContain('0')
  });

  it('should display a button to increase the quantity and save amount', () => {

    expect(screen.getByRole('button', {name: 'Increase'})).toBeVisible()
    expect(screen.getByRole('button', {name: 'Save'})).toBeVisible()
  });

  it('should increase the quantity when Increase button is clicked', async () => {

    const currentInventory = await screen.getAllByLabelText('Current Inventory')
    expect(currentInventory[0].innerHTML).toContain('0')
    userEvent.click(screen.getByRole('button', {name: 'Increase'}))
    expect(currentInventory[0].innerHTML).toContain('1')
  });
});

describe('saving information', () => {

  beforeEach(() => {
    const product = {id: 1, name: "a product", quantity: 2};
    const createAlertMessage = jest.fn()
    render(<ProductDisplay product={product} createAlertMessage={createAlertMessage}/>);
  })

  it('should show a default amount and buttons to increase, decrease, and place order', async () => {

    const orderAmount = await screen.findAllByLabelText('Order Amount')
    expect(orderAmount[0].innerHTML).toContain('Order: 0')
    expect(screen.getByRole('button', {name: 'More'})).toBeVisible()
    expect(screen.getByRole('button', {name: 'Less'})).toBeVisible()
    expect(screen.getByRole('button', {name: 'Place Order'})).toBeVisible()
  });

  it('should change order amount when more or less is clicked', async () => {

    userEvent.click(screen.getByRole('button', {name: 'More'}))
    const orderAmount = await screen.findAllByLabelText('Order Amount')
    expect(orderAmount[0].innerHTML).toContain('Order: 1')
    userEvent.click(screen.getByRole('button', {name: 'Less'}))
    expect(orderAmount[0].innerHTML).toContain('Order: 0')
  });

  it('should not allow order amount to go below 0', async () => {

    userEvent.click(screen.getByRole('button', {name: 'Less'}))

    const orderAmount = await screen.findAllByLabelText('Order Amount')
    expect(orderAmount[0].innerHTML).toContain('Order: 0')
  });

  it('should place an order if that amount is in stock', async () => {
    mockChangeQuantity.mockResolvedValueOnce({id: 1, name: 'a product', quantity: 1})

    act(() => userEvent.click(screen.getByRole('button', {name: 'More'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'More'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'More'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'Place Order'})))

    expect(mockChangeQuantity).toHaveBeenCalledTimes(0)

    act(() => userEvent.click(screen.getByRole('button', {name: 'Less'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'Less'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'Place Order'})))

    expect(mockChangeQuantity).toHaveBeenCalledTimes(1)
  });
});
describe('ordering', () => {

  it('should pop an alert when an order is placed with the amount ordered and full order is in stock', () => {
    mockChangeQuantity.mockResolvedValueOnce({id: 1, name: 'a product', quantity: 1})
    const createAlertMessage = jest.fn()
    const product = {id: 1, name: "a product", quantity: 2};

    render(<ProductDisplay product={product} createAlertMessage={createAlertMessage}/>);

    act(() => userEvent.click(screen.getByRole('button', {name: 'More'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'Place Order'})))

    expect(createAlertMessage).toHaveBeenCalledTimes(1)
    expect(createAlertMessage).toHaveBeenCalledWith('You will receive - a product x 1.')
    expect(mockChangeQuantity).toHaveBeenCalledTimes(1)
    expect(mockChangeQuantity).toHaveBeenCalledWith(1, 1)
  });

  it('should pop an alert when an order is completed but not fully fulfilled', () => {
    mockChangeQuantity.mockResolvedValueOnce({id: 1, name: 'a product', quantity: 0})
    const createAlertMessage = jest.fn()
    const product = {id: 1, name: "a product", quantity: 2};

    render(<ProductDisplay product={product} createAlertMessage={createAlertMessage}/>);
    act(() => userEvent.click(screen.getByRole('button', {name: 'More'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'More'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'More'})))
    act(() => userEvent.click(screen.getByRole('button', {name: 'Place Order'})))

    expect(createAlertMessage).toHaveBeenCalledTimes(1)
    expect(createAlertMessage).toHaveBeenCalledWith('You will receive - a product x 2.\n' +
      'Note that your order was NOT completely fulfilled. Your delivery will be short 1 items.')
    expect(mockChangeQuantity).toHaveBeenCalledTimes(1)
    expect(mockChangeQuantity).toHaveBeenCalledWith(1, 0)

  });
})


