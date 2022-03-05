import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline, Grid } from '@material-ui/core';
import "./App.css";

/* import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register"; */
import Map from "./components/maps/Map";
 import Navbar from "./components/templates/Navbar";
/*import Profile from "./components/users/Profile";
import SideBar from "./components/maps/SideBar" */

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} /> */}
          <Route path="map" element={
             <Map />
          
          
          } />
        {/*   <Route path="profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
