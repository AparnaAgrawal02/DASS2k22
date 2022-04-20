/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import axios from "axios";
import Divider from '@mui/material/Divider';
import { useState, useEffect } from "react";
//import { getAllverifiedActivities,getAllverifiedProjects } from './course.js';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";


const AdminDashBoard = () => {
    let list=[]
    const [whichlist, setWhichList] = useState("");
    
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0"  onClick={()=>setWhichList("AP")} style={{ cursor: "pointer"} }>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h1"
                          className="text-uppercase text-muted mb-0"
                        >
                         Active Projects
                        </CardTitle>
                        {/* <span className="h2 font-weight-bold mb-0">2,356</span> */}
                      </div>
{/*                       <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col> */}
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0"  onClick={()=>setWhichList("AA")} style={{ cursor: "pointer" }}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h1"
                          className="text-uppercase text-muted mb-0"
                        >
                          Active Activities
                        </CardTitle>
                        {/* <span className="h2 font-weight-bold mb-0">924</span> */}
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col> */}
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0"  onClick={()=>setWhichList("EWB")} style={{ cursor: "pointer" }}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h1"
                          className="text-uppercase text-muted mb-0"
                        >
                          Existing Water Bodies
                        </CardTitle>
                       {/*  <span className="h2 font-weight-bold mb-0">49,65%</span> */}
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col> */}
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          <Divider />
        </Container>
        <br>{}</br>
        <br>{}</br>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0"  onClick={()=>setWhichList("VP")} style={{ cursor: "pointer" }}>
                  <CardBody>
                    <Row>
                      <div className="col" >
                        <CardTitle
                          tag="h1"
                          className="text-uppercase text-muted mb-0"
                        >
                         Verify Projects   
                        </CardTitle>
                        {/* <span className="h2 font-weight-bold mb-0">
                          350,897
                        </span> */}
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col> */}
                    </Row>
                   {/*  <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0"  onClick={()=>setWhichList("VA")} style={{ cursor: "pointer"} }>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h1"
                          className="text-uppercase text-muted mb-0"
                        >
                          Verify Activity 
                        </CardTitle>
                        {/* <span className="h2 font-weight-bold mb-0">2,356</span> */}
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col> */}
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0"  onClick={()=>setWhichList("VW")} style={{ cursor: "pointer" }}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h1"
                          className="text-uppercase text-muted mb-0"
                        >
                          Verify WaterBody
                        </CardTitle>
                        {/* <span className="h2 font-weight-bold mb-0">924</span> */}
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col> */}
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm"> */}
                     {/*  <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "} */}
                      {/* <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>


      </div>
    </>
  );
};




export default AdminDashBoard;
