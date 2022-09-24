import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Footer from "../../components/Footer/Footer";
import { achats, transactions, envoyers } from "../../services/table";

const styles = {
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
};

function TableEnvoyer(data) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <GridContainer>
      <Footer/>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Title</h4>
            <p className={classes.cardCategoryWhite}>
              Transactions
            </p>
          </CardHeader>
          <CardBody>
           
           
            
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}

TableEnvoyer.layout = Admin;
export default TableEnvoyer;


export const getServerSideProps = async () => {
  // Fetch data from external API
  // const res = await fetch('http://localhost:1337/api/achats');
  // const data  = await res.json();
  const res = await envoyers();
  console.log(res)
  // console.log(res.data.data);
  // Pass data to the page via props
  return { props: { data : res.data.data } };
};