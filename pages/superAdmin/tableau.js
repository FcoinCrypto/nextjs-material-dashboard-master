import React,{useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";
import Link from 'next/link';
// layout for this page
import superAdmin from "layouts/superAdmin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import DateRange from "@material-ui/icons/DateRange";
import {  transactions, envoyers, recevoirs } from "../../services/table";
import { getOneWallet } from "../../services/wallet";
import Shop from "@material-ui/icons/Shop";
import Send from "@material-ui/icons/Send";
import Receipt from "@material-ui/icons/Receipt";
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
      // align:"center",
      textAlign: "center",
      justifyContent: 'center',
      alignItems: 'center'
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

      const res = await getOneWallet();
      
      setDataTransaction(res.data);
      console.log(res)
      

    } 
  }, [dataTransaction])

  return (
    <>
      { dataTransaction &&
        <GridContainer>
         
          <div style={{minWidth:'100%'}} className={cardstyles.width100} id="transaction_id">
            
            <GridItem xs={6} sm={12} md={12}>
                <CardHeader color="info">                
                  <p align="center" className={classes.cardCategoryWhite}>
                    Toutes les recharges
                  </p>
                </CardHeader>
                
            </GridItem>
            <GridItem xs={6} sm={12} md={12}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Shop />
                </CardIcon>
                <CardBody>                
                    <h3 style={{color:"black", fontWeight:"bold"}}>
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
                                <NumericFormat value={'40000'} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} fixedDecimalScale suffix={' Ariary'} />
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
          
          <div style={{minWidth:'100%'}} className={cardstyles.width100} id="transaction_id">
            
            <GridItem xs={12} sm={12} md={12}>
                <CardHeader color="info">                
                  <p align="center" className={classes.cardCategoryWhite}>
                    Toutes les transferts
                  </p>
                </CardHeader>
                
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Send />
                </CardIcon>
                <CardBody>                
                    <h3 style={{color:"black", fontWeight:"bold"}}>
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
                                <NumericFormat value={'40000'} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} fixedDecimalScale suffix={' Ariary'} />
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
          
          <div style={{minWidth:'100%'}} className={cardstyles.width100} id="transaction_id">
            
            <GridItem xs={12} sm={12} md={12}>
                <CardHeader color="info">                
                  <p align="center" className={classes.cardCategoryWhite}>
                    Toutes les commandes
                  </p>
                </CardHeader>
                
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Receipt />
                </CardIcon>
                <CardBody>                
                    <h3 style={{color:"black", fontWeight:"bold"}}>
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
                                <NumericFormat value={'40000'} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}  fixedDecimalScale suffix={' Ariary'} />
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

