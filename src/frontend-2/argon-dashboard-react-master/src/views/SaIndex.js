/*!



*/
import Header from "../components/Headers/Header.js";
import Admin from "../layouts/Admin";
import axios from "axios";
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { Media } from "reactstrap";
import { Form, FormGroup, Input, CardFooter } from "reactstrap";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "../variables/charts.js";

var editing;



const SaIndex = (props) => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");
    const [userType, setUserType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [password, setPassword] = useState('');
    const [pincode, setPincode] = useState('');
    const [admins, setAdmins] = useState([]);
    const [editing,setEditing] = useState(false);
    const [editId,setEditId] = useState('');

    var AdminArray = [{
        "_id": "62613f40d1753e440ef5aa0d",
        "name": "Vivek",
        "email": "vivekofficialwork1@gmail.com",
        "password": "$2a$10$cXJ04w2aGpkAksz4NyGRyexHiWIthIlAjlPkyqqDE8aODYMv6QSe6",
        "contactNo": "1982379812",
        "pincode": 1724392837,
        "address": "akhsdaskjhdk",
        "__v": 0
    },
    {
        "_id": "626144a0d1753e440ef5aa12",
        "name": "Vivek",
        "email": "vivekofficialwork2@gmail.com",
        "password": "$2a$10$DJakJybtrZiIniCtvVkEYuJhkHz1GBsCVzzihgm9MgIOY8uvy.U5.",
        "contactNo": "1982379812",
        "pincode": 1724392837,
        "address": "akhsdaskjhdk",
        "__v": 0
    },
    {
        "_id": "6261552c6aa4a1d125f93cfb",
        "name": "Vivek",
        "email": "vivekofficialworkasd@gmail.com",
        "password": "$2a$10$Ojz5g4kbjdkTTApNqnwHiOLgu/Fc8NGmcXhpYs0T5mg9YrqmbVWQC",
        "contactNo": "1982379812",
        "pincode": 1724392837,
        "address": "akhsdaskjhdk",
        "__v": 0
    }];


    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, SaIndex) => {
        e.preventDefault();
        setActiveNav(SaIndex);
        setChartExample1Data("data" + SaIndex);
    };

    // var getAdmins = () => {
    //     fetch("http://localhost:8080/admin/getAllAdmins", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //            setAdmins(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    var token = localStorage.getItem("token");

    var getAdmins = () => {
        axios.get("http://localhost:5000/superadmin/getAllAdmins", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                console.log(response);
                setAdmins(response.data);
            })
            .catch((error) => {
                console.log(error);


                setAdmins(AdminArray);
            });
    };

   

    getAdmins();
    // var name, email, password, address, contactNo, pincode;
    console.log(AdminArray);
    console.log(admins);


    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8" >
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            List of Admin Accounts  </h6>
                                        <h2 className="text-white mb-0">Admin Accounts</h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {getAdmins()} */}

                                      


                                        {admins.map((admin) => (

                                            <tr>
                                                <th scope="row">
                                                    <Media className="align-items-center">
                                                        <a
                                                            className="avatar rounded-circle mr-3"

                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <img
                                                                alt="..."
                                                                src={require("../assets/img/theme/team-1-800x800.jpg")}
                                                            />
                                                        </a>
                                                        <Media>
                                                            <span className="mb-0 text-sm text-white">
                                                                {admin.name}
                                                            </span>
                                                        </Media>
                                                    </Media>
                                                </th>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">
                                                            <i className="fas fa-circle text-success" />
                                                        </span>
                                                        <div>
                                                            <a
                                                                className="text-white"
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                {admin.email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">
                                                            <i className="fas fa-circle text-success" />
                                                        </span>
                                                        <div>
                                                            <a
                                                                className="text-white"
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                {admin.contactNo}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">
                                                            <i className="fas fa-circle text-success" />
                                                        </span>
                                                        <div>
                                                            <a
                                                                className="text-white"
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                {admin.address}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            className="btn-icon-only text-light text-white icon-white"
                                                            href="#pablo"
                                                            role="button"
                                                            size="sm"
                                                            color="white"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                            }}
                                                        >
                                                            <i className="fas fa-ellipsis-v" />
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow " right>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setEditing(true);
                                                                    setEditId( admin._id); 
                                                                }}
                                                            >
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    var k = (admins.indexOf(admin))
                                                                    var l = (admins.length)
                                                                    var AdminArray2
                                                                    var i = 0
                                                                    while (i < l) {
                                                                        if (i === k) {
                                                                            continue
                                                                        }
                                                                        AdminArray2.push(admins[i + 1]);
                                                                        i++;
                                                                    }
                                                                    admins = AdminArray2;
                                                                }
                                                                }
                                                            >
                                                                Delete
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        )
                                        )}

                                        
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                    <>
                        {editing ? (
                            <Col xl="4">
                                <Card className="bg-gradient-default shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h6 className="text-uppercase text-light ls-1 mb-1">
                                                    Overview
                                                </h6>
                                                <h2 className="text-white mb-0"> Edit Admin Credentials</h2>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <h6 className="heading-small text-muted mb-4">
                                                User information
                                            </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Name
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Name"
                                                                type="text"
                                                                value={name}
                                                                onChange={(e) => {
                                                                    setName(e.target.value)

                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-email"
                                                            >
                                                                Email address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-email"
                                                                placeholder="Email address"
                                                                type="email"
                                                                value={email}
                                                                onChange={(e) => {
                                                                    setEmail(e.target.value)
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-contact-no"
                                                            >
                                                                Contact No
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-contact-no"
                                                                placeholder="Contact No"
                                                                type="text"
                                                                value={contactNo}
                                                                onChange={(e) => {
                                                                    setContactNo(e.target.value)
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-address"
                                                            >
                                                                Address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-address"
                                                                placeholder="Address"
                                                                type="text"
                                                                value={address}
                                                                onChange={(e) => {
                                                                    setAddress(e.target.value)
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-password"
                                                            >
                                                                Password
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-password"
                                                                placeholder="Password"
                                                                type="password"
                                                                value={password}
                                                                onChange={(e) => {
                                                                    setPassword(e.target.value)
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-pincode"
                                                            >
                                                               Pincode
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-pincode"
                                                                placeholder="Pincode"
                                                                type="pincode"
                                                                value={pincode}
                                                                onChange={(e) => {
                                                                    setPincode(e.target.value)
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </  div>
                                        </Form>
                                    </CardBody>
                                    <CardFooter className="bg-light">
                                        <Button
                                            className="btn-neutral btn-icon mr-3"
                                            color="default"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                axios.post('http://localhost:5000/admin/loginadmin', {
                                                    email: user,
                                                    password: pwd,
                                                }).then((response) => {
                                                    console.log(response.data);
                                                    if (response.data.message === "Login Successful") {
                                                        axios.put('http://localhost:5000/admin/updateadmin', {
                                                            email: email,
                                                            name: name,
                                                            contactNo: contactNo,
                                                            address: address,
                                                            pincode: pincode,
                                                        }).then((response) => {
                                                            console.log(response.data);
                                                        }).catch((error) => {
                                                            console.log(error);
                                                        })
                                                    }
                                                    else {
                                                        alert("Invalid Credentials");
                                                    }
                                                }).catch((error) => { })

                                                setName('');
                                                setEmail('');
                                                setContactNo('');
                                                setAddress('');
                                                setPassword('');
                                                setPincode('');
                                                setEditId("");
                                                setEditing(false);
                                            }}
                                        >
                                            <span className="btn-inner--icon">
                                                <i className="ni ni-bold-left" />
                                                Submit
                                            </span>
                                        </Button>
                                    </CardFooter>


                                </Card>
                            </Col>
                        ) : (<div></div>)
                    }
                    </>

                </Row>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card>
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Register more Admins
                                        </h6>
                                        <h2 className="mb-0">
                                            <a href="http://localhost:3001/auth/login">Admin Registration</a>
                                        </h2>
                                    </div>
                                </Row>

                            </CardHeader>
                        </Card>
                    </Col>
                    <Col xl="4">

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SaIndex;
