import React from "react";
import Admin from "layouts/Admin.js";
import { Button, Grid, Input, TextField } from "@material-ui/core";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { updateWallet } from "../../services/achat";
import { conversionUsdt } from "../../utils/utilAchat";

function Acheter(fcoin) {
    function handleChangeCustom(event){

    }
  return (
    <>
        <div><b>ACHETER DES FCOINS</b></div>
        <center><p> Vous détenez actuellement : <strong> {fcoin.data} Fcoin </strong><br/>  Entrez le montant de Fcoin que vous souhaitez acheter ou le montant en EUR que vous souhaitez dépenser</p></center>
        <Formik 
            enableReinitialize 
            initialValues={{ 
                fcoin: '', 
                // usdt: '',
            }} 
            validationSchema={Yup.object().shape({ 
                fcoin: Yup.number()
                    .typeError("That doesn't look like a phone number")
                    .positive("A phone number can't start with a minus")
                    .min(1)
                    .required('require'),
                // usdt: Yup.number()
                //     .typeError("That doesn't look like a number")
                //     .positive("number can't start with a minus")
                //     .min(1)
                //     .required('require'), 
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
                    const newFcoin = values.fcoin + fcoin.data;
                    console.log("test",newFcoin, fcoin.data)
                    await updateWallet(newFcoin)
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
                        error={Boolean(touched.fcoin && errors.fcoin)} 
                        helperText={touched.fcoin && errors.fcoin} 
                        type="number" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.fcoin} 
                        fullWidth
                        style={{marginTop : 23, marginBottom : 23}}
                        label="FCOIN" 
                        name="fcoin" 
                        required 
                        variant="outlined"             
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        // error={Boolean(touched.usdt && errors.usdt)} 
                        // helperText={touched.usdt && errors.usdt} 
                        // type="number" 
                        // onBlur={handleBlur} 
                        // onChange={handleChange} 
                        value={conversionUsdt(values.fcoin)} 
                        fullWidth
                        style={{marginTop : 23, marginBottom : 23}}
                        label="USDT" 
                        name="usdt"
                        variant="outlined"
                        // disabled='true'             
                    />
                </Grid>
            </Grid>
            <center><p> Frais de traitement 
                <strong> (0%)	:	0 Fcoin </strong>
                <br/>  Montant total à payer	
                <strong> 0 Fcoin </strong> 
                <br/> Vous allez acheter 
                <strong> {values.fcoin} Fcoin </strong> pour un montant total de
                <strong> {conversionUsdt(values.fcoin)} USDT (soit 10 / Fcoin) </strong></p></center>
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
                    Acheter en Fcoin
                </Button>
                <p style={{ fontSize : 15}}>Avertissement : Tout achat de cryptomonnaie est un investissement risqué. Le cours de la paypite dépend de l’offre et de la demande sur les marchés de cryptomonnaies et celui-ci peut significativement monter ou baisser, voire même devenir nul.</p>
            </Grid> 
            </form>
                
        )}
        </Formik> 
    </>
  )
}

Acheter.layout = Admin;

export const getServerSideProps = async () => {

    const res = await axios.get('http://localhost:1337/api/wallets/1');
    const data  = res.data.data.attributes.fcoin;
    // console.log("fcoin", data);
    // Pass data to the page via props
    return { props: { data } };
  };

export default Acheter;