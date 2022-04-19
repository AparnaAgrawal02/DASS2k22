/*!



*/
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { Media } from "reactstrap";
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

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const SaIndex = (props) => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, SaIndex) => {
        e.preventDefault();
        setActiveNav(SaIndex);
        setChartExample1Data("data" + SaIndex);
    };

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
                                        <tr>
                                            <th scope="row">
                                                <Media className="align-items-center">
                                                    <a

                                                        className="avatar rounded-circle mr-3"
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <img
                                                            alt="..."
                                                            src={require("assets/img/theme/team-1-800x800.jpg")}
                                                        />
                                                    </a>
                                                    <Media>
                                                        <span className="mb-0 text-sm">
                                                            Admin 1
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
                                                            className="text-success"
                                                            href="#pablo"
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4">

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
