import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import { Button, Grid, Input } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { envoyer, updateWalletOnSend } from "../../services/envoyer.js";
import { addTransaction } from "../../services/transaction";
import { getUser } from "../../services/user";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";



function Envoyer(fcoin) {
    const [wallet, setWallet] = useState();
    const [idWallet, setIdWallet] = useState();
    const { user } = useRecoilValue(authAtom);
    const [insuffisant, setInsuffisant] = useState();
    const [dNone, setdNone] = useState('none');
  
    useEffect(async () => {
        if (!wallet) {
        const data = await getUser(user.id);
        setWallet(data.data.wallet.fcoin);
        setIdWallet(data.data.wallet.id)
        }
    }, [wallet, idWallet])
   
  return (
    <>
        <Grid container>
            <Grid item xs={2} style={{marginLeft:'37%',marginBottom:'3%'}}>
            <img className="m-2" 
                                src="data:image/png;base64,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"                            
                                style={{width:'100%',backgroundColor:'white'}} 
                                alt="Fpay image" 
                            />
            </Grid>
        </Grid>
        <div><b>ENVOYER DES FCOINS</b></div>
        <center><p> Vous détenez actuellement : <strong> {wallet} Fcoin </strong><br/>  Entrez le montant de Fcoin que vous souhaitez envoyer</p></center>
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
                    .min(0.00000000000001)
                    .required('require'),
                destinataire: Yup.string().required('Merci de renseigner le destinataire'),
                etiquette: Yup.string().required('Merci de renseigner l etiquette')
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

                    const newFcoin  = wallet - values.montant;
                    if(newFcoin > 0){
                        setInsuffisant('');
                        setWallet(newFcoin);
                        await envoyer(values.destinataire, values.etiquette, values.montant, user.id);
                        await updateWalletOnSend(newFcoin,idWallet);
                        await addTransaction('Envoie', values.etiquette, values.montant, user.id);
                    }else{
                        setInsuffisant('Votre fcoin est insuffisant');
                        setdNone('');
                    }
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
                        name="etiquette" 
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
            <center>
                <p style={{ color : "red", display: dNone}}>{insuffisant}</p>
                <p> Frais de traitement 
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

export default Envoyer;