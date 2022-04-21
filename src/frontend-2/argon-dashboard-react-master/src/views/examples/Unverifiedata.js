import React from "react";

// reactstrap components
import { Card, CardBody, Container, Row ,Col,CardHeader} from "reactstrap";


// core components
import Header from "components/Headers/Header.js";
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
      myLatlng = new google.maps.LatLng(Data.center.lat, Data.center.lng)
    }
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

const VerifyData = (props) => {
  Data = props.data


  

  return (
    <>
     <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
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
              <MapWrapper/>
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
                <img src={Data.img} class="img-fluid" alt="Water Body Image"/>
                
                <h5 className="text-uppercase text-muted ls-1 mb-1">
                     {Data.address===''? Data.center :Data.address}
                </h5>
                <h5 className="text-uppercase text-muted ls-1 mb-1">
                     {Data.details=== ''?"No Details":Data.details}
                    </h5>
                </div>
              </CardBody>
            </Card>
           <br>{}</br>
            <br>{}</br>
            <button type="button" class="btn btn-default">Verify</button>
            <button type="button" class="btn btn-default">Edit</button>
            <button type="button" class="btn btn-danger">Delete</button>
          </Col>
        </Row>
            </Container>

          </>
          );
};

          export default VerifyData;
