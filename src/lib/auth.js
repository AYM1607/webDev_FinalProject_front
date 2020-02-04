import { BehaviorSubject } from "rxjs";

/**
 * Gets the initial state which is composed by the shown state fo the cart and the current items
 * in the cart.
 *
 * @returns {object}
 */
const getInitialState = () => {
  const authToken = window.localStorage.getItem("leathery-token");
  const isAdmin = window.localStorage.getItem("leathery-isAdmin");
  return {
    isAuthenticated: !!authToken,
    isAdmin: !!isAdmin && isAdmin !== "false",
    token: authToken
  };
};

let state = getInitialState();

const authSubject = new BehaviorSubject(state);

const setAuthState = (authState, token = null, isAdmin = null) => {
  state = { isAuthenticated: authState, token, isAdmin };
  if (!token) {
    window.localStorage.removeItem("leathery-token");
    window.localStorage.removeItem("leathery-isAdmin");
  }
  if (authState && token) {
    window.localStorage.setItem("leathery-token", token);
    window.localStorage.setItem("leathery-isAdmin", isAdmin ? "true" : "false");
  }
  authSubject.next(state);
};

export default {
  initialState: state,
  getCurrentToken: () => state.token,
  subscribe: setState => authSubject.subscribe(setState),
  logIn: (token, isAdmin) => setAuthState(true, token, isAdmin),
  logOut: () => setAuthState(false)
};
