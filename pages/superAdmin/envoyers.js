import React,{useState, useEffect} from "react";
// @material-ui/core components
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";
// layout for this page
import superAdmin from "layouts/superAdmin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableSuperAllEnvoyers from "../../components/Table/TableSuperAllEnvoyers";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { allEnvoyers} from "../../services/allEnvoyers";



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
  const[dataEnvoyer, setDataEnvoyer] = useState();

  const classes = useStyles();

  useEffect(async () => {
    if(!dataEnvoyer){

      const res = await allEnvoyers();
      console.log(res)
      setDataEnvoyer(res.data.data);
     

    } 
  }, [dataEnvoyer])

  return (
    <>
      { dataEnvoyer &&
        <GridContainer>
          {/* <footer>
            <div className={classes.container}>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#" className={classes.block}>
                      Toutes les Envoies
                    </a>
                  </ListItem>

                </List>
              </div>
            </div>
          </footer> */}
          <div style={{minWidth:'100%'}} className={cardstyles.width100} id="transaction_id">
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="info">
                  
                  <p align="center" className={classes.cardCategoryWhite}>
                    Envoies
                  </p>
                </CardHeader>
                <CardBody>
                  <TableSuperAllEnvoyers
                    tableHeaderColor="primary"
                    tableHead={["Date", "Nom et prenom", "Destinataire", "Montant de depart", "Devise", "Montant arrivée", "Devise", "Status" ]}
                    tableData={dataEnvoyer}
                  />
                  
                </CardBody>
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

