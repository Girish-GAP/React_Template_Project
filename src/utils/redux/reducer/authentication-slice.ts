import { createSlice } from "@reduxjs/toolkit";
import {
  clearStorage,
  fetchFromStorage,
  removeFromStorage,
  saveToStorage,
} from "../../storage";
import { identifiers } from "../../constants/identifiers";


const fromStorage = fetchFromStorage(identifiers.access_token);

interface AuthenticationState {
  user: any;
  authenticated: boolean;
}

const authenticationSlice = createSlice({
  name : "authenticationSlice",
  initialState : {
    user: null,
    authenticated: fromStorage || false
  },
  reducers : {
    setAuthentication(state, action){
      if(action.payload){
        saveToStorage(identifiers.access_token, action.payload.token)
        state.authenticated = true;
      }else{
        removeFromStorage(identifiers.access_token);
        state.authenticated = false;
      }
    }
  }
})

export default authenticationSlice.reducer;

export const {setAuthentication} = authenticationSlice.actions;


// The function is named "User" and takes a single argument called "state" which is an object that has a property called 
// "authenticationSlice" of type "AuthenticationState". 
// The function then returns the value of the "user" property of the "authenticationSlice" object.  
// const data = useSelector(Authenticated) 

export const User = (state: { authenticationSlice: AuthenticationState }) =>
  state.authenticationSlice.user;

  export const Authenticated = (state: {
    authenticationSlice: AuthenticationState;
  }) => state.authenticationSlice.authenticated;
