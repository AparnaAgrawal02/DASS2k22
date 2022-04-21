import { useRef, useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
// import sendtoken from "../../utils/jwttoken";
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

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [userType, setUserType] = useState('female');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user,pwd,userType);

    const newUser = {
      email: user,
      password: pwd
    };

    console.log(newUser);

    if (userType === 'super_admin') {
      axios.post('http://localhost:4000/superadmin/loginsuperadmin', {
        email: user,
        password: pwd,
      }).then((response) => {
        console.log(response);
        if (response.data.success) {
          setSuccess(response.data.success);
          localStorage.setItem('token', response.data.token);
          window.location.href = 'http://localhost:4000/superadmin/index';
          // sendtoken(response.data.user,200,response.data.token);
        }
      })
        .catch(error => { console.log(error.response); })
    } else if (userType === 'admin') {
      axios.post('http://localhost:4000/admin/loginadmin', {
        email: user,
        password: pwd,
      }).then((response) => {
        console.log(response);
        if (response.data.success) {
          setSuccess(response.data.success);
          localStorage.setItem('token', response.data.token);
          window.location.href = 'http://localhost:4000/admin/dashboard';
        }
      })
        .catch(error => { console.log(error.response); })
    } else if (userType === 'normal_user') {
      axios.post('http://localhost:4000/user/loginuser', {
        email: user,
        password: pwd,
      }).then((response) => {
        console.log(response);
        if (response.data.success) {
          setSuccess(response.data.success);
          localStorage.setItem('token', response.data.token);
          window.location.href = 'http://localhost:4000/user/dashboard';
        }
      })
        .catch(error => { console.log(error.response); })
    }
    setPwd("");
    setUser("");
    setUserType("");
    setSuccess(true);
  }

  return (

    <>
      {success ? (
        <section>
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <h1>
                  You are logged in!
                </h1>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <a href="localhost:3001/admin/index">You can now access the dashboard.</a>
              </div>
            </CardBody>
          </Card>



        </section>
      ) : (
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
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      id="email"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      placeholder="Email"
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
                      id="password"
                      autoComplete="off"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      type="password"
                    />
                  </InputGroup>
                </FormGroup>

                <div className="custom-control" >
                  <FormControl>
                    <FormLabel id="user-type-controlled-row-radio-buttons-group-label">User Type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="user-type-controlled-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <FormControlLabel value="normal_user" control={<Radio />} label="Normal User" />
                      <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                      <FormControlLabel value="super_admin" control={<Radio />} label="Super Admin" />
                      <FormControlLabel
                        value="disabled"
                        disabled
                        control={<Radio />}
                        label="other"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
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

                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={handleSubmit}>
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

      )}
    </>
  );
};

export default Login;
