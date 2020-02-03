import { BehaviorSubject } from "rxjs";

/**
 * Gets the initial state which is composed by the shown state fo the cart and the current items
 * in the cart.
 *
 * @returns {object}
 */
const getInitialState = () => {
  const localCartItems = window.localStorage.getItem("leathery-shopping-cart");
  const cartItems = localCartItems ? JSON.parse(localCartItems) : [];
  return {
    cartItems,
    isOpen: false
  };
};

let state = getInitialState();

const cartSubject = new BehaviorSubject(state);

const setCartVisibility = visibility => {
  state = {
    ...state,
    isOpen: visibility
  };
  cartSubject.next(state);
};

const updateItemAmount = (index, newAmount) => {
  // Delete the item from the cart if amount reached 0.
  if (newAmount === 0) {
    state.cartItems.splice(index, 1);
    state = { ...state };
    cartSubject.next(state);
    window.localStorage.setItem(
      "leathery-shopping-cart",
      JSON.stringify(state.cartItems)
    );
    return;
  }

  // Only update the ucrrent item if amount is not 0.
  state.cartItems[index].amount = newAmount;
  state = { ...state };
  window.localStorage.setItem(
    "leathery-shopping-cart",
    JSON.stringify(state.cartItems)
  );
  cartSubject.next(state);
};

const addItem = item => {
  // Check if the product is already in the cart and only update the amount if so.
  const index = state.cartItems.findIndex(
    cartItem => cartItem.id === item.id && cartItem.color === item.color
  );
  if (index !== -1) {
    updateItemAmount(index, state.cartItems[index].amount + 1);
    setCartVisibility(true);
    return;
  }

  // If it wasn't present then add it to the cart.
  state.cartItems.push(item);
  state = { ...state, isOpen: true };
  window.localStorage.setItem(
    "leathery-shopping-cart",
    JSON.stringify(state.cartItems)
  );
  cartSubject.next(state);
};

const clearCart = () => {
  state = {
    cartItems: [],
    isOpen: false
  };
  window.localStorage.setItem("leathery-shopping-cart", JSON.stringify([]));
  cartSubject.next(state);
};

export default {
  initialState: state,
  updateItemAmount,
  addItem,
  clearCart,
  getCurrentState: () => state,
  subscribe: setState => cartSubject.subscribe(setState),
  openCart: () => setCartVisibility(true),
  closeCart: () => setCartVisibility(false)
};
