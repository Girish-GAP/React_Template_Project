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
  privilege: any;
}

const authenticationSlice = createSlice({
  name : "authenticationSlice",
  initialState : {
    user: null,
    privilege: fetchFromStorage(identifiers.privilegeList),
    authenticated: fromStorage || false
  },
  reducers : {
    setAuthentication(state, action){
      if(action.payload){
        saveToStorage(identifiers.access_token, action.payload.token)
        saveToStorage(identifiers.privilegeList, action.payload.faculty.privileges);   ///FA*
        state.authenticated = true;
        state.privilege = action.payload.faculty.privileges     ///FA*
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


  export const Privilege = (state: { authenticationSlice: AuthenticationState }) =>
  state.authenticationSlice.privilege;