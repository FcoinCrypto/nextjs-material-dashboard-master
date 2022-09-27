import React,{useState} from "react";
// @material-ui/core components
import PropTypes from "prop-types";
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

function TableList(data, data_transaction, data_recevoir, data_achat) {
  const useStyles = makeStyles(styles);
  const[dNone, setdNone] = useState('');
  const[dNoneAchat, setdNoneAchat] = useState('none');
  const[dNoneEnvoyer, setdNoneEnvoyer] = useState('none');
  const[dNoneRecevoir, setdNoneRecevoir] = useState('none');
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
  return (
    <GridContainer>
      <footer>
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
      </footer>
      <div style={{display: dNone, minWidth:'100%'}} className={cardstyles.width100} id="transaction_id">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Title</h4>
              <p className={classes.cardCategoryWhite}>
                Transactions
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["date", "type", "etiquette", "montant"]}
                tableData={data}
              />
              
            </CardBody>
          </Card>
        </GridItem>
      </div>
      <div style={{display: dNoneAchat, minWidth:'100%'}} className={cardstyles.width100} id="achat_id">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Title</h4>
              <p className={classes.cardCategoryWhite}>
                Achat
              </p>
            </CardHeader>
            <CardBody>
              <TableAchat
                tableHeaderColor="primary"
                tableHead={["date", "fcoin", "usdt"]}
                tableData={data}
              />
              
            </CardBody>
          </Card>
        </GridItem>
      </div>
      <div style={{display: dNoneEnvoyer, minWidth:'100%'}} className={cardstyles.width100} id="envoyer_id">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Title</h4>
              <p className={classes.cardCategoryWhite}>
                Envoie
              </p>
            </CardHeader>
            <CardBody>
              <TableEnvoyer
                tableHeaderColor="primary"
                tableHead={["date", "destinataire", "etiquette", "montant"]}
                tableData={data}
              />
              
            </CardBody>
          </Card>
        </GridItem>
      </div>
      <div style={{display: dNoneRecevoir, minWidth:'100%'}} className={cardstyles.width100} id="recevoir_id">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Title</h4>
              <p className={classes.cardCategoryWhite}>
                Reçu
              </p>
            </CardHeader>
            <CardBody>
              <TableRecevoir
                tableHeaderColor="primary"
                tableHead={["date", "message", "etiquette", "montant"]}
                tableData={data}
              />
              
            </CardBody>
          </Card>
        </GridItem>
      </div>
    </GridContainer>
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

export async function getServerSideProps () {
  // Fetch data from external API
  // const res = await fetch('http://localhost:1337/api/achats');
  // const data  = await res.json();
  const res = await getTransactions();
  const res_rec = await recevoirs();
  const res_env = await envoyers();
  const res_ach = await achats();
  // console.log(res.data.data);
  // Pass data to the page via props
  return { props: { 
    data : res.data.data,
    data_transaction : res_env.data.data ,
    data_recevoir : res_rec.data.data,
    data_achat : res_ach.data.data
  } };
};