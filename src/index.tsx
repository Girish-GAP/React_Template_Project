import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/redux";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4E4848",
      light: "#B48F19",
      // contrastText:'#000000'
    },
    secondary: {
      main: "#EFEAE2",
      light: "#F9F7F2",
      dark: "#D9BB7F",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: ["Sen"].join(","),
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <Router basename="/">
            <App />
          </Router>
      </ThemeProvider>
    </Provider>
  </StyledEngineProvider>
);

reportWebVitals();


/*
<StyledEngineProvider injectFirst> :
  The "injectFirst" prop is likely a configuration option that determines the order in which styles are injected into the application. 
  By setting it to "true", it means that the styles defined by the application will be injected before the styles defined by any other 
  library or third-party dependency. This can help prevent style conflicts and ensure that the application's styles are prioritized.


<Router basename="/">
  // if wrong url also it will redirect to '/'
  The "Router" component is likely part of a routing library that helps manage the navigation of a React application by mapping URLs to specific 
  components or pages within the application. The "basename" prop is used to specify the base URL of the application, which is typically used to 
  resolve relative URLs and ensure that the routing works correctly.
  By setting the "basename" prop to "/", the developer is specifying that the application should be served from the root directory of the web server. 
  This is a common configuration for React applications that are hosted on a web server and accessed through a URL like "https://example.com".

*/



