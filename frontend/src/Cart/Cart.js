export const onAddtoCartHandler = (item) => {
  let storedCart = localStorage.getItem("cart");
  item.qty = 1
  if (storedCart === null) {
    let newCart = [item];
    localStorage.setItem("cart", JSON.stringify(newCart));
  }else {
    let parsedCart =  JSON.parse(storedCart)
    let addCart =  [...parsedCart, item]
    localStorage.setItem("cart", JSON.stringify(addCart));
  }
};