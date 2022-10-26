
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import { Icon } from '@iconify/react';

export default function myFooter() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="6">
              <h5><b>Mentions légales</b></h5>

                <h4 className=" mb-0 font-weight-light" style={{fontSize:15,marginTop:-10}} >
                  Conditions Génerales d'utilisation
                </h4>
                <h4 className=" mb-0 font-weight-light" style={{fontSize:15}}>
                  Conditions Génerales de vente
                </h4>
                <h4 className=" mb-0 font-weight-light" style={{fontSize:15}}>
                  Politique de confidentialité
                </h4>
              </Col>
              <Col className="text-lg-center btn-wrapper" lg="6" style={{marginTop:0}}>
                <h5><b>Contacter nous</b></h5>
                <Button
                  className="btn-icon-only rounded-circle"
                  color="twitter"
                  href="https://twitter.com/CryptoFcoin"
                  id="tooltip475038074"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <Icon icon="simple-icons:twitter" width="30" height="30"/>
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip475038074">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.facebook.com/fcoincrypto"
                  id="tooltip837440414"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <Icon icon="simple-icons:facebook" width="25" height="25" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip837440414">
                  Like us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="dribbble"
                  href="https://discord.com/invite/94trf6G2mQ"
                  id="tooltip829810202"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <Icon icon="simple-icons:discord" width="25" height="25"/>
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip829810202">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="github"
                  href="https://t.me/FCoin"
                  id="tooltip495507257"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <Icon icon="simple-icons:telegram" width="25" height="25" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip495507257">
                  Follow us
                </UncontrolledTooltip>
              </Col>
            </Row>
            <hr style={{marginTop:-30}}/>
            <Row className=" align-items-center justify-content-md-between" style={{marginBottom:-30}}>
              <Col md="12">
                <div className="copyright d-flex justify-content-center">
                Copyright © {new Date().getFullYear()}{" "}
                  <a
                    href="https://www.dev.fcoin.mg"
                    target="_blank"
                    style={{marginLeft:5}}
                  >
                     Fcoin
                  </a>
                  .
                </div>
              </Col>

            </Row>
          </Container>
        </footer>
      </>
    );
}

