import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "login/Login"
import Dashboard from "dashboard/Dashboard"

import "./../index.css";
import AppLaunch from "./AppLaunch";

const AppRoutes = () => {
    console.log("Inside AppRoutes");
    console.log('REACT_APP_WINZE_PORTALS_FLAG:', process.env.REACT_APP_WINZE_PORTALS_FLAG);
    console.log('REACT_APP_WINZE_PORTALS_TIMEOUT_INTERVAL:', process.env.REACT_APP_WINZE_PORTALS_TIMEOUT_INTERVAL);
    return (<>
        <Router>
            <Routes>
                <Route path="/" element={<AppLaunch/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    </>)
};

export default AppRoutes;
