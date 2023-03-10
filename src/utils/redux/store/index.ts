import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import authenticationSlice from "../reducer/authentication-slice";

const store: EnhancedStore<any, AnyAction, [ThunkMiddlewareFor<any>]> =
  configureStore({
    reducer: {
      authenticationSlice,
    },
  });

export default store;


/*
  a "thunk" is a type of middleware that allows actions to return functions
  instead of objects. This is useful for performing asynchronous operations, 
  such as fetching data from an API, before dispatching a regular action.
*/