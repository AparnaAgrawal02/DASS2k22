import React from "react";

// reactstrap components
import { Card, CardBody, Container, Row, Col, CardHeader } from "reactstrap";
import { udataid, vdataid, uActivityid, vActivityid, uprojectid, vprojectid } from "./AdminDashBoard";

import { deleteProject } from "../../Axios/axios";
// core components
import Header from "../../components/Headers/Header.js";
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

//styling
// box: {
//     height: 100,
//         display: "flex",
//             border: "1px solid black",
//                 padding: 8
// },
// topLeftBox: {
//     justifyContent: "flex-start",
//         alignItems: "flex-start"
// }

// //JSX
// <Box
//     component="span"
//     m={1} //margin
//     className={`${classes.topLeftBox} ${classes.box}`}
// >
//     <Button
//         variant="contained"
//         color="primary"
//         style={{ height: 40 }}
//     >
//         Primary
//     </Button>
// </Box>

function BackToadmin() {

    window.location.href = ''
    udataid = []
    vdataid = []
    uActivityid = []
    vActivityid = []
    uprojectid = []
    vprojectid = []

}

const VerifyProject = (props) => {
    Data = props.data




    return (
        <>
            <Header />
            {/* Page content */}

            <Container className="mt--7" fluid>
                <button type="button" class="btn btn-danger" onClick={BackToadmin}>Back</button>

                <Row>



                    <Col className="mb-5 mb-xl-0" xl="8">
                        <button type="button" class="btn btn-danger">Delete</button>
                        {/* <Box
                            component="span"
                            m={1} //margin
                        // className={`${classes.topLeftBox} ${classes.box}`}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ height: 40 }}
                            >
                                Primary
                            </Button>
                        </Box> */}

                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div>
                                        <button type="button" class="btn btn-default">Back</button>
                                    </div>
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


                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="text-uppercase text-muted ls-1 mb-1">
                                            {Data.bodyType}
                                        </h3>
                                        {/* <h2 className="mb-0">Total orders</h2> */}
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <img src={Data.img} class="img-fluid" alt="Water Body Image" />

                                    <h5 className="text-uppercase text-muted ls-1 mb-1">
                                        {Data.address === '' ? Data.center : Data.address}
                                    </h5>
                                    <h5 className="text-uppercase text-muted ls-1 mb-1">
                                        {Data.details === '' ? "No Details" : Data.details}
                                    </h5>
                                </div>
                            </CardBody>
                        </Card>
                        <br>{ }</br>
                        <br>{ }</br>
                        <button type="button" class="btn btn-default">Edit</button>
                        <button type="button" class="btn btn-danger " onClick={deleteProject(Data._id)}>Delete</button>

                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default VerifyProject;
