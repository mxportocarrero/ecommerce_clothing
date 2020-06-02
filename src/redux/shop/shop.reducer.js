import SHOP_DATA from "./shop.data";

import ShopActionTypes from "./shop.types";

const INITAL_STATE = {
  collections: SHOP_DATA,
};

const shopReducecr = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducecr;
