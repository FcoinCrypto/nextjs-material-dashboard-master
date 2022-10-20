import React,{useState, useEffect} from "react";
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
import superAdmin from "layouts/superAdmin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import TableSuperTransaction from "../../components/Table/TableSuperTransaction";
import TableAchat from "../../components/Table/TableAchat";
import TableEnvoyer from "../../components/Table/TableEnvoyer";
import TableRecevoir from "../../components/Table/TableRecevoir";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";

import axios from "axios"
import Footer from "../../components/Footer/Footer";
import { achats, transactions, envoyers, recevoirs } from "../../services/table";
import { allTransaction, test } from "../../services/allTransaction";
import {allAchats} from "../../services/allAchats"
import { getUser } from "../../services/user";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";
import Shop from "@material-ui/icons/Shop";
import CurrencyFormat from 'react-currency-format';
import { NumericFormat } from 'react-number-format';
import { Grid } from "@material-ui/core";

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
  const[dataTransaction, setDataTransaction] = useState();

  const classes = useStyles();

  useEffect(async () => {
    if(!dataTransaction){

      const res = await allAchats();
      
      setDataTransaction(res.data.data);
      console.log(res.data.data)
     

    } 
  }, [dataTransaction])

  return (
    <>
      { dataTransaction &&
        <GridContainer>
          <footer>
            <div className={classes.container}>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#" className={classes.block}>
                      Tableau de Bord
                    </a>
                  </ListItem>

                </List>
              </div>
            </div>
          </footer>
          <div style={{minWidth:'100%'}} className={cardstyles.width100} id="transaction_id">
            
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="info">                
                  <p className={classes.cardCategoryWhite}>
                    Toutes les recharges
                  </p>
                </CardHeader>
                
              </Card>
            </GridItem>
            <GridItem xs={12} sm={8} md={12}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Shop />
                </CardIcon>
                <p style={{color:'grey'}}>Toutes les recharges</p>
                <CardBody>                
                    <h3>
                        <Grid container >
                            <Grid item style={{display:"flex",justifyContent:"flex-start"}} xs={3}>
                                FCOIN
                            </Grid>
                            <Grid item xs={3} style={{display:"flex",justifyContent:"flex-start"}}>
                                USDT
                            </Grid>
                            <Grid item xs={3} style={{display:"flex",justifyContent:"flex-start"}}>
                                FMA
                            </Grid>
                            <Grid item xs={3}style={{display:"flex",justifyContent:"flex-start"}}>
                                EURO
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container>
                            <Grid item xs={3} style={{display:"flex",justifyContent:"flex-start"}}>
                                <NumericFormat value={'34,245'} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' Ftc'} />
                            </Grid>
                            <Grid item xs={3} style={{display:"flex",justifyContent:"flex-start"}}>
                                <NumericFormat value={'6'} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale  suffix={' $'} />
                            </Grid>
                            <Grid item xs={3} style={{display:"flex",justifyContent:"flex-start"}}>
                                <NumericFormat value={'40000'} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' Ariary'} />
                            </Grid>
                            <Grid item xs={3} style={{display:"flex",justifyContent:"flex-start"}}>
                                <NumericFormat value={'19'} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' €'} />
                            </Grid>
                        </Grid>
                        
                    </h3> 
                                     

                </CardBody>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          </div>
         
        </GridContainer>
      }
    </>
  );
}

TableList.layout = superAdmin;

export default TableList;
async function getTransactions () {
  const res = await transactions();
  return res
}
async function getRecevoirs () {
  const res = await getRecevoirs();
  return res
}

