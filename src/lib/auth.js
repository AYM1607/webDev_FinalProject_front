import { BehaviorSubject } from "rxjs";

/**
 * Gets the initial state which is composed by the shown state fo the cart and the current items
 * in the cart.
 *
 * @returns {object}
 */
const getInitialState = () => {
  const authToken = window.localStorage.getItem("leathery-token");
  return {
    isAuthenticated: !!authToken,
    currentToken: authToken
  };
};

let state = getInitialState();

const authSubject = new BehaviorSubject(state);

const setAuthState = (authState, token = null) => {
  state = { isAuthenticated: authState, token };
  if (!token) {
    window.localStorage.removeItem("leathery-token");
  }
  if (authState && token) {
    window.localStorage.setItem("leathery-token", token);
  }
  authSubject.next(state);
};

export default {
  initialState: state,
  getCurrentToken: () => state,
  subscribe: setState => authSubject.subscribe(setState),
  logIn: token => setAuthState(true, token),
  logOut: () => setAuthState(false)
};
