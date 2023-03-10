import { useState } from "react";
import React from "react";
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../../utils/redux";



const Login2 = () =>{
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleUsername = (event :  React.ChangeEvent<HTMLInputElement>) =>{
        setUserName(event.target.value)
    }

    const handlePassword = (event : React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value)
    }

    const handleLogin = async(event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const body = { email : username, password : password};

        try{
            const {status, data } = await Axios.post("http://localhost:5000/union/login", body)
            console.log("DATA ->", data);
            if(data.faculty){
                dispatch(setAuthentication(data));
                Navigate("/dashboard", {replace : true} )    // replace true not allow to go back by broser button
            }else{
                console.log("WRONG PASSWORD")
            }
        }catch(error : any){
            console.log("error in login : ", error);
        }
    }


    return(
        <div>
            LOGIN
            <form onSubmit={handleLogin}>
                <label>ENTER USERNAME : 
                    <input 
                        value = {username}
                        onChange = {handleUsername}
                    />
                </label>

                <label>ENTER PASSWORD : 
                    <input 
                        value={password}
                        onChange = {handlePassword}
                    />
                </label>

                <button>SUBMIT</button>
            </form>

        </div>
    )
}



export default Login2;


