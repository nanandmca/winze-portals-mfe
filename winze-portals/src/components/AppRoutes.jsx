import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "login/Login"
import Dashboard from "dashboard/Dashboard"

import "./../index.css";
import AppLaunch from "./AppLaunch";

const AppRoutes = () => {
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
