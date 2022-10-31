import React from "react";
import Admin from "layouts/Admin.js";
import { Button, Grid, Input } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { recevoirs } from "../../services/reception.js";
import { addTransaction } from "../../services/transaction.js";
import { updateWallet } from "../../services/achat";
import { conversionUsdt } from "../../utils/utilAchat";
import { getUser } from "../../services/user";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";
import Quote from "../../components/Typography/Quote";
import { Icon } from '@iconify/react';
import {

  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";


function Reception() {
    const { user } = useRecoilValue(authAtom);

    function handleChangeCustom(event){

    }
  return (
    <>
        <div className="text-white" style={{borderRadius:25, background:'linear-gradient(145deg, rgba(51,155,158,1) 0%, rgba(104,204,152,1) 100%)',fontSize:"8vw"}} >
          <center>
            <Quote text="L’appli qui réinvente votre façon de consommer"/>
          </center>
        </div>
        <div><b>Demander des Paiments</b></div>
        <Formik 
            enableReinitialize 
            initialValues={{ 
                etiquette: '', 
                message: '',
                montant: '',
            }} 
            validationSchema={Yup.object().shape({ 
                montant: Yup.number()
                    .typeError("That doesn't look like a phone number")
                    .positive("A phone number can't start with a minus")
                    .min(0.00000000000001)
                    .required('require'),
                message: Yup.string().required('Merci de renseigner le destinataire'),
                etiquette: Yup.string().required('Merci de renseigner l etiquette'),
            })} 
            onSubmit={async (values, { 
                resetForm, 
                setErrors, 
                setStatus, 
                setSubmitting 
            }) => {
                try { 
                    // NOTE: Make API request 
                    await recevoirs(values.message, values.etiquette, values.montant, user.id);
                    resetForm(); 
                    setStatus({ success: true }); 
                    setSubmitting(false);
                    
                } catch (err) { 
                    console.error(err); 
                    setStatus({ success: false }); 
                    setErrors({ submit: err.message }); 
                    setSubmitting(false); 
                } 
            }} 
        > 
            {({ 
                errors, 
                handleBlur, 
                handleChange, 
                handleSubmit, 
                isSubmitting, 
                touched, 
                values 
            }) => (
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={6}>
                    <TextField
                        error={Boolean(touched.etiquette && errors.etiquette)} 
                        helperText={touched.etiquette && errors.etiquette} 
                        type="text" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.etiquette} 
                        fullWidth
                        style={{marginTop : 23, marginBottom : 23}}
                        label="Etiquette" 
                        name="etiquette" 
                        required 
                        variant="outlined"             
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        error={Boolean(touched.message && errors.message)} 
                        helperText={touched.message && errors.message} 
                        type="text" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.message} 
                        fullWidth
                        style={{marginTop : 23, marginBottom : 23}}
                        label="Message" 
                        name="message" 
                        required 
                        variant="outlined"             
                    />
                </Grid>
            </Grid>
            <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <TextField
                    error={Boolean(touched.montant && errors.montant)} 
                    helperText={touched.montant && errors.montant} 
                    type="number" 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    value={values.montant} 
                    style={{marginTop : 23, marginBottom : 23}}
                    label="Montant en Fcoin" 
                    name="montant"
                    variant="outlined"
                    // disabled='true'             
                />
            </Grid>
            <center><p> Frais de traitement 
                <strong> (0%)	:	0 Fcoin </strong>
                <br/>  Montant total à demander	
                <strong> 0 Fcoin </strong> 
                <br/> Vous allez demander 
                <strong> {values.montant} Fcoin </strong> à
                <strong> {values.etiquette} </strong></p></center>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Button
                    variant="contained" 
                    color="primary" 
                    disabled={isSubmitting} 
                    type="submit"
                > 
                    Demande de paiement
                </Button>
                <p style={{ fontSize : 15}}>Avertissement : Tout achat de cryptomonnaie est un investissement risqué. Le cours du Fcoin dépend de l’offre et de la demande sur les marchés de cryptomonnaies et celui-ci peut significativement monter ou baisser, voire même devenir nul.</p>
            </Grid> 
            </form>
                
        )}
        </Formik> 

    </>
  )
}

Reception.layout = Admin;

export default Reception;