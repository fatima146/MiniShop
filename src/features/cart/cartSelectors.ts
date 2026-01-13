import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);
