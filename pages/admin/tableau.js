import React from "react";
import Admin from "layouts/Admin.js";
import { Button, Grid, TextField } from "@material-ui/core";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

function Tableau() {
  return (
    <>
        <div><b>ACHETER DES FCOINS</b></div>
        <center><p> Vous détenez actuellement : <strong> 0 Fcoin </strong><br/>  Entrez le montant de Fcoin que vous souhaitez acheter ou le montant en EUR que vous souhaitez dépenser</p></center>
 
    </>
  )
}

Tableau.layout = Admin;

export default Tableau;