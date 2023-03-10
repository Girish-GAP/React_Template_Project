import { Authenticated } from "../../utils/redux/reducer/authentication-slice";
import { useSelector } from "react-redux";

const Dashboard = () => {

    const state = useSelector(Authenticated)
    

    return(
        <div>DASHBOARD</div>
    )
}


export default Dashboard;