import React from "react";
import VConnectReports from "vconnect_reports/VConnectReports"
import VConnect from "vconnect/VConnect"
import PortalAdmin from "portal_admin/PortalAdmin"

import "./../index.css";

const DashboardHome = () => {
    return (
        <div className="container">
            <div>Name: dashboard</div>
            <VConnectReports/>
            <br/>
            <VConnect/>
            <br/>
            <PortalAdmin/>
        </div>
    )
};

export default DashboardHome;

