import { cartActionTypes } from "./cart.types";

// sometimes there is no need to pass a payload
export const toogleCartHidden = () => ({
  type: cartActionTypes.TOOGLE_CART_HIDDEN,
});
