import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import { Button, Container, Grid, IconButton, InputLabel, TextField } from "@material-ui/core";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
// import axios from "axios";
// import { updateWallet } from "../../services/achat";
import { conversionUsdt } from "../../utils/utilAchat";
import { envoyer, updateWalletOnSend } from "../../services/envoyer.js";
import { addTransaction } from "../../services/transaction";
import { getUser } from "../../services/user";
import { useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";



function Exchange() {
    const [wallet, setWallet] = useState();
    const [idWallet, setIdWallet] = useState();
    const { user } = useRecoilValue(authAtom);
    const [insuffisant, setInsuffisant] = useState();
    const [dNone, setdNone] = useState('none');
  
    // useEffect(async () => {
    //     if (!wallet) {
    //     const data = await getUser(user.id);
    //     setWallet(data.data.wallet.fcoin);
    //     setIdWallet(data.data.wallet.id)
    //     }
    // }, [wallet, idWallet])
   
  return (
    <Container maxWidth="sm" sx={20}>
        <Formik 
            enableReinitialize 
            initialValues={{ 
                usdt: '', 
                etiquette: '',
                fcoin: '',
            }} 
            validationSchema={Yup.object().shape({ 
                fcoin: Yup.number()
                    .typeError("entrer un nombre")
                    .positive("A number can't start with a minus")
                    .min(1)
                    .required('require'),
                etiquette: Yup.string().required('Merci de renseigner l etiquette')
            })} 
            onSubmit={async (values, { 
                resetForm, 
                setErrors, 
                setStatus, 
                setSubmitting 
            }) => {
                try { 
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
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Swap from
                    </InputLabel>
                    <br/>
                    <Button
                        disableElevation
                        variant="contained"
                        size="big"
                        style={{
                            width: '100%',
                            height:'60%',
                            borderRadius: 5,
                            backgroundColor:"#eeeeee",
                            color:'grey',
                            marginBottom: 4,
                        }}
                    >
                        <img className="mx-2" src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" style={{width:40,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                            Fcoin

                    </Button>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                            error={Boolean(touched.fcoin && errors.fcoin)} 
                            helperText={touched.fcoin && errors.fcoin} 
                            type="number" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.fcoin} 
                            fullWidth
                            style={{marginTop : 45}}
                            label="FCOIN" 
                            name="fcoin" 
                            required 
                            variant="outlined"             
                        />
                </Grid>
                <Grid item xs={3}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Swap to
                    </InputLabel>
                    <br/>
                    <Button
                        disableElevation
                        variant="contained"
                        size="big"
                        style={{
                            width: '100%',
                            height:'60%',
                            borderRadius: 5,
                            backgroundColor:"#eeeeee",
                            color:'grey',
                            marginBottom: 4,
                        }}
                    >
                        <img className="mx-2" src="https://cdn-icons-png.flaticon.com/512/2150/2150062.png" style={{width:40,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                            USDT

                    </Button>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                            error={Boolean(touched.fcoin && errors.fcoin)} 
                            helperText={touched.fcoin && errors.fcoin} 
                            type="number" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.fcoin} 
                            fullWidth
                            style={{marginTop : 45}}
                            label="USDT" 
                            name="usdt" 
                            required 
                            variant="outlined"             
                        />
                </Grid>


                <Grid item xs={3} style={{ display: dNone }}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Swap to
                    </InputLabel>
                    <br/>
                    <Button
                        disableElevation
                        variant="contained"
                        size="big"
                        style={{
                            width: '100%',
                            height:'60%',
                            borderRadius: 5,
                            backgroundColor:"#eeeeee",
                            color:'grey',
                            marginBottom: 4,
                        }}
                    >
                        <img className="mx-2" src="https://cdn-icons-png.flaticon.com/512/2150/2150062.png" style={{width:40,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                            USDT

                    </Button>
                </Grid>
                <Grid item xs={9} style={{ display: dNone }}>
                    <TextField
                            error={Boolean(touched.fcoin && errors.fcoin)} 
                            helperText={touched.fcoin && errors.fcoin} 
                            type="number" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.fcoin} 
                            fullWidth
                            style={{marginTop : 45}}
                            label="USDT" 
                            name="usdt" 
                            required 
                            variant="outlined"             
                        />
                </Grid>
                <Grid item xs={3} style={{ display: dNone }}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Swap from
                    </InputLabel>
                    <br/>
                    <Button
                        disableElevation
                        variant="contained"
                        size="big"
                        style={{
                            width: '100%',
                            height:'60%',
                            borderRadius: 5,
                            backgroundColor:"#eeeeee",
                            color:'grey',
                            marginBottom: 4,
                        }}
                    >
                        <img className="mx-2" src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" style={{width:40,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                            Fcoin

                    </Button>
                </Grid>
                <Grid item xs={9} style={{ display: dNone }}>
                    <TextField
                            error={Boolean(touched.fcoin && errors.fcoin)} 
                            helperText={touched.fcoin && errors.fcoin} 
                            type="number" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.fcoin} 
                            fullWidth
                            style={{marginTop : 45}}
                            label="FCOIN" 
                            name="fcoin" 
                            required 
                            variant="outlined"             
                        />
                </Grid>

            </Grid>
            <Grid 
                container
                spacing={0}
            >
                <InputLabel htmlFor="input-with-icon-adornment">
                    Address
                </InputLabel>
                <TextField
                    error={Boolean(touched.montant && errors.montant)} 
                    helperText={touched.montant && errors.montant}
                    
                    type="text" 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    value={values.montant} 
                    style={{marginTop : 23, marginBottom : 23}}
                    fullWidth
                    label="Etiquette" 
                    name="etiquette"
                    variant="outlined"             
                />
            </Grid>
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
                    Swap
                </Button>
                <p style={{ fontSize : 15}}>Avertissement : Tout achat de cryptomonnaie est un investissement risqué. Le cours du Fcoin dépend de l’offre et de la demande sur les marchés de cryptomonnaies et celui-ci peut significativement monter ou baisser, voire même devenir nul.</p>
            </Grid> 
            </form>
                
        )}
        </Formik> 
    </Container>
  )
}

Exchange.layout = Admin;

export default Exchange;