import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, totalValue }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>PRODUCT</span>
      </div>
      <div className="header-block">
        <span>DESCRIPTION</span>
      </div>
      <div className="header-block">
        <span>QUANTITY</span>
      </div>
      <div className="header-block">
        <span>PRICE</span>
      </div>
      <div className="header-block">
        <span>REMOVE</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">
      <span>TOTAL: ${totalValue}</span>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalValue: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
