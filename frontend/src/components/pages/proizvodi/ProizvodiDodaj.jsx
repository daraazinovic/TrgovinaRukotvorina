import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../constant";


export default function ProizvodiDodaj(){


    return(
        <>
        Dodavanje proizvoda
        <Row>
            <Col>
            <Link
            to={RouteNames.PROIZVOD_PREGLED}
            className="btn btn-danger siroko"
            >Odustani</Link>
            </Col>
        </Row>
        </>
    )
}