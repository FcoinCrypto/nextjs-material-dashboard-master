/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";
import { Grid } from "@nextui-org/react";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
      <Grid container
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        >
        <Grid item xs={4}>
        <a href="#R" className={classes.block}>
              <img src={require('../../assets/img/logo-fb_full.png')} style={{
                    width:"15%"
                }}/>
                Facebook
              </a>
        </Grid>
        <Grid items xs={4}>
        <a href="#R" className={classes.block}>
              <img src={require('../../assets/img/logo-fb_full.png')} style={{
                    width:"15%"
                }}/>
                Facebook
              </a>
        </Grid>
        <Grid item xs={4}>
        <a href="#R" className={classes.block}>
              <img src={require('../../assets/img/logo-fb_full.png')} style={{
                    width:"15%"
                }}/>
                Facebook
              </a>
        </Grid>
      </Grid>

  );
}
