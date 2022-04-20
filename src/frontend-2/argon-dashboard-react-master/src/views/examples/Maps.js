/*!

*/
import React from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { collapseTextChangeRangesAcrossMultipleVersions, couldStartTrivia, createUnparsedSourceFile } from "typescript";
import { style } from "@mui/system";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/*import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';*/

// Get proper error message based on the code.
const getPositionErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permission denied.';
    case 2:
      return 'Position unavailable.';
    case 3:
      return 'Timeout reached.';
  }
}

//  for side drawer
const drawerWidth = 350;


let layerData = []


var lakeData = []
var stepWells = []



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// end of functions for side drawer


/* const get_coordinates = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`)
         setCoordinate({ lat: position.coords.latitude, lng: position.coords.longitude }) 
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
          getAddress(position.coords.latitude, position.coords.longitude, "AIzaSyC6iRBFOLSe9oLj4s0UiaiapQRGsYhkFYw") 
      },
      err => alert(`Error (${err.code}): ${getPositionErrorMessage(err.code)}`)
    );


  } else {
    alert('Geolocation is not supported by your browser.');
  }

}
 */



const Marker = (options) => {
  let google = window.google;

  const [marker, setMarker] = React.useState();


  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  //just a test remove this later
  //TO do-
  //do it with the current location 
  //like map.setZoom etc

  google.maps.event.addListener(marker, 'click', function () {
    google.maps.setZoom(9);
    google.maps.setCenter(marker.getPosition());
  });




  return null;
};

let pinmarker;
let polygon;
//MapWrapper 
const MapWrapper = () => {

  let google = window.google;

  const [clicks, setClicks] = useState([]);

  const [body, setBody] = useState('');


  const onClick = (event) => {
    setClicks([...clicks, event.latLng]);

    console.log(event.latLng);
  };


  // //marker
  // const marker = new google.maps.Marker({
  //   position: myLatlng,
  //   map: map,

  //   animation: google.maps.Animation.DROP,
  //   title: "Light Bootstrap Dashboard PRO React!",

  // });

  const mapRef = React.useRef(null);
  React.useEffect(async () => {



    //default
    let lat = "40.748817";
    let lng = "-73.985428";




    //get users current location...using async fuction
    const getCoords = async () => {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        long: pos.coords.longitude,
        lat: pos.coords.latitude,
      };

    };




    // function displayLayer() {

    // };

    // axios
    //   .get("http://localhost:4000/crowdsourced",{
    //     params: {
    //       bodyType:""
    //     }
    //   })
    //   .then((response) => {
    //     setActivity(response.data);
    //     })

    //     //set satte accordingly 

    // axios
    //   .get("http://localhost:4000/crowdsourced")
    //   .then((response) => {
    //     setlayerData(response.data);
    //   })





    const cord = await getCoords();
    console.log(cord)


    let map = mapRef.current;

    const myLatlng = new google.maps.LatLng(cord.lat, cord.long);

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
    //maps
    map = new google.maps.Map(map, mapOptions);
    google.maps.Map = map

    // map.addListener("click", () => {
    //   onClick();
    // });


    google.maps.event.addListener(map, 'click', function (event) {
      console.log(event)
      if (pinmarker && pinmarker.setMap) {
        pinmarker.setMap(null);
      }
      placeMarker(map, event.latLng);


    });

    function placeMarker(map, location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      map.setCenter(location);
      pinmarker = marker
      var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() +
          '<br>Longitude: ' + location.lng()

      });


      //infowindow.open(map, marker);
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });
    }





    const toggleButton1 = document.createElement("button");

    toggleButton1.textContent = "Rivers";
    toggleButton1.classList.add("custom-map-control-button");

    const toggleButton2 = document.createElement("button");

    toggleButton2.textContent = "Ponds";
    toggleButton2.classList.add("custom-map-control-button");
    toggleButton1.addEventListener("click", () => {
      // overlay.toggle();
    });
    toggleButton2.addEventListener("click", () => {
      // overlay.toggleDOM(map);
    });
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton1);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton2);



    // Add a style-selector control to the map.
    const styleControl = document.getElementById(
      "style-selector-control"
    );

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

    // Set the map's style to the initial value of the selector.
    const styleSelector = document.getElementById(
      "style-selector"
    );

    //---------------------searchbar implementation-------------------------------
    // Create the search box and link it to the UI element.
    const input = document.getElementById("standard-basic");
    console.log(input)
    const searchBox = new google.maps.places.SearchBox(input);

    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    //---------------end of searchbar------------------------


    const contentString =
      '<div class="info-window-content"><h2>Light Bootstrap Dashboard PRO React</h2>' +
      "<p>A premium Admin for React-Bootstrap, Bootstrap, React, and React Hooks.</p></div>";




    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    // google.maps.event.addListener(marker, "click", function () {
    //   infowindow.open(map, marker);
    // });
  }, []);


  // console.log("hi")
  // console.log(layerData.length)


  for (let i = 0; i < layerData.length; i++) {
    // console.log(layerData[i].bodyType.toUpperCase())
    // console.log("hi")
    // console.log(layerData)
    if (layerData[i].bodyType.toUpperCase() == "LAKE") {

      // console.log("lakeeeee")
      // console.log(layerData[i].center.lat)
      // console.log(layerData[i].bodyType)
      lakeData.push({ lat: layerData[i].center.lat, lng: layerData[i].center.lng })

      // console.log("when will this end")
      // console.log(lakeData)

    }

    if (layerData[i].bodyType.toUpperCase() == "STEPWELL") {
      stepWells.push({ lat: layerData[i].center.lat, lng: layerData[i].center.lng })



    }
  }

  const handleChange = (event) => {
    setBody(event.target.value)
  };

  if (body.toUpperCase() === "LAKE") {
    // console.log("aaaaah")

    console.log(lakeData)

    //draw polygon 

    var polygon2 = new google.maps.Polygon({
      paths: lakeData,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    console.log("wwwwwwww")

    //form the polygon
    polygon2.setMap(google.maps.Map);
    console.log("]\[poiujhg")
  }

  if (body.toUpperCase() === "STEPWELL") {
    //draw polygon

  }





  return (
    <>
      <div
        style={{ height: `800px` }}
        className="map-canvas"
        id="map-canvas"
        ref={mapRef}


      ></div>



      <div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Body Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={body}
            label="Body Type"
            onChange={handleChange}
          >
            <MenuItem value={"Borewell"}>Borewells</MenuItem>
            <MenuItem value={"Stepwell"}>Stepwells</MenuItem>
            <MenuItem value={"Lake"}>Lakes</MenuItem>

          </Select>
        </FormControl>
      </div>

      <div>{clicks.map((latLng, i) => (
        <Marker key={i} position={latLng} />
      ))}</div>
    </>
  );
};




const Maps = () => {

  const [details, setdetails] = useState("");
  const [request, Request] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [addInfo, setInfo] = useState(0);
  const [addRequest, setRequest] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [Activities, setActivity] = useState([]);

  // const [lakes, setLakes] = useState([]);
  // const [stepwells, setStepwells] = useState([]);
  const [borewells, setborewells] = useState([]);
  const [harvesting_pits, setHarvestingPits] = useState([]);

  //function 



  const [Projects, setProjects] = useState([]);
  const [Data, setData] = useState([]);
  const [postal, setPostal] = useState("");
  const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
  const [coordsarray, setCoordsarray] = useState([]);
  const [bound, setBounds] = useState(null);
  const [watchID, setWatchId] = useState(null);
  const [startMarking, setmark] = useState(0);
  const [type, setType] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  //layering

  // const [layerData, setlayerData] = useState([]);
  // var lakes = []

  // const [lakes, setlakeData] = React.useState([]);

  // var layer = document.getElementById("layer-selector").value;
  // console.log(layer)
  // if (layer == "Wells and Step Wells") {

  // }
  // if (layer == "Lakes") {

  //   for (let i = 0; i < layerData.length; i++) {
  //     if (layerData.bodyType == "Lakes") {
  //       lakes.push(layerData);
  //     }
  //   }
  // }

  // if (layer == "Borewells") {

  // }

  // if (layer == "Rainwater Harvesting Pits") {

  // }








  // const [clicks, setClicks] = useState([]);

  //pinpoint
  // const onClick = (Marker) => {
  //   // avoid directly mutating state
  //   setClicks([...clicks, Marker.latLng]);
  // };





  /* 
    //get Address from location
    const getAddress = (lat, long, googleKey) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleKey}`)
        .then(res => res.json())
        .then(address => setZip(address))
    }
    // Dispatching city, state, and zip code to store state
    const setZip = (address) => {
      console.log(address)
      setCity(address.results[5].address_components[2].short_name)
      setState(address.results[5].address_components[2].short_name)
      setPostal(address.results[5].address_components[0].short_name)
    }
   */


  let google = window.google;


  useEffect(() => {


    //layering

    axios
      .get("http://localhost:4000/admin/unverifiedd")
      .then((response) => {
        console.log(response.data.data)
        // setlayerData(response.data.data);
        layerData = response.data.data
        console.log("bye")
        console.log(layerData.length)
      })



    //get users current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`)
          setCoordinate({ lat: position.coords.latitude, lng: position.coords.longitude })
          coordsarray.push({ lat: position.coords.latitude, lng: position.coords.longitude })
          /*  getAddress(position.coords.latitude, position.coords.longitude, "AIzaSyC6iRBFOLSe9oLj4s0UiaiapQRGsYhkFYw") */
        },
        err => alert(`Error (${err.code}): ${getPositionErrorMessage(err.code)}`)
      );


    } else {
      alert('Geolocation is not supported by your browser.');
    }

  }, []);


  //1 user can mark water body by moveing around it
  //1.1 mark the water body

  const mark_water_body = () => {

    setmark(1)
    let cont = 0
    const _watchId = navigator.geolocation.watchPosition(
      position => {
        console.log(cont)
        cont++;
        console.log(position)
        setCoordinate({ lat: position.coords.latitude, lng: position.coords.longitude })
        coordsarray.push({ lat: position.coords.latitude, lng: position.coords.longitude })
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1,

      },

    );
    setWatchId(_watchId)
  }
  google.maps.event.addListener(google.maps.Map, 'click', function (event) {
    handleDrawerOpen();
  })
  //1.2 stop geting cordinates and draws th epolygon
  const stop_marking = () => {
    handleDrawerOpen()
    setmark(0)

    polygon = new google.maps.Polygon({
      paths: coordsarray,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    //form the polygon
    polygon.setMap(google.maps.Map);
    console.log(coordsarray)

    //clear watchID
    if (watchID) {
      navigator.geolocation.clearWatch(watchID);
    }

  }

  //addInfo
  const AddInfo = (event) => {
    if (addInfo) {
      setInfo(0);
    }
    else {
      setInfo(1);
    }

  };
  // add request
  const AddRequest = (event) => {
    if (addRequest) {
      setRequest(0);
    }
    else {
      setRequest(1);
    }

  };
  const distance = (coordinate1, coordinate2) => {
    const toRadian = n => (n * Math.PI) / 180
    let lat2 = coordinate2.lat
    let lon2 = coordinate2.lon
    let lat1 = coordinate1.lat
    let lon1 = coordinate1.lon
    let R = 6371 // km
    let x1 = lat2 - lat1
    let dLat = toRadian(x1)
    let x2 = lon2 - lon1
    let dLon = toRadian(x2)
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    return d
  }


  let Data1 = []
  let Activities1 =[]
  let Projects1=[]
  async function getActivities() {
    return axios
      .get("http://localhost:4000/user/getallverifieda")
      .then((response) => {
        setActivity(response.data.activites);
        Activities1 = response.data.activites
        console.log(response)
      })
  }
  async function getProjects() {
    return axios
      .get("http://localhost:4000/user/getallverifiedp")
      .then((response) => {
        setProjects(response.data.projects);
        projects1 = response.data.projects
        console.log(response)
      })
  }
  async function getData() {
    return axios
      .get("http://localhost:4000/admin/unverifiedd")
      .then((response) => {
        setData(response.data.data);
        Data1= response.data.data
        console.log(response)
      })
  }

  const handleDrawerOpen =  async () => {
    var fillteredActivity = []
    var fillteredProjects = []
    var fillteredData = []
    if (pinmarker && pinmarker.setMap) {
      setCoordinate({ lat: pinmarker.latitude, lng: pinmarker.longitude })
    }
    setOpen(true);
    await getActivities()
    await getProjects()
    await getData()

    for (let i = 0; i < Activities1.length; i++) {
      for(int j=0;j< Activities1[i].location.length;j++){
      var x = distance(
        { lat: Activities1[i].location[j].lat, lon: Activities1[i].location[j].lng },
        { lat: coordinate.lat, lon: coordinate.lng }
      );
      if (x < 5000) {
        fillteredActivity.add(Activities[i])
        break;
      }
    }
    }
    for (let i = 0; i < Projects.length; i++) {
      var x = distance(
        { lat: Activities[i].lat, lon: Activities[i].lng },
        { lat: coordinate.lat, lon: coordinate.lng }
      );
      if (x < 5000) {
        fillteredActivity.add(Projects[i])
      }
    }
    console.log(Activities)
    console.log(Projects)
    console.log(Data)
    for (let i = 0; i < Data.length; i++) {
      var x = distance(
        { lat: Activities[i], lon: Activities[i] },
        { lat: coordinate.lat, lon: coordinate.lng }
      );
      console.log(x);
      if (x < 5000) {
        fillteredActivity.add(Data[i])
      }
    }
    console.log(x);




  };


  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onChangeInfo = (event) => {
    setdetails(event.target.value);
  };
  const onChangeType = (event) => {
    setType(event.target.value);
  };
  const onChangeReq = (event) => {
    Request(event.target.value);
  };

  // reset inputs
  const resetInputs = () => {
    setdetails("");
    setInfo(0);
    setRequest(0);
    setCoordsarray([]);
    if (polygon && polygon.setMap) {
      polygon.setMap(null);
    }
  };

  const findCenter = (points) => {

    var longitudes = points.map((i) => i.lat);
    var latitudes = points.map((i) => i.lng);

    latitudes.sort();
    longitudes.sort();

    console.log(latitudes, longitudes)
    var lowX = latitudes[0];
    var highX = latitudes[latitudes.length - 1]
    var lowy = longitudes[0];
    var highy = longitudes[longitudes.length - 1]

    var centerX = lowX + ((highX - lowX) / 2);
    var centerY = lowy + ((highy - lowy) / 2);

    //console.log({lat:centerX, lng:centerY})
    return { lat: centerX, lng: centerY };

  }

  //axios
  const onSubmitInfo = (event) => {
    event.preventDefault();
    if (pinmarker && pinmarker.setMap) {
      setCoordinate({ lat: pinmarker.latitude, lng: pinmarker.longitude })
    }
    console.log(coordsarray, coordinate)
    const data = {
      byEmail: "xyz@gmail.com",  //temporarry ...need to take from token
      location: ((coordsarray != [] && !(pinmarker && pinmarker.setMap)) ? coordsarray : [[coordinate]]),
      center: findCenter(((coordsarray != []) ? coordsarray : [[coordinate]])),
      bodyType: type,
      detail: details,
      date: Date.now(),
    };

    axios
      .post("http://localhost:4000/user/crowdsourced", data)
      .then((response) => {
        console.log(response);
      });

    resetInputs();
  };

  const onSubmitRequest = (event) => {
    event.preventDefault();
    if (pinmarker && pinmarker.setMap) {
      setCoordinate({ lat: pinmarker.latitude, lng: pinmarker.longitude })
    }

    const data = {
      byEmail: "xyz@gmail.com",   //temporarry ...need to take from token
      location: ((coordsarray != [] && !(pinmarker && pinmarker.setMap)) ? coordsarray : [[coordinate]]),
      center: findCenter(((coordsarray != []) ? coordsarray : [[coordinate]])),
      request: request,
      date: Date.now(),
    };

    axios
      .post("http://localhost:4000/user/request", data)
      .then((response) => {
        console.log(response);
      });

    resetInputs();
  };





  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              component="search"
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            //onChange={point_to_address}
            />
          </List>

          {startMarking === 0 && <button type="button" className="btn btn-primary"           // need to change the looks
            onClick={mark_water_body}>
            Mark Water Body
          </button>}
          {startMarking === 1 && <button type="button" className="btn btn-primary"           // need to change the looks
            onClick={stop_marking}>
            stop marking
          </button>}
        </Toolbar>

      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Activities', 'Projects', 'Infomation Present'].map((text, index) => (
            <ListItem button key={text}>

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>

          <ListItem button key={'Add water body'} onClick={AddInfo}>
            <ListItemText primary={'Add water body'} />
          </ListItem>

          {addInfo === 1 && <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 340 }}>

              <TextField
                label="Type of Body"
                variant="outlined"

                onChange={onChangeType}
              />
              <TextField
                label="Any Comments"
                variant="outlined"

                onChange={onChangeInfo}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 340 }}>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
              <button type="button" className="btn btn-primary"
                onClick={onSubmitInfo}>
                Upload Image
              </button>
            </FormControl>
            <Grid item xs={12}>
              <Button variant="contained" onClick={onSubmitInfo}>
                Submit
              </Button>
            </Grid>
          </Grid>
          }
          <ListItem button key={'Request'} onClick={AddRequest}>
            <ListItemText primary={'Request'} />
          </ListItem>

          {addRequest === 1 && <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 340 }}>
              <TextField
                label=""
                variant="outlined"

                onChange={onChangeReq}
              />
            </FormControl>
            <Grid item xs={12}>
              <Button variant="contained" onClick={onSubmitRequest}>
                Submit
              </Button>
            </Grid>
          </Grid>
          }


        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <div style={{ height: '100%', width: '100%', marginTop: '70px' }}>


          {/* Page content */}
          <Container className="mt--7" fluid>
            <List component="nav" aria-label="mailbox folders">

            </List>
            <Row>
              <div className="col">
                <Card className="shadow border-0">
                  <MapWrapper>
                  </MapWrapper>

                </Card>
              </div>
            </Row>
          </Container>
        </div>
      </Main>
    </Box>
  );

};

export default Maps;
