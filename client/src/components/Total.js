//function that calculates total for Cart component
export const handleTotal = (cart) => {
    let prices = [];
    
    cart.forEach((item)=>{
        let data = {
            price: Number(item.price.slice(1)),
            quantity: item.quantity,
        }
        prices.push(data);
    })
    
    let mul;
    let muls = [];
    prices.forEach((pare) => {
        mul = pare.price * pare.quantity
        muls.push(mul)
    })

    let total = (muls.reduce((a, b) => a + b)).toFixed(2);
    
    return total;
}
