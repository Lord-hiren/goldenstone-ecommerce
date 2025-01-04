import { combineReducers, applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  userDetailsReducer,
  userReducer,
  profileReducer,
  adminReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  allOrders: allOrdersReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  product: productReducer,
  newProduct: newProductReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  userProfile: profileReducer,
  admin: adminReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
