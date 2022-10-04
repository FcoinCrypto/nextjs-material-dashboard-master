/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#Achats" className={classes.block}>
                Achat
              </a> 
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#achat_id" className={classes.block} >
                Envoie
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#reçu" className={classes.block}>
                reçu
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}
