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
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useNavigate } from "react-router-dom";
import  VerifyData from "./Unverifiedata"
import { getAllUnverifiedData,getAllverifiedActivities,getAllverifiedData,getAllverifiedProjects,getAllUnverifiedActivities,getAllUnverifiedProjects} from '../../Axios/axios.js';
// reactstrap components
import { Card, CardHeader,CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { ClosedCaptionDisabledSharp } from "@mui/icons-material";

let list=null
const AdminDashBoard = () => {
  const [verifiedd, setverfiedd] = useState([]);
  const [udataid, setudataid] = useState(null);
  const [vdataid, setvdataid] = useState(null);
  const [uActivityid, setuActivityid] = useState(null);
  const [uprojectid, setuprojectid] = useState(null);
  const [vActivityid, setvActivityid] = useState(null);
  const [vprojectid, setvProjectid] = useState(null);
  const [unverifiedd, setunverifiedd] = useState([]);
  const [verifieda, setverfieda] = useState([]);
  const [unverifieda, setunverifieda] = useState([]);
  const [verifiedp, setverfiedp] = useState([]);
  const [unverifiedp, setunverifiedp] = useState([]);

    const [whichlist, setWhichList] = useState(null);
   /* async function HandleWhichlist(){
        if(whichlist=="AA"){
          list = verifieda

          console.log(list)

        }
        if(whichlist=="AP"){
         list = await getAllverifiedProjects()
        }
        if(whichlist=="EWB"){
         list = verifiedd
        }
        if(whichlist=="VA"){
         list = unverifieda
        }
        if(whichlist=="VP"){
          list= await getAllUnverifiedProjects()
        }
        if(whichlist=="VD"){
          
          list= unverifiedd
          console.log(list)
        
        }
        console.log(whichlist)
    } */
    
    useEffect(async() => {
      let va = await getAllverifiedActivities()
      setverfieda(va)
      let vp = await getAllverifiedProjects()
      setverfiedp(vp)
      let vd = await getAllverifiedData()
      setverfiedd(vd)
      let ua = await getAllUnverifiedActivities()
      setunverifieda(ua)
      let up= await getAllUnverifiedProjects()
      setunverifiedp(up)
      let ud = await getAllUnverifiedData()
      setunverifiedd(ud)


    }, []);
    const formatDate = (date) => {
      let d = new Date(date);
      let month = (d.getMonth() + 1).toString();
      let day = d.getDate().toString();
      let year = d.getFullYear();
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      return [year, month, day].join('-');
    }

    const onclickVerifiedData =(id)=>{
      setvdataid(id)
    }
    const onclickunVerifiedData= (id)=>{
      console.log(id)
      setudataid(id)
    }

    const onclickunVerifiedActivity= (id)=>{
      setuActivityid(id)
    }

    const onclickVerifiedActivity= (id)=>{
      setvActivityid(id)
    }
    const onclickVerifiedProject= (id)=>{
      setvProjectid(id)
    }

    const onclickUnVerifiedProject= (id)=>{
      setuprojectid(id)
    }



  return (
    <>
    {udataid?(
      <VerifyData data={udataid}/>
    ):(
    
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
          <br>{}</br>
        <br>{}</br>


       {whichlist ==="VD" &&
         <Card className="shadow">
         <CardHeader className="border-0">
         <h3 className="mb-0">CrowdSourcedData</h3>
              </CardHeader>
       
       <Grid item xs={12} md={9} lg={9}>
        <Paper>
          <Table size="small">
          <TableHead>
              <TableRow>
                <TableCell > Sr No.</TableCell>
                <TableCell>Date of Entry</TableCell>
                <TableCell>Who</TableCell>
                <TableCell>
                  WaterBody
                </TableCell>
                <TableCell>
                  Details</TableCell>
            
              </TableRow>
            </TableHead>
          <TableBody>
              {console.log(unverifiedd)}
              {unverifiedd && unverifiedd.map((data, ind) => (
                
                <TableRow selected key={ind} height ="3%" onClick  = {() => onclickunVerifiedData(data)} style={{ cursor: "pointer" }}>
                  <TableCell width="10%" height ="3%">{ind}</TableCell>
                  <TableCell>{formatDate(data.date)}</TableCell>
                  <TableCell>{data.byEmail}</TableCell>
                  <TableCell>{data.bodyType}</TableCell>
                  <TableCell>{(data.detail!="")?data.detail:"not available"}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
      </Grid>
      </Card>
      }
      {whichlist ==="VA"  &&
       <Card className="shadow">
       <CardHeader className="border-0">
       <h3 className="mb-0">Verify Activities</h3>
            </CardHeader>
      <Grid item xs={12} md={9} lg={9}>
        <Paper>
          <Table size="small">
          <TableHead>
              <TableRow>
                <TableCell > Sr No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Who</TableCell>
                <TableCell>
                 Activity
                </TableCell>
                <TableCell>
                  Address</TableCell>
            
              </TableRow>
            </TableHead>
          <TableBody>
              {console.log(unverifieda)}
              {unverifieda && unverifieda.map((data, ind) => (
                <TableRow key={ind}>
                  <TableCell width="10%" height ="3%">{ind}</TableCell>
                  <TableCell>{formatDate(data.date)}</TableCell>
                  <TableCell>{data.byEmail}</TableCell>
                  <TableCell>{data.ActivityName}</TableCell>
                  <TableCell>{data.Address}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
      </Grid>
      </Card>
      }{whichlist ==="VP" &&
        <Card className="shadow">
        <CardHeader className="border-0">
        <h3 className="mb-0">Verify Projects</h3>
             </CardHeader>
      <Grid item xs={12} md={9} lg={9}>
        <Paper>
          <Table size="small">
          <TableHead>
              <TableRow>
                <TableCell > Sr No.</TableCell>
                <TableCell>Date of Entry</TableCell>
                <TableCell>Who</TableCell>
                <TableCell>
                  Project
                </TableCell>
                <TableCell>
                  Details</TableCell>
            
              </TableRow>
            </TableHead>
          <TableBody>
              {console.log(unverifiedp)}
              {unverifiedp && unverifiedp.map((data, ind) => (
                <TableRow key={ind}>
                  <TableCell width="10%" height ="3%">{ind}</TableCell>
                  <TableCell>{formatDate(data.date)}</TableCell>
                  <TableCell>{data.byEmail}</TableCell>
                  <TableCell>{data.ProjectName}</TableCell>
                  <TableCell>{data.ProjectDetails!=""}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
      </Grid>
      </Card>
      }

      {whichlist ==="AD" && 
      
      <Card className="shadow">
       <CardHeader className="border-0">
       <h3 className="mb-0">Water Bodies</h3>
            </CardHeader>
      <Grid item xs={12} md={9} lg={9}>
        <Paper>
          <Table size="small">
          <TableHead>
              <TableRow>
                <TableCell > Sr No.</TableCell>
                <TableCell>Date of Entry</TableCell>
                <TableCell>Who</TableCell>
                <TableCell>
                  WaterBody
                </TableCell>
                <TableCell>
                  Details</TableCell>
            
              </TableRow>
            </TableHead>
          <TableBody>
              {console.log(verifiedd)}
              {verifiedd && verifiedd.map((data, ind) => (
                <TableRow key={ind}>
                  <TableCell width="10%" height ="3%">{ind}</TableCell>
                  <TableCell>{formatDate(data.date)}</TableCell>
                  <TableCell>{data.byEmail}</TableCell>
                  <TableCell>{data.bodyType}</TableCell>
                  <TableCell>{(data.detail!="")?data.detail:"not available"}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
      </Grid>
      </Card>
      }
      {whichlist ==="AA"&&
      <Card className="shadow">
      <CardHeader className="border-0">
      <h3 className="mb-0">Activities</h3>
           </CardHeader>
      <Grid item xs={12} md={9} lg={9}>
        <Paper>
          <Table size="small">
          <TableHead>
              <TableRow>
                <TableCell > Sr No.</TableCell>
                <TableCell>Date of Entry</TableCell>
                <TableCell>Who</TableCell>
                <TableCell>
                 Activity
                </TableCell>
                <TableCell>
                  Address</TableCell>
                  <TableCell>
                  Assigned To</TableCell>
                  <TableCell>
                  Duration</TableCell>
            
              </TableRow>
            </TableHead>
          <TableBody>
              {console.log(verifiedp)}
              {verifiedp && verifiedp.map((data, ind) => (
                <TableRow key={ind}>
                  <TableCell width="10%" height ="3%">{ind}</TableCell>
                  <TableCell>{formatDate(data.date)}</TableCell>
                  <TableCell>{data.byEmail}</TableCell>
                  <TableCell>{data.ActivityName}</TableCell>
                  <TableCell>{data.Address}</TableCell>
                  <TableCell>{(data.Assigned_to!="")?data.Assigned_to:"Not Assigned"}</TableCell>
                  <TableCell>{(data.duration!="")?data.duration:"Unknown"}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
      </Grid>
      </Card>
      }
      {whichlist ==="AP"&& 
      <Card className="shadow">
      <CardHeader className="border-0">
      <h3 className="mb-0">CrowdSourcedData</h3>
           </CardHeader>
      
      
      <Grid item xs={12} md={9} lg={9}>
        <Paper>
          <Table size="small">
          <TableHead>
              <TableRow>
                <TableCell > Sr No.</TableCell>
                <TableCell>Date of Entry</TableCell>
                <TableCell>Who</TableCell>
                <TableCell>
                  WaterBody
                </TableCell>
                <TableCell>
                  Details</TableCell>
            
              </TableRow>
            </TableHead>
          <TableBody>
              {console.log(verifieda)}
              {verifieda && verifieda.map((data, ind) => (
                <TableRow key={ind}>
                  <TableCell width="10%" height ="3%">{ind}</TableCell>
                  <TableCell>{formatDate(data.date)}</TableCell>
                  <TableCell>{data.byEmail}</TableCell>
                  <TableCell>{data.bodyType}</TableCell>
                  <TableCell>{(data.detail!="")?data.detail:"not available"}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
      </Grid>
      </Card>}
    </Container>
      </div>)
}
    </>
  );
};




export default AdminDashBoard;
