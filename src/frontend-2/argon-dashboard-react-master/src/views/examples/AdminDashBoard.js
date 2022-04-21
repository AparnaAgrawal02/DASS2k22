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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { getAllUnverifiedData,getAllverifiedActivities,getAllverifiedData,getAllverifiedProjects,getAllUnverifiedActivities,getAllUnverifiedProjects} from '../../Axios/axios.js';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { ClosedCaptionDisabledSharp } from "@mui/icons-material";

let list=[]
const AdminDashBoard = () => {
    const [whichlist, setWhichList] = useState(null);
   async function HandleWhichlist(){
        if(whichlist=="AA"){
          list = await getAllverifiedActivities()

          console.log(list)
          return <div>{[1,3,2].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            console.log(value)
            return (

              {/* <ListItem
                key={value.bodyType}
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
              </ListItem> */}
            );
          })}
        </div>
        }
        if(whichlist=="AP"){
         list = await getAllverifiedProjects()
        }
        if(whichlist=="EWB"){
         list = await getAllverifiedData()
        }
        if(whichlist=="VA"){
         list = await getAllUnverifiedActivities()
        }
        if(whichlist=="VP"){
          list= await getAllUnverifiedProjects()
        }
        if(whichlist=="VD"){
          
          list= await getAllUnverifiedData()
        
        }
        console.log(whichlist)
    }
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
                    </Row>
                   
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
                      </div>
                  
                    </Row>
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
                <Card className="card-stats mb-4 mb-xl-0"  onClick={()=>setWhichList("VD")} style={{ cursor: "pointer" }}>
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
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>

       { whichlist !=null && <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
       {HandleWhichlist()}   
      {[1,2,3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>}



      </div>
    </>
  );
};




export default AdminDashBoard;
