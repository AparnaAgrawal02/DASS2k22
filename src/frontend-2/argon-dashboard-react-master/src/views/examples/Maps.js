/*!

*/
import React from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { collapseTextChangeRangesAcrossMultipleVersions, couldStartTrivia, createUnparsedSourceFile } from "typescript";
import { style } from "@mui/system";

/*import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';*/
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
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
//axios.defaults.withCredentials = true

let layerData = []

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

  const [clicks, setClicks] = useState([]);

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
  let marker;
  let markerpos
  let google;
  let map;
  function placeMarker(map, location) {
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
    pinmarker = marker
    var infowindowRed = new google.maps.InfoWindow({
      content: 'Latitude: ' + location.lat() +
        '<br>Longitude: ' + location.lng()

    });
    //infowindow.open(map, marker);
    google.maps.event.addListener(marker, 'click', function () {
      infowindowRed.open(map, marker);
    });
  }




  React.useEffect(async () => {
    //default
    let lat = "40.748817";
    let lng = "-73.985428";
    // function displayLayer() {

    // };


    //layering

    axios
      .get("http://localhost:5000/admin/unverifiedd")
      .then((response) => {
        console.log(response.data.data)
        // setlayerData(response.data.data);
        layerData = response.data.data
        console.log(layerData.length)

      })


    const cord = await getCoords();

    console.log(cord)
    google = window.google;
    map = mapRef.current;
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
      markerpos = event.latLng
      placeMarker(map, event.latLng);
    });





    // Add a style-selector control to the map.
    const DropDownLayer = document.getElementById("style-selector-control");

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(DropDownLayer);
    let polygons = []
    let specficmarkers = []
    let specificdata = []

    function AddLayerHelper(text) {
      for (let i = 0; i < layerData.length; i++) {
        if (layerData[i].bodyType.toUpperCase() == text) {
          specificdata.push(layerData[i])
        }
      }
      console.log(specificdata)

    }

    //clear specific data?

    function AddLayer(text) {

      // polygons = []
      // specficmarkers = []

      for (let i = 0; i < polygons.length; i++) {
        console.log(polygons[i].setVisible(false))
      }
      polygons.length = 0

      specficmarkers.forEach((marker) => {
        marker.setMap(null);
      });




      // for (let i = 0; i < polygons.length; i++) {
      //   console.log(polygons[i].setVisible(true))
      // }
      specificdata.length = 0
      specificdata = []


      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      var markerIcon

      //clear the marker icon later

      if (text.toUpperCase() === "LAKES") {
        markerIcon = {
          url: "https://i.ibb.co/gW2h3FB/lake.png",
          scaledSize: new google.maps.Size(40, 40)
        };

        AddLayerHelper("LAKE")
      }

      if (text.toUpperCase() === "STEPWELLS") {
        markerIcon = {
          url: "https://i.ibb.co/hLGXxdc/well.png",
          scaledSize: new google.maps.Size(40, 40)
        };
        AddLayerHelper("STEPWELL")
      }
      if (text.toUpperCase() === "BOREWELLS") {
        markerIcon = {
          url: "https://i.ibb.co/gFst9GJ/water-well-1.png",
          scaledSize: new google.maps.Size(40, 40)
        };
        AddLayerHelper("BOREWELL")

      }
      if (text.toUpperCase() === "RAINWATER HARVESTING PIT") {
        markerIcon = {
          url: "https://i.ibb.co/RNnLtFc/rainwater.png",
          scaledSize: new google.maps.Size(40, 40)
        };
        AddLayerHelper("RAINWATER HARVESTING PIT")
      }
      // else {

      //   //events and projects

      //   markerIcon = {
      //     url: "https://i.ibb.co/gW2h3FB/lake.png",
      //     scaledSize: new google.maps.Size(40, 40)
      //   };


      // }



      // let polygons = []
      let x = 0;




      for (let i = 0; i < specificdata.length; i++) {

        if (specificdata[i].location.length == 1) {
          console.log(specificdata[i].location[0].lat)

          marker = new google.maps.Marker({
            icon: markerIcon,

            position: { lat: specificdata[i].location[0].lat, lng: specificdata[i].location[0].lng },
            map: map,
            animation: google.maps.Animation.DROP,

          });
          specficmarkers.push(marker)
          var infowindow = new google.maps.InfoWindow({
            content: 'body: ' + specificdata[0].bodyType,
            position: { lat: specificdata[i].center.lat, lng: specificdata[i].center.lng }

          });
          infowindow.open(map, marker);
          google.maps.event.addListener(marker, 'click', function () {
            console.log(specificdata[i].location[0].lat)
            infowindow.setPosition({ lat: specificdata[i].center.lat, lng: specificdata[i].center.lng })
            infowindow.open(map, marker);
          });



        }
        else {
          x += 1
          //console.log(lakeData[i].location[0].lat, lakeData[i].location[0].lng)
          const polygon2 = new google.maps.Polygon({
            paths: specificdata[i].location,
            strokeColor: "#800000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#800000",
            fillOpacity: 0.35,
            map: map,
            //editable: true

          });

          polygons.push(polygon2)
          var infowindow2 = new google.maps.InfoWindow({
            content: 'body: ' + specificdata[i].bodyType

          });

          //infowindow.open(map, marker);
          google.maps.event.addListener(polygon2, 'click', function () {

            console.log("works")
            console.log(polygon2)
            // console.log(polygon2.paths)
            // infowindow2.setPosition(polygon2.paths[0]);
            infowindow2.setPosition(specificdata[i].location[0]);


            infowindow2.open(map);
          });

          //form the polygon
          //polygon2.setMap(map);
        }

        // polygon2.setPath(lakeData)
      }
      console.log(polygons)

      for (let i = 0; i < polygons.length; i++) {
        console.log(polygons[i].setVisible(true))
      }
    }

    // Set the map's style to the initial value of the selector.
    document.getElementById('style-selector').addEventListener('change', function () {
      console.log('You selected: ', this.value);
      let body1 = this.value
      AddLayer(body1);
    })


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



  return (
    <>
      <div
        style={{ height: `800px` }}
        className="map-canvas"
        id="map-canvas"
        ref={mapRef}


      ></div>

      <div id="style-selector-control" class="map-control" >
        <select id="style-selector" class="selector-control" label="Layer" style={{ width: "120px", height: "30px" }} >
          <option value="Lakes" selected="selected" >WaterBody  </option>
          <option value="Lakes">Lakes</option>
          <option value="Stepwells">Step Wells</option>
          <option value="Borewells">Borewells</option>
          <option value="Rainwater Harvesting Pits" >Rainwater Harvesting Pits</option>
          <option value="Projects">Projects</option>
          <option value="Events">Events</option>
        </select>
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
  const [addActivity, setActivity] = useState(0);
  const [addProject, setProject] = useState(0);
  const [addActivityName, setActivityName] = useState("");
  const [addProjectName, setPName] = useState("");
  const [addAAddress, setActivityA] = useState("");
  const [addADetail, setActivityDetail] = useState("");
  const [files,setImageFiles] = useState("")
  const [addPAddress, setPAddress] = useState("");



  const [addRequest, setRequest] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  // const [Activities, setActivity] = useState([]);
  // const [Projects, setProjects] = useState([]);
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
 


  // reset inputs
  const resetInputs = () => {
    setdetails("");
    setActivityName("")
    setInfo(0);
    setRequest(0);
    setCoordsarray([]);
    setPName("")
    setActivityDetail("")
    setActivityA("")
    setPAddress("")


    if (polygon && polygon.setMap) {
      polygon.setMap(null);
    }
    if (pinmarker && pinmarker.setMap) {
      pinmarker.setMap(null);
    }
  };

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
  /* google.maps.event.addListener(google.maps.Map, 'click', function (event) {
    handleDrawerOpen();
  }) */
  //1.2 stop geting cordinates and draws th epolygon
  const stop_marking = () => {
    handleDrawerOpen()
    setmark(0)

    polygon = new google.maps.Polygon({
      paths: coordsarray,
      strokeColor: "#800000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#800000",
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

  //add activity

  const AddActivity = (event) => {
    if (addActivity) {
      setActivity(0);
    }
    else {
      setActivity(1);
    }

  };

  //add project

  const AddProject = (event) => {
    if (addProject) {
      setProject(0);
    }
    else {
      setProject(1);
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
    console.log(lat2, lon2, lat1, lon1)
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
  let Projects1 = []
  let Activites1 = []
  async function getActivities() {
    var res = axios
      .get("http://localhost:5000/user/getallverifieda")
      .then((response) => {
        Activites1 = response.data.activities
        console.log(response)
      })
    return Activites1
  }
  async function getProjects() {
    var res = await axios
      .get("http://localhost:5000/user/getallverifiedp")
      .then((response) => {
        Projects1 = response.data.projects;
        console.log(response)
      })

    return Projects1
  }
  async function getData() {
    var res = await axios
      .get("http://localhost:5000/admin/unverifiedd")
      .then((response) => {
        Data1 = response.data.data
      })
    return Data1
  }
  var fillteredActivity = []
  var fillteredProjects = []
  var fillteredData = []
  const handleDrawerOpen = async () => {

    if (pinmarker && pinmarker.setMap) {
      setCoordinate({ lat: pinmarker.position.lat(), lng: pinmarker.position.lng() })
    }
    setOpen(true);
    await getActivities()
    await getProjects()
    await getData()

    for (let i = 0; i < Activites1.length; i++) {
      for (let j = 0; j < Activites1[i].location.length; j++) {
        var x = distance(
          { lat: Activites1[i].location[j].lat, lon: Activites1[i].location[j].lng },
          { lat: coordinate.lat, lon: coordinate.lng }
        );
        if (x < 4000) {
          fillteredActivity.push(Activites1[i])
        }
      }
    }

    for (let i = 0; i < Projects1.length; i++) {
      for (let j = 0; j < Projects1[i].location.length; j++) {
        var x = distance(
          { lat: Projects1[i].location[j].lat, lon: Projects1[i].location[j].lng },
          { lat: coordinate.lat, lon: coordinate.lng }
        );
        if (x < 4000) {
          fillteredProjects.push(Projects1[i])
        }
      }
    }
    console.log(Activites1)
    console.log(Projects1)
    console.log(Data1)
    for (let i = 0; i < Data1.length; i++) {
      for (let j = 0; j < Data1[i].location.length; j++) {
        var x = distance(
          { lat: Data1[i].location[j].lat, lon: Data1[i].location[j].lng },
          { lat: coordinate.lat, lon: coordinate.lng }
        );
        console.log(x);
        if (x < 4000) {
          fillteredData.push(Data1[i])
          break
        }

      }
    }
    console.log(fillteredData);

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

  const onChangeActivityAddress = (event) => {
    setActivityA(event.target.value);
  };

  const onChangeActivityName = (event) => {
    setActivityName(event.target.value);
  };



  const onChangeActivityDetails = (event) => {
    setActivityDetail(event.target.value);
  };

  const onChangePAddress = (event) => {
    setPAddress(event.target.value);
  };


  const onChangePName = (event) => {
    setPName(event.target.value);
  };
  const onImageChange= (event) => {
    //setImageFile(event.target.value);
    console.log(event.target.value)

  }
  const imageChangeFile = (event)=>{
    event.preventDefault()
   let file = event.target.files[0].name
   console.log(event.target.files)
   setImageFiles(event.target.files)
    console.log(file)
    
  }
  const handleImageSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    for(var x = 0; x<files.length; x++) {
        data.append('files', files[x])
    }
  }

  
  const findCenter = (points) => {

    var longitudes = points.map((i) => i.lng);
    var latitudes = points.map((i) => i.lat);

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
    let loc = coordinate
    //console.log(pinmarker, pinmarker.position.lat(), pinmarker.position.lng(), "aa")
    if (pinmarker) {
      setCoordinate({ lat: pinmarker.position.lat(), lng: pinmarker.position.lng() })
      loc = { lat: pinmarker.position.lat(), lng: pinmarker.position.lng() }

    }

    console.log(coordsarray, coordinate)
    const data = {
      location: ((coordsarray.length > 1) ? coordsarray : [loc]),
      center: findCenter(((coordsarray.lenght > 1) ? coordsarray : [loc])),
      bodyType: type,
      detail: details,
    };
    axios
    .post("http://localhost:5000/user/crowdsourced", data)
    .then((response) => {
      console.log(response);
    });

  resetInputs();

  }

  const onSubmitActivity = (event) => {
      event.preventDefault();
      let loc = coordinate
      //console.log(pinmarker, pinmarker.position.lat(), pinmarker.position.lng(), "aa")
      if (pinmarker) {
        setCoordinate({ lat: pinmarker.position.lat(), lng: pinmarker.position.lng() })
        loc = { lat: pinmarker.position.lat(), lng: pinmarker.position.lng() }

      }
      

      console.log(coordsarray, coordinate)
      const data = {
        location: ((coordsarray.length > 1) ? coordsarray : [loc]),
        center: findCenter(((coordsarray.lenght > 1) ? coordsarray : [loc])),
        bodyType: type,
        ActivityName:addActivityName,
        details: addADetail,
        address:addAAddress
        
      };

      axios
        .post("http://localhost:5000/user/requestActivity", data)
        .then((response) => {
          console.log(response);
        });

      resetInputs();
    };
  
    const onSubmitProject = (event) => {
      event.preventDefault();
      let loc = coordinate
      //console.log(pinmarker, pinmarker.position.lat(), pinmarker.position.lng(), "aa")
      if (pinmarker) {
        setCoordinate({ lat: pinmarker.position.lat(), lng: pinmarker.position.lng() })
        loc = { lat: pinmarker.position.lat(), lng: pinmarker.position.lng() }

      }

      console.log(coordsarray, coordinate)
      const data = {
        location: ((coordsarray.length > 1) ? coordsarray : [loc]),
        center: findCenter(((coordsarray.lenght > 1) ? coordsarray : [loc])),
        bodyType: type,
        detail: details,
        date: Date.now(),
      };

      axios
        .post("http://localhost:5000/user/crowdsourced", data)
        .then((response) => {
          console.log(response);
        });

      resetInputs();
    };




  const onSubmitRequest = (event) => {
    event.preventDefault();
    if (pinmarker && pinmarker.setMap) {
      setCoordinate({ lat: pinmarker.position.lat(), lng: pinmarker.position.lng() })
    }
    let loc = coordinate
    console.log(pinmarker, pinmarker.position.lat(), pinmarker.position.lng(), "aa")
    if (pinmarker) {
      setCoordinate({ lat: pinmarker.position.lat(), lng: pinmarker.position.lng() })
      loc = { lat: pinmarker.position.lat(), lng: pinmarker.position.lng() }

    }

    const data = {
      byEmail: "xyz@gmail.com",   //temporarry ...need to take from token
      location: ((coordsarray.lenght > 1) ? coordsarray : [loc]),
      center: findCenter(((coordsarray.lenght > 1) ? coordsarray : [loc])),
      request: request,
      date: Date.now(),
    };

    axios
      .post("http://localhost:5000/user/request", data)
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


              <InputLabel id="demo-simple-select-label">Body Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Body Type"
                onChange={onChangeType}
              >
                <MenuItem value={"Lake"}>Lake</MenuItem>
                <MenuItem value={"Step Well"}>Step Well</MenuItem>
                <MenuItem value={"Bore Well"}>Bore Well</MenuItem>
                <MenuItem value={"Rainwater Harvesting"}>Bore Well</MenuItem>

              </Select>


              {/* <TextField
                label="Type of Body"
                variant="outlined"

                onChange={onChangeType}
              /> */}
              <TextField
                label="Any Comments"
                variant="outlined"

                onChange={onChangeInfo}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 340 }}>
              <div >
                <input
                  type="file"
                  //className="custom-file-input"
                  name ="image"
                  id="image"
                  accept ="image/*"
                  encType = "multipart/form-data"
                  required
                  //aria-describedby="inputGroupFileAddon01"
                  onChange={(imageChangeFile)}
                />
                
              </div>
              <button type="button" className="btn btn-primary"
                onClick={handleImageSubmit}>
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


          <ListItem button key={'Add Activity'} onClick={AddActivity}>
            <ListItemText primary={'Add Activity'} />
          </ListItem>

          {addActivity === 1 && <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 340 }}>

              <TextField
                label="Activity Name"
                variant="outlined"

                onChange={onChangeActivityName}
              />
              <TextField
                label="Address"
                variant="outlined"

                onChange={onChangeActivityAddress}
              />

              <TextField
                label="Details"
                variant="outlined"

                onChange={onChangeActivityDetails}
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
              <Button variant="contained" onClick={onSubmitActivity}>
                Submit
              </Button>
            </Grid>
          </Grid>
          }
          <ListItem button key={'Add Project'} onClick={AddProject}>
            <ListItemText primary={'Add Project'} />
          </ListItem>

          {addProject === 1 && <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 340 }}>

              <TextField
                label="Project Name"
                variant="outlined"

                onChange={onChangePName}
              />
              <TextField
                label="Address"
                variant="outlined"

                onChange={onChangePAddress}
              />

            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 340 }}>
              <div className="custom-file">
              <input type="file" multiple accept="image/*" onChange={onImageChange} />

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
