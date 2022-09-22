import React from "react";
import Admin from "layouts/Admin.js";
import { Button, Grid, Input, TextField } from "@material-ui/core";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { updateWallet } from "../../services/achat";
import { conversionUsdt } from "../../utils/utilAchat";

function Envoyer(fcoin) {
    function handleChangeCustom(event){

    }
  return (
    <>
        <div><b>ENVOYER DES FCOINS</b></div>
        <Formik 
            enableReinitialize 
            initialValues={{ 
                destinataire: '', 
                etiquette: '',
                montant: '',
            }} 
            validationSchema={Yup.object().shape({ 
                montant: Yup.number()
                    .typeError("That doesn't look like a phone number")
                    .positive("A phone number can't start with a minus")
                    .min(1)
                    .required('require'),
                destinataire: Yup.string().required('Merci de renseigner le destinataire'),
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
                    // await wait(200);
                    // const newFcoin = values.fcoin + fcoin.data;
                    // console.log("test",newFcoin, fcoin.data)
                    // await updateWallet(newFcoin)
                    resetForm(); 
                    setStatus({ success: true }); 
                    setSubmitting(false);
                    window.location.reload(false); 
                    
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
                        error={Boolean(touched.destinataire && errors.destinataire)} 
                        helperText={touched.destinataire && errors.destinataire} 
                        type="text" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.destinataire} 
                        fullWidth
                        style={{marginTop : 23, marginBottom : 23}}
                        label="Payer à" 
                        name="destinataire" 
                        required 
                        variant="outlined"             
                    />
                </Grid>
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
                        name="Etiquette" 
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
                <br/>  Montant total à envoyer	
                <strong> 0 Fcoin </strong> 
                <br/> Vous allez envoyer 
                <strong> {values.montant} Fcoin </strong> à
                <strong> {values.destinataire} </strong></p></center>
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
                    Envoyer
                </Button>
                <p style={{ fontSize : 15}}>Avertissement : Tout achat de cryptomonnaie est un investissement risqué. Le cours du Fcoin dépend de l’offre et de la demande sur les marchés de cryptomonnaies et celui-ci peut significativement monter ou baisser, voire même devenir nul.</p>
            </Grid> 
            </form>
                
        )}
        </Formik> 
    </>
  )
}

Envoyer.layout = Admin;

export const getServerSideProps = async () => {

    const res = await axios.get('http://localhost:1337/api/wallets/1');
    const data  = res.data.data.attributes.fcoin;
    // console.log("fcoin", data);
    // Pass data to the page via props
    return { props: { data } };
  };

export default Envoyer;