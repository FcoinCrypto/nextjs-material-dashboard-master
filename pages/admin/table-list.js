import React,{useState, useEffect} from "react";
// @material-ui/core components
import PropTypes from "prop-types"
import { Button, Grid, Input } from "@material-ui/core";;
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";
import Link from 'next/link';
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import TableAchat from "../../components/Table/TableAchat";
import TableEnvoyer from "../../components/Table/TableEnvoyer";
import TableRecevoir from "../../components/Table/TableRecevoir";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios"
import Footer from "../../components/Footer/Footer";
import { achats, transactions, envoyers, recevoirs } from "../../services/table";

import { getUser } from "../../services/user";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";

import { Icon } from '@iconify/react';
import {

  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

const cardstyles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  width100: {
    width: "100%",
    
  },
};

function TableList() {
  const useStyles = makeStyles(styles);
  const[dNone, setdNone] = useState('');
  const[dNoneAchat, setdNoneAchat] = useState('none');
  const[dNoneEnvoyer, setdNoneEnvoyer] = useState('none');
  const[dNoneRecevoir, setdNoneRecevoir] = useState('none');
  const[dataEnvoie, setDataEnvoie] = useState();
  const[dataTransaction, setDataTransaction] = useState();
  const[dataRecevoir, setDataRecevoir] = useState();
  const[dataAchat, setDataAchat] = useState();
  const { user } = useRecoilValue(authAtom);

  const aff_transaction = () => {
    setdNone('');
    setdNoneAchat('none');
    setdNoneEnvoyer('none');
    setdNoneRecevoir('none');
    
  };
  const aff_achat = () => {
    setdNone('none');
    setdNoneAchat('');
    setdNoneEnvoyer('none');
    setdNoneRecevoir('none');
    
  };
  const aff_recevoir = () => {
    setdNone('none');
    setdNoneAchat('none');
    setdNoneEnvoyer('none');
    setdNoneRecevoir('');
    
  };
  const aff_envoyer = () => {
    setdNone('none');
    setdNoneAchat('none');
    setdNoneEnvoyer('');
    setdNoneRecevoir('none');
    
  };
  const classes = useStyles();

  useEffect(async () => {
    if(!dataEnvoie && !dataTransaction && !dataRecevoir && !dataAchat ){

      const res = await transactions(user.id);
      const res_rec = await recevoirs(user.id);
      const res_env = await envoyers(user.id);
      const res_ach = await achats(user.id);
      console.log(res)
      setDataTransaction(res.data.data);
      setDataRecevoir(res_rec.data.data);
      setDataEnvoie(res_env.data.data);
      setDataAchat(res_ach.data.data);

    } 
  }, [dataEnvoie, dataAchat, dataRecevoir, dataTransaction])

  return (
    <>
      { dataEnvoie && dataAchat && dataRecevoir && dataTransaction &&
        <GridContainer>
          {/* <footer>
            <div className={classes.container}>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#" className={classes.block} onClick={aff_achat}>
                    Achats
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#" className={classes.block} onClick={aff_envoyer}>
                      Envoie
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#reçu" className={classes.block} onClick={aff_recevoir}>
                      reçu
                    </a>
                  </ListItem>
                </List>
              </div>
            </div>
          </footer> */}
          <div style={{display: dNone, minWidth:'100%'}} className={cardstyles.width100} id="transaction_id">
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="info">
                  
                  <p className={classes.cardCategoryWhite}>
                    Transactions
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Date", "Montant", "N° Transaction", "Detail"]}
                    tableData={dataTransaction}
                  />
                  
                </CardBody>
              </Card>
            </GridItem>
          </div>
          <div style={{display: dNoneAchat, minWidth:'100%'}} className={cardstyles.width100} id="achat_id">
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="info">
                  
                  <p className={classes.cardCategoryWhite}>
                    Achat
                  </p>
                </CardHeader>
                <CardBody>
                  <TableAchat
                    tableHeaderColor="primary"
                    tableHead={["date", "fcoin", "usdt"]}
                    tableData={dataAchat}
                  />
                  
                </CardBody>
              </Card>
            </GridItem>
          </div>
          <div style={{display: dNoneEnvoyer, minWidth:'100%'}} className={cardstyles.width100} id="envoyer_id">
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="info">
                  
                  <p className={classes.cardCategoryWhite}>
                    Envoie
                  </p>
                </CardHeader>
                <CardBody>
                  <TableEnvoyer
                    tableHeaderColor="primary"
                    tableHead={["date", "destinataire", "etiquette", "montant"]}
                    tableData={dataEnvoie}
                  />
                  
                </CardBody>
              </Card>
            </GridItem>
          </div>
          <div style={{display: dNoneRecevoir, minWidth:'100%'}} className={cardstyles.width100} id="recevoir_id">
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="info">
                  
                  <p className={classes.cardCategoryWhite}>
                    Reçu
                  </p>
                </CardHeader>
                <CardBody>
                  <TableRecevoir
                    tableHeaderColor="primary"
                    tableHead={["date", "message", "etiquette", "montant"]}
                    tableData={dataRecevoir}
                  />
                  
                </CardBody>
              </Card>
            </GridItem>
          </div>
        </GridContainer>
      }
      <footer className=" footer">
          <Container>
            <Row className="row-grid align-items-center mb-5">
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

TableList.layout = Admin;

export default TableList;
async function getTransactions () {
  const res = await transactions();
  return res
}
async function getRecevoirs () {
  const res = await getRecevoirs();
  return res
}

// export async function getServerSideProps () {

//   // Fetch data from external API
//   // const res = await fetch('http://localhost:1337/api/achats');
//   const res = await getTransactions();
//   const res_rec = await recevoirs();
//   const res_env = await envoyers(user.id);
//   const res_ach = await achats();
//   // console.log(res.data.data);
//   // Pass data to the page via props
//   return { props: { 
//     data : res.data.data,
//     dataTransaction : res_env.data.data ,
//     dataRecevoir : res_rec.data.data,
//     dataAchat : res_ach.data.data
//   } };
// };