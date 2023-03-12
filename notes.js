// npx create-react-app --template typescript

// install the sass : npm i sass
// add assets from tickit


// install @mui/material
// npm install @mui/material @emotion/react @emotion/styled
// create cusotme theme by mui createTheme function

// added <StyledEngineProvider, injectFirst><CssBaseline /> , theme in index.html and wrap around App component, its for styling
// for navigation : npm i react-router-dom 

// for redux : 
 // npm install @reduxjs/toolkit 
 // npm i react-redux

// add redux file structure in utils


// created storage folder in utils and added session storage file init as index.js

// Created authentication slice
//  - add intial values and reducers
//  - export the reducers
//  - export the values of reducers
// add store in index.tsx

// add routes in src

// for material ui
// npm install @mui/material @emotion/react @emotion/styled
//     "@mui/icons-material": "^5.11.0",


// added Form Component : 
//  Added all components which form components needs
// and use form modules

// use npm update before adding packages // it will update the core pacakges...


// "@mui/x-date-pickers": "^5.0.6",

// npm i react-localization

// npm i react-ckeditor-component


// npm i --save react-select  "^5.7.0", /** Deprectiated */
// npm install --save @types/react-select   : npm WARN deprecated @types/react-select@5.0.1:

// "react-material-file-upload": "^0.0.4",      /** Deprectiated */



/*  

//  HOW TO USE FORM :

1) Import RefObject, useRef from 'react'
2) import Form, { FormDataModel } from "../../../components/Form";
3) make a referance pointer 
      // let addFormRef : RefObject<Form | null | undefined> = useRef();    // pass first type as Form module
4) pass the require props also values and model is compulsory

5) prop model have many fields so it will be better to pass the json of it
    - make another files called formNameForm which returns the json of model with value, import it in our form and pass that json as prop.
6) inside that model we are going to mention the fields types array eg. input, dropdown etc..
7) the number field we are added in that json are going to render...

8) after submit the form call event function which will call the Form getFormData method by using ref pointer
    let { getFormData} = addFormRef.current as {
        getFormData: () => { formData: FormDataModel; isFormValid: boolean };
    };
        
    let {formData, isFormValid} = getFormData();
*/





/*
    //   let data = addFormRef.current
    //   let data2 = data?.getFormData();
    //   console.log(data2?.formData.username)

*/