export function formatNumber(num) {
  //return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return num;
}
export const formatter = value => {
  value = value.toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
  });
  return value;
};

export const calculartor = (unitPrice, promotionPrice) => {
  return unitPrice - (unitPrice * promotionPrice) / 100;
};

export function totalAmount(carts) {
  var total = 0;
  if (carts.length > 0) {
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].product.promotionPrice !== 0) {
        total +=
          calculartor(
            carts[i].product.unitPrice,
            carts[i].product.promotionPrice,
          ) * carts[i].quantity;
      } else {
        total += carts[i].product.unitPrice * carts[i].quantity;
      }
    }
  }

  return total;
}
export const totalAmountProducts = products => {
  var total = 0;
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      total += products[i].priceUnit * products[i].quantity;
    }
  }
  return total;
};
export const toalAmountAndPriceProducts = (products, price) => {
  var total = totalAmountProducts(products);
  return total - price * 1000;
};

export const toalAmountAndPrice = (carts, price) => {
  var total = totalAmount(carts);
  return total - price * 1000;
};

export const totalAmountOrder = orders => {
  var total = 0;
  for (let i = 0; i < orders.length; i++) {
    total += orders[i].amount;
  }
  return formatter(total);
};
