import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { RefObject, useRef } from "react";  // Access form data // 1
import Form, { FormDataModel } from "../../../components/Form";
import AddForm from "./AddForm";

const Add = () => {

    // make a referance pointer 
    let addFormRef : RefObject<Form | null | undefined> = useRef();

    const handleSubmit = (event : any) =>{
        event.preventDefault();
        let { getFormData} = addFormRef.current as {
            getFormData: () => { formData: FormDataModel; isFormValid: boolean };
          };
        
        let {formData, isFormValid} = getFormData();
        console.log(formData.firstName, formData.lastName)  // the field name firstName & lastName will be defined in formModel json
    }

    return(
        <div>
            ADD USER

            <form onSubmit={handleSubmit}>
                <label>ENTER NAME : </label>

                <Form
                    ref = {addFormRef as RefObject<Form>}
                    values={''}
                    model = {AddForm()}
                />
                
                <button>SUBMIT</button>
            </form>
            
        </div>
    )
}

export default Add;