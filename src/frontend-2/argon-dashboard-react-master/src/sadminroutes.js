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
var sadminroutes = [

  {
    path: "/index",
    name: "Dashboard - SuperAdmin",
    icon: "ni ni-tv-2 text-primary",
    component: SaIndex,
    layout: "/superadmin",
  },

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


  {
    path: "/AdminDashBoard",
    name: "AdminDashBoard",
    icon: "ni ni-circle-08 text-pink",
    component: AdminDashBoard,
    layout: "/admin",
  },
];
export default sadminroutes;
