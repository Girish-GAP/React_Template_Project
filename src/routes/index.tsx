import { Route, Routes as Switch, BrowserRouter, useLocation } from "react-router-dom";
import { Grid, Paper, useTheme } from "@mui/material";

// import components 
import Dashboard from "../screens/Authenticated/Dashboard";
import Login from "../screens/Authentication/Login";
import Add from "../screens/Authenticated/Add/Add";

import { Authenticated } from "../utils/redux/reducer/authentication-slice";
import { FC } from "react";
import { useSelector } from "react-redux";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { Navigate } from "react-router-dom";
import MyRoot from "./MyRoot";

import { routes } from "../utils/constants/routes";



const Root: FC = () => {
    const isLogin = useSelector(Authenticated);
    let location = useLocation();   // current url
    const { from } = location.state || { from: { pathname: "/dashboard" } };
    return isLogin ? <Navigate to={from} /> : <Navigate to={'/login'} />
};


// It's like a guard of angular
const AuthenticatedScreens: FC<{ Component: FC }> = ({ Component }) => {
    const isLogin = useSelector(Authenticated);

    return isLogin ? (
        <AuthenticatedLayout Component={Component} />
    ) : (
        <Navigate to={'/'} />
    );
};

const Routes = () => {

    const theme = useTheme();

    return (
        <Grid item container flexDirection="column">
            <Grid className="pageWrapper" item sx={{ width: "100%" }}>
                <Paper
                    sx={{ background: theme.palette.secondary.light, minHeight: "100vh" }}
                    elevation={0}
                    square={false}
                    className="paperWrapper"
                >
                    {/* Brower router is defined in index.html file as Router */}
                    <Switch>
                        <Route path="/" element={<Root />} />
                        <Route path="/login" element={<Login />}></Route>

                        <Route
                            path="/dashboard"
                            element={<AuthenticatedScreens Component={Dashboard} />}
                        />
                        
                         <Route
                            path="/add"
                            element={<AuthenticatedScreens Component={Add} />}
                        /> 

                        <Route
                            path="/myroot"
                            element={<AuthenticatedScreens Component={MyRoot} />}
                        />

                        {/* <Route path = "/myroot" element = {<MyRoot/>}></Route> */}
                    </Switch>
                </Paper>
            </Grid>
        </Grid>


    )
}



export default Routes;