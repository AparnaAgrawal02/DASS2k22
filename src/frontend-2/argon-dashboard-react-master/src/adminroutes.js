import Index from "./views/Index.js";
import SaIndex from "./views/SaIndex";
import Profile from "./views/examples/Profile.js";
import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";
import AdminMaps from "./views/examples/AdminMaps.js";
import AdminDashBoard from "./views/examples/AdminDashBoard";
var adminroutes = [
  {
    path: "/AdminDashBoard",
    name: "AdminDashBoard",
    icon: "ni ni-circle-08 text-pink",
    component: AdminDashBoard,
    layout: "/admin",
  },
 
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },

  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },


];
export default adminroutes;
