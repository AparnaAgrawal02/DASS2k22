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
    
        const getRoutes = (routes) => {
            return routes.map((prop, key) => {
              if (prop.layout === "/superadmin") {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              } else {
                return null;
              }
            });
        };
    

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
          if (
            props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
            -1
          ) {
            return routes[i].name;
          }
        }
        return "Brand";
    };
    

    return (
        <>
        <Sidebar
        {...props}
        routes = {routes}
        logo = {{
            innerLink: "/superadmin/index",
            imgSrc : require ("../assets/img/icons/common/logo-10.png").default,
            imgAlt: "...",
        }}/>

        <div className = "main-content" ref = {mainContent}>
            {/* <AdminNavbar */}
            <SuperAdminNavbar
            {...props}
            brandText = {getBrandText(props.location.pathname)} />
            <Switch>
                {getRoutes(routes)}
                <Redirect from = "*" to = "/superadmin/index"/>
                </Switch>
            <Container fluid>
                {/* <AdminFooter /> */}
                <SuperAdminFooter/>
                </Container>
        </div>
        
        </>
    );
};

export default SuperAdmin;