const costCalculator = (quantity, price, discount) => {
    return (price - (price * discount / 100)) * quantity;
}

export default costCalculator;