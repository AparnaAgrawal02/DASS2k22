import { useRef, useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
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
axios.defaults.withCredentials = true
const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userPinCode, setUserPinCode] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [userType, setUserType] = useState('female');


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [userEmail, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user,pwd,userType);

    const newUser = {
      email: userEmail,
      password: pwd
    };

    console.log(newUser);

    if (userType === 'super_admin') {
      axios.post('http://localhost:5000/superadmin/registersuperadmin', {
        name: userName,
        email: userEmail,
        password: pwd,
        contactNo: userContact,
        pincode: userPinCode,
        address: userAddress
      }).then((response) => {
        console.log(response);

      })
        .catch(error => { console.log(error.response); })
    } else if (userType === 'admin') {
      axios.post('http://localhost:5000/admin/registeradmin', {
        name: userName,
        email: userEmail,
        password: pwd,
        contactNo: userContact,
        pincode: userPinCode,
        address: userAddress
      }).then((response) => {
        console.log(response);
      })
        .catch(error => { console.log(error.response); })
    } else if (userType === 'normal_user') {
      axios.post('http://localhost:5000/user/registeruser', {
        name: userName,
        email: userEmail,
        password: pwd,
        contactNo: userContact,
        pincode: userPinCode,
        address: userAddress
      }).then((response) => {
        console.log(response);
        console.log(localStorage.getItem("token"));
      })
        .catch(error => { console.log(error.response); })
    }
    setPwd("");
    setUserName("");
    setUserEmail("");
    setUserType("");
    setUserAddress("");
    setUserContact("");
    setSuccess(true);
  }

  return (
    <>{success ? (
      <section>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-white pb-5">
              <div className="text-muted text-center mb-3">
                <h1>Registration completed</h1>
              </div>
              <a href="localhost:5000/auth/login">Please head to login page to login.</a>
            </CardHeader>
          </Card>
        </Col>
      </section>
    ) : (
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
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
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="email"
                    id="email"
                    autoComplete="on"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    required
                    placeholder="Email"
                    ref={userRef}
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
                    autoComplete="on"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    type="password"
                    placeholder="Password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text"
                    id="phone"
                    autoComplete="on"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                    placeholder="Name" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text"
                    id="name"
                    autoComplete="on"
                    onChange={(e) => setUserContact(e.target.value)}
                    value={userContact}
                    required
                    placeholder=" Phone no: +91 - XXXXX - XXXXXX" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="number"
                    id="pincode"
                    autoComplete="on"
                    onChange={(e) => setUserPinCode(e.target.value)}
                    value={userPinCode}
                    required
                    placeholder="Pincode" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text"
                    id="address"
                    autoComplete="on"
                    onChange={(e) => setUserAddress(e.target.value)}
                    value={userAddress}
                    required
                    placeholder="Address" />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
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

              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick={handleSubmit} >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>

    )}
    </>
  );
};

export default Register;
