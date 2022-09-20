import React from "react";
import Admin from "layouts/Admin.js";
import { Button, Grid, TextField } from "@material-ui/core";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

function Acheter() {
  return (
    <>
        <div><b>ACHETER DES FCOINS</b></div>
        <center><p> Vous détenez actuellement : <strong> 0 Fcoin </strong><br/>  Entrez le montant de Fcoin que vous souhaitez acheter ou le montant en EUR que vous souhaitez dépenser</p></center>
        <Formik 
            enableReinitialize 
            initialValues={{ 
                fcoin: '', 
                euro: '',
            }} 
            validationSchema={Yup.object().shape({ 
                fcoin: Yup.number()
                    .typeError("That doesn't look like a phone number")
                    .positive("A phone number can't start with a minus")
                    .min(1)
                    .required('require'), 
                euro: Yup.number()
                    .typeError("That doesn't look like a number")
                    .positive("number can't start with a minus")
                    .min(1)
                    .required('require'), 
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
                    resetForm(); 
                    setStatus({ success: true }); 
                    setSubmitting(false); 
                    console.log("test",values) 
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
                        error={Boolean(touched.euro && errors.euro)} 
                        helperText={touched.euro && errors.euro} 
                        type="number" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.euro} 
                        fullWidth
                        style={{marginTop : 23, marginBottom : 23}}
                        label="Euro" 
                        name="euro" 
                        required 
                        variant="outlined"             
                    />
                </Grid>
            </Grid>
            <center><p> Frais de traitement <strong> (0%)	:	0 Fcoin </strong><br/>  Montant total à payer	<strong> 0 Fcoin </strong> <br/> Vous allez acheter <strong> 0 Fcoin </strong> pour un montant total de <strong> 0 € (soit 0 € / Fcoin) </strong></p></center>
                <div className='text-center'>
                <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    disabled={isSubmitting} 
                    type="submit"
                    width= "70"
                > 
                    Acheter en Fcoin
                </Button>
                <p style={{ fontSize : 15}}>Avertissement : Tout achat de cryptomonnaie est un investissement risqué. Le cours de la paypite dépend de l’offre et de la demande sur les marchés de cryptomonnaies et celui-ci peut significativement monter ou baisser, voire même devenir nul.</p>
                </div> 
                </form>
                
        )}
        </Formik> 
    </>
  )
}

Acheter.layout = Admin;

export default Acheter;