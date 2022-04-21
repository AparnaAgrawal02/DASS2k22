/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import axios from "axios";
import Divider from '@mui/material/Divider';
import { useState, useEffect } from "react";
//import { getAllverifiedActivities,getAllverifiedProjects } from './course.js';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup } from "reactstrap"
import { ListGroupItem, ListGroup } from "reactstrap";

const Activity = () => {
    let list = []
    const [whichlist, setWhichList] = useState("");

    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <div>

                    <ListGroup>
                        <ListGroupItem>Cras justo odio</ListGroupItem>
                        <Button variant="primary" type="verify">
                            Edit
                        </Button>
                        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                        <Button variant="primary" type="verify">
                            Edit
                        </Button>
                        <ListGroupItem>Morbi leo risus</ListGroupItem>
                        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                </div>


                <Form>
                    {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    {/* <Button variant="primary" type="verify">
                        Sumbit and verify
                    </Button> */}
                </Form>


            </div>

        </>
    );


};




export default Activity;
