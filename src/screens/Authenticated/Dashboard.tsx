import { Authenticated } from "../../utils/redux/reducer/authentication-slice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Dashboard = () => {

    const state = useSelector(Authenticated)
    

    return(
        <div>
            
            <label>DASHBOARD</label>
            <br></br>
            <Link to={"/add"} className="other-links"> 
                ADD
            </Link>
        </div>
    )
}


export default Dashboard;