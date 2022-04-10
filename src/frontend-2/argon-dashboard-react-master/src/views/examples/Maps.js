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


//MapWrapper 
const MapWrapper = () => {


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

    const cord = await getCoords();
    console.log(cord)


    let google = window.google;
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

    //marker
    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,

      animation: google.maps.Animation.DROP,
      title: "Light Bootstrap Dashboard PRO React!",
    });

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

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  }, []);

  return (
    <>
      <div
        style={{ height: `800px` }}
        className="map-canvas"
        id="map-canvas"
        ref={mapRef}
      ></div>
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
  const [postal, setPostal] = useState("");
  const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
  const [coordsarray, setCoordsarray] = useState([]);
  const [bound, setBounds] = useState(null);
  const [watchID, setWatchId] = useState(null);
  const [startMarking, setmark] = useState(0);
  const [type, setType] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
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

  //1.2 stop geting cordinates and draws th epolygon
  const stop_marking = () => {

    setmark(0)

    const polygon = new google.maps.Polygon({
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


  const handleDrawerOpen = () => {
    setOpen(true);
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

    const data = {
      byEmail: "xyz@gmail.com",  //temporarry ...need to take from token
      location: ((coordsarray != []) ? coordsarray : [[coordinate]]),
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

    const data = {
      byEmail: "xyz@gmail.com",   //temporarry ...need to take from token
      location: ((coordsarray != []) ? coordsarray : [[coordinate]]),
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

                  <MapWrapper />
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
