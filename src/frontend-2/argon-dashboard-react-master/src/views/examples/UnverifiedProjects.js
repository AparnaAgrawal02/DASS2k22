import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
// reactstrap components
import { Card, CardBody, Container, Row, Col, CardHeader, UncontrolledCarousel } from "reactstrap";
import { udataid, vdataid, uActivityid, vActivityid, uprojectid, vprojectid } from "./AdminDashBoard";
import FormControl from "@mui/material/FormControl";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
// core components
import Header from "../../components/Headers/Header.js";
import {deleteProject, veriProjects,editProject } from "../../Axios/axios";
let Data = null
const MapWrapper = () => {
    const mapRef = React.useRef(null);
    React.useEffect(() => {
        let google = window.google;
        let map = mapRef.current;
        let lat = "40.748817";
        let lng = "-73.985428";
        let myLatlng = new google.maps.LatLng(lat, lng);
        console.log(Data)


        if (Data != null) {
            console.log("PPPPPPPPP")
            console.log(Data.location.length)

            if (Data.location.length === 1) {
                myLatlng = new google.maps.LatLng(Data.center.lat, Data.center.lng)

                const mapOptions = {
                    zoom: 12,
                    center: myLatlng,
                    scrollwheel: false,
                    zoomControl: true,
                    styles: [
                        {
                            featureType: "administrative",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#444444" }],
                        },
                        {
                            featureType: "landscape",
                            elementType: "all",
                            stylers: [{ color: "#f2f2f2" }],
                        },
                        {
                            featureType: "poi",
                            elementType: "all",
                            stylers: [{ visibility: "off" }],
                        },
                        {
                            featureType: "road",
                            elementType: "all",
                            stylers: [{ saturation: -100 }, { lightness: 45 }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "all",
                            stylers: [{ visibility: "simplified" }],
                        },
                        {
                            featureType: "road.arterial",
                            elementType: "labels.icon",
                            stylers: [{ visibility: "off" }],
                        },
                        {
                            featureType: "transit",
                            elementType: "all",
                            stylers: [{ visibility: "off" }],
                        },
                        {
                            featureType: "water",
                            elementType: "all",
                            stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
                        },
                    ],
                };

                map = new google.maps.Map(map, mapOptions);

                const marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: "Light Bootstrap Dashboard PRO React!",
                });

                const contentString =
                    '<div class="info-window-content"><h2>`${Data.bodyType}`</h2>' +
                    "<p>{Data.center.lat} {Data.center.lng}</p></div>";

                var infowindow = new google.maps.InfoWindow({
                    content: 'Latitude: ' + Data.center.lat +
                        '<br>Longitude: ' + Data.center.lng

                });
                google.maps.event.addListener(marker, "click", function () {
                    infowindow.open(map, marker);
                });
            }


            if (Data.location.length > 1) {


                myLatlng = new google.maps.LatLng(Data.center.lat, Data.center.lng)

                const mapOptions = {
                    zoom: 12,
                    center: myLatlng,
                    scrollwheel: false,
                    zoomControl: true,
                    styles: [
                        {
                            featureType: "administrative",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#444444" }],
                        },
                        {
                            featureType: "landscape",
                            elementType: "all",
                            stylers: [{ color: "#f2f2f2" }],
                        },
                        {
                            featureType: "poi",
                            elementType: "all",
                            stylers: [{ visibility: "off" }],
                        },
                        {
                            featureType: "road",
                            elementType: "all",
                            stylers: [{ saturation: -100 }, { lightness: 45 }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "all",
                            stylers: [{ visibility: "simplified" }],
                        },
                        {
                            featureType: "road.arterial",
                            elementType: "labels.icon",
                            stylers: [{ visibility: "off" }],
                        },
                        {
                            featureType: "transit",
                            elementType: "all",
                            stylers: [{ visibility: "off" }],
                        },
                        {
                            featureType: "water",
                            elementType: "all",
                            stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
                        },
                    ],
                };

                map = new google.maps.Map(map, mapOptions);

                const polygon2 = new google.maps.Polygon({
                    paths: Data.location,
                    strokeColor: "#800000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#800000",
                    fillOpacity: 0.35,
                    map: map,
                    //editable: true

                });
                console.log(Data.location)
                console.log("aaaaaa")

                console.log(polygon2)


                var infowindowX = new google.maps.InfoWindow({
                    content: 'body: ' + Data.center.bodyType

                });

                //infowindow.open(map, marker);
                google.maps.event.addListener(polygon2, 'click', function () {

                    console.log("works")
                    console.log(polygon2)
                    // console.log(polygon2.paths)
                    // infowindow2.setPosition(polygon2.paths[0]);
                    infowindowX.setPosition(Data.center.lat, Data.center.lng);


                    infowindowX.open(map);
                });

                const markerX = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: "Light Bootstrap Dashboard PRO React!",
                });



                const contentString =
                    '<div class="info-window-content"><h2>`${Data.bodyType}`</h2>' +
                    "<p>{Data.center.lat} {Data.center.lng}</p></div>";

                var infowindowM = new google.maps.InfoWindow({
                    content: 'Latitude: ' + Data.center.lat +
                        '<br>Longitude: ' + Data.center.lng

                });

                google.maps.event.addListener(markerX, 'click', function () {

                    console.log("works")
                    // console.log(polygon2.paths)
                    // infowindow2.setPosition(polygon2.paths[0]);


                    infowindowM.open(map);
                });

            }

        }





    }, []);


    return (
        <>
            <div
                style={{ height: `600px` }}
                className="map-canvas"
                id="map-canvas"
                ref={mapRef}
            ></div>
        </>);
};

const verify = () => {
    let res = veriProjects(Data._id)
    console.log(res)
    if (res == 0) {
        alert("verification unsucessfull")
    }

    else {
        alert("verification successfull")
    }
}


function BackToadmin() {

    window.location.href = ''
    udataid = []
    vdataid = []
    uActivityid = []
    vActivityid = []
    uprojectid = []
    vprojectid = []

}



const UnverifiedProjects = (props) => {
    Data = props.data
    const [editit, update1] = useState(0);
    const [details, setdetails] = useState(Data.details);
    const [address, setaddress] = useState(Data.address);
    const [project, setProject] = useState(Data.ProjectName);
    const [assign, setassing] = useState(Data.Assigned_to);
    const [startD, setStartDate] = useState(Data.start_date);
    const [completeD, setcomplete] = useState(Data.completion_Date);
    const onChangeInfo = (event) => {
        setdetails(event.target.value);
    };
    const onChangeProject = (event) => {
        setProject(event.target.value);
    };
    const onChangeAddress = (event) => {
        setaddress(event.target.value);
    };
    const onChangeAssign = (event) => {
        setassing(event.target.value);
    };
    const onChangeStartDate = (event) => {
        setStartDate(event.target.value);
    };
    const onChangeCompletion = (event) => {
        setcomplete(event.target.value);
    };
    
  
    const update = () => {
      update1(1)
    }
    const resetInputs = () => {
        setdetails("");
        setaddress("");
        setProject("");
        setStartDate("");
        setcomplete("");
        
    }
    const submit = (event) => {
        const data = {
            ProjectName:project,
            address: address,
            Assigned_to: assign,
            ProjectDetails: details,
            start_date:startD,
            completion_Date:completeD,

        };
        let res = editProject(Data._id,data)
        window.location.reload()
        resetInputs()
        update1(0)
      }
      const deleted =() =>{
        deleteProject(Data._id)
      }
      let items =[]
      console.log("images",Data.images)
      for(let i=0;i<Data.images.length;i++){
          items.push({
              
              src:Data.images[i].url,
              attText:"notFound",
              caption: "",
            header: "",
            key: i,   
          })
      }


    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <button type="button" class="btn btn-danger" onClick={BackToadmin}>Back</button>

                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h4 className="text-uppercase text-light ls-1 mb-1">
                                            {Data.bodyType}
                                        </h4>
                                        {/*  <h2 className="text-white mb-0">Sales value</h2> */}
                                    </div>

                                </Row>
                            </CardHeader>
                            <CardBody>
                                <MapWrapper />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                        {editit === 0 && <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                
                                    <h2 className="text-uppercase text-muted ls-1 mb-1">
                                        {Data.ProjectName}
                                    </h2>
                                    <h2 className="text-uppercase text-muted ls-1 mb-1">
                                        {Data.address === '' ? Data.center : Data.address}
                                    </h2>
                                    <h2 className="text-uppercase text-muted ls-1 mb-1">
                                        {Data.ProjectDetails === '' ? "No Details" : Data.details}
                                    </h2>
                                    <h2 className="text-uppercase text-muted ls-1 mb-1">
                                        {Data.Assigned_to === '' ? "Not assigned" : Data.Assigned_to}
                                    </h2>
                                    <h2 className="text-uppercase text-muted ls-1 mb-1">
                                        {Data.start_date === '' ? "Not started" : Data.start_date}
                                    </h2>
                                    <h2 className="text-uppercase text-muted ls-1 mb-1">
                                        {Data.completion_Date === '' ? "Not completed" : Data.completion_Date}
                                    </h2>
                                    <Row  md="7" height = "10px">
                                    <UncontrolledCarousel items= {items} />
                                    </Row>

                                </div>
                            </CardBody>}
                            {editit != 0 && <CardBody>
                                <FormControl sx={{ m: 1, minWidth: 500 }}>


                                    <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                                    <TextField
                                        label="ProjectName"
                                        variant="outlined"
                                        default={Data.ProjectName}
                                        onChange={onChangeProject}
                                    />
                                    <TextField
                                        label="Address"
                                        variant="outlined"
                                        default={Data.address}
                                        onChange={onChangeAddress}
                                    />

                                    <InputLabel id="demo-simple-select-label">Details</InputLabel>
                                    <TextField
                                        label="Details"
                                        variant="outlined"
                                        default={Data.ProjectDetails}
                                        onChange={onChangeInfo}
                                    />
                                    <TextField
                                        label="Assigned To"
                                        variant="outlined"
                                        default={Data.Assigned_to}
                                        onChange={onChangeAssign}
                                    />
                                    <TextField
                                        label="Start Date"
                                        variant="outlined"
                                        default={Data.start_date}
                                        onChange={onChangeStartDate}
                                    />
                                    <TextField
                                        label="Completion Date"
                                        variant="outlined"
                                        default={Data.completion_Date}
                                        onChange={onChangeCompletion}
                                    />
                                    

                                </FormControl>
                            </CardBody>}
                            
                        </Card>
                        <br>{ }</br>
                        <br>{ }</br>
                        {editit == 0 &&
                            <button type="button" onClick={() => verify()} class="btn btn-default"  >Verify</button>}
                        {editit == 0 &&
                            <button type="button" onClick={() => update()} class="btn btn-default">Edit</button>
                        }           
                        {editit == 0 &&
                            <button type="button" class="btn btn-danger " onClick={deleted}>Delete</button>
                        }

                        {
                            editit != 0 && <button type="button" onClick={() => submit()} class="btn btn-default">Submit</button>
                        }
                  </Col>
                </Row>
            </Container>

        </>
    );
};

export default UnverifiedProjects;
