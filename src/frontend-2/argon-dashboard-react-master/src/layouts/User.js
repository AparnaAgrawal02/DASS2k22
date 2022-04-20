import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
// import AdminNavbar from "components/Navbars/AdminNavbar.js";
import SuperAdminFooter from "components/Footers/AdminFooter.js";
import SuperAdminNavbar from "components/Navbars/SuperAdminNavbar.js";
// import SuperAdminFooter from "components/Footers/SuperAdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

const SuperAdmin = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
        }, [location]);

    
}