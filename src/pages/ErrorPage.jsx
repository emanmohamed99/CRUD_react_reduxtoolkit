import React from "react";
import { useRouteError } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Container>
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <div className="mt-5 text-center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
