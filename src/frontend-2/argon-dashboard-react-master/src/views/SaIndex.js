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

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, SaIndex) => {
        e.preventDefault();
        //setActiveNav(SaIndex);
        //setChartExample1Data("data" + SaIndex);
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
    //            //setAdmins(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    var token = localStorage.getItem("token");
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
    var name, email, password, address, contactNo, pincode;
    console.log(AdminArray);
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
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

                                        editing [0] = 0;


                                        {AdminArray.map((admin) => (

                                            <tr>
                                                <th scope="row">
                                                    <Media className="align-items-center">
                                                        <a
                                                            className="avatar rounded-circle mr-3"

                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            {/* <img
                                                                alt="..."
                                                                src={require("assets/img/theme/team-1-800x800.jpg")}
                                                            /> */}
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
                                                            className="btn-icon-only text-light"
                                                            href="#pablo"
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                            }}
                                                        >
                                                            <i className="fas fa-ellipsis-v" />
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    editing[0] = admin._id;
                                                                }}
                                                            >
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    var k = (AdminArray.indexOf(admin))
                                                                    var l = (AdminArray.length)
                                                                    var AdminArray2
                                                                    var i = 0
                                                                    while (i < l) {
                                                                        if (i === k) {
                                                                            continue
                                                                        }
                                                                        AdminArray2.push(AdminArray[i + 1]);
                                                                        i++;
                                                                    }
                                                                    AdminArray = AdminArray2;
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
                    <Col xl="4">
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            Overview
                                        </h6>
                                        <h2 className="text-white mb-0">Add Admin</h2>
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
                                                            //setName(e.target.value)

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
                                                            //setEmail(e.target.value)
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
                                                        htmlFor="input-first-name"
                                                    >
                                                        Contact No
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-first-name"
                                                        placeholder="Contact No"
                                                        type="text"
                                                        value={contactNo}
                                                        onChange={(e) => {
                                                            //setContactNo(e.target.value)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Address
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        placeholder="Address"
                                                        type="text"
                                                        value={address}
                                                        onChange={(e) => {
                                                            //setAddress(e.target.value)
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
                                                        htmlFor="input-first-name"
                                                    >
                                                        Password
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-first-name"
                                                        placeholder="Password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => {
                                                            //setPassword(e.target.value)
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
                                        //setName('');
                                        //setEmail('');
                                        //setContactNo('');
                                        //setAddress('');
                                        //setPassword('');
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
                </Row>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card>
                            <CardHeader className="bg-transparent">

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
