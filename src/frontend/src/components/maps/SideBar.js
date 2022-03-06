import { useState, useEffect } from "react";
import { CssBaseline, Grid } from '@material-ui/core';
const SideBar = (props) => {
  const [name, setName] = useState("");


  useEffect(() => {
    setName("Dass TAs");
  }, []);

  return <div style={{ textAlign: "center" }}>Happy Coding - {name}</div>;
};

export default SideBar;
