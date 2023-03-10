import { logRoles } from "@testing-library/react"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { setAuthentication } from "../../utils/redux";
import { clearStorage } from "../../utils/storage";

import { useNavigate } from "react-router-dom";


const AuthenticatedLayout : FC<{ Component: FC }> = ({ Component }) => {
   const dispatch = useDispatch();
   const Navigate = useNavigate();

   const handleLogout = () =>{
    console.log("LOGOUT");
    clearStorage();
    dispatch(setAuthentication(null));
    Navigate("/");
   }
   
   
   
    return(
        <div>
            AUTHENTICATED LAYOUT

            <Component></Component>


            <button onClick={handleLogout}>LOGOUT</button>

        </div>
    )
}



export default AuthenticatedLayout;