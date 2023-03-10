import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { RefObject, useRef } from "react";  // Access form data // 1
import Form, { FormDataModel } from "../../../components/Form";


import InputField from "../../../components/InputField";


const Add = () => {


    // make a referance pointer 
    let addFormRef : RefObject<Form | null | undefined> = useRef();

    
    const [name, setName] = useState('');

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(name);
    }

    const handleSubmit = (event : any) =>{
        event.preventDefault();
        let data = addFormRef.current as {
            getFormData: () => { formData: FormDataModel; isFormValid: boolean };
          };

          let data2 = (data.getFormData())
          console.log(data2.formData.username)
    }


    return(
        <div>
            ADD USER

            {/* <form>
                <Form
                  hasError={hasError}
                  model={LoginForm()}
                    ref = {addFormRef as RefObject<Form>}
                    values={{}}
                />

            </form> */}


            <form>
                <label>ENTER NAME : </label>
                {/* <input onChange = {handleChange} value = {name}/> */}



                <Form
                    ref = {addFormRef as RefObject<Form>}
                    values={''}
                    model = {
                        [
                            {
                                label: 'Email ID *',
                                value: '',
                                size: 'medium',
                                autoFocus: true,
                                type: 'text',
                                typeValue: 'text',
                                variant: 'outlined',
                                placeholder: '',
                                field: 'username',
                                validators: [
                                ],
                                responsive: { xs: 12 },
                                required: true,
                            }
                        ]
                    }
                />


                
            </form>
            
                <button onClick={handleSubmit} >SUBMIT</button>
            
            
        </div>
    )
}

export default Add;