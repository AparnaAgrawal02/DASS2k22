/*!



*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap"; 
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";


function onSubmit(event) {
  
  var Admin=0,SuperAdmin=0,NormalUser=0;

  if(document.getElementById("exampleFormControlSelect1").value=="Admin"){
  Admin = 1;
  }
  else if(document.getElementById("exampleFormControlSelect1").value=="SuperAdmin"){
  SuperAdmin = 1;
  }
  else if(document.getElementById("exampleFormControlSelect1").value=="NormalUser"){
  NormalUser = 1;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeEmail(event) {
      setEmail(event.target.value);
  }

  function onChangePassword(event) {
      setPassword(event.target.value);
  }


  const currUser = {
    email: email ,
    password: password,
  };

 

  event.preventDefault(); // prevent default form submission
  const uri = "http://localhost:4000/user/loginuser";


  function LoginUseer() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }
  }
  
  if(Admin){
    axios
      .post(uri, currUser)
      .then((response) => {
          currentUserDetails.data = response.data;
          currentUserDetails.email = response.data.email;
          currentUserDetails.name = response.data.name;
          currentUserDetails.type = "Admin";
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("type", "Admin");
          alert(
              "Welcome to LeafCraft! We are happy to have you here," +
                  response.data.name ,
                  "!"
          );
      })
      .catch(() => {
          alert("Try Again");
      });

  }
  if(SuperAdmin){
    axios
    .post(uri, currUser)
    .then((response) => {
        currentUserDetails.data = response.data;
        currentUserDetails.email = response.data.email;
        currentUserDetails.name = response.data.name;
        currentUserDetails.type = "SuperAdmin";
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("type", "SuperAdmin");
        alert(
            "Welcome to LeafCraft! We are happy to have you here," +
                response.data.name ,
                "!"
        );
    })
    .catch(() => {
        alert("Try Again");
    });
  }
  if(NormalUser){
    axios
      .post(uri, currUser)
      .then((response) => {
          currentUserDetails.data = response.data;
          currentUserDetails.email = response.data.email;
          currentUserDetails.name = response.data.name;
          currentUserDetails.type = "User";
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("type", "User");
          alert(
              "Welcome to LeafCraft! We are happy to have you here," +
                  response.data.name ,
                  "!"
          );
      })
      .catch(() => {
          alert("Try Again");
      });
  }


}


const Login = () => {
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    label="Email"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    label="Password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    Use this to keep your browser logged in.
                  </CardHeader>
                </Card>
              </div>
              <div class="form-group">
                  <label for="exampleFormControlSelect1">Which type of user are you?</label>
                  <select class="form-control" id="exampleFormControlSelect1" onChange={onChangeSelect}>
                    <option >Normal User</option>
                    <option>Admin</option>
                    <option>SuperAdmin</option>
                  </select>
                  </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
