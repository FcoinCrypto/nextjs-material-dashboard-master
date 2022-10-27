import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import { Button, Grid, Input } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import { envoyer, updateWalletOnSend } from "../../services/envoyer.js";
import { addTransaction } from "../../services/transaction";
import { getUser } from "../../services/user";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";
import { allUSer } from "../../services/allUser.js";
import { Icon } from '@iconify/react';
import {

  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";



function Envoyer(fcoin) {
    const [wallet, setWallet] = useState();
    const [idWallet, setIdWallet] = useState();
    const { user } = useRecoilValue(authAtom);
    const [insuffisant, setInsuffisant] = useState();
    const [dNone, setdNone] = useState('none');
    const [destinataire, setDestinataire] = useState([]);
      
    useEffect(async () => {
        if (!wallet) {
        const data = await getUser(user.id);
        setWallet(data.data.wallet.fcoin);
        setIdWallet(data.data.wallet.id)
        const users = await allUSer();
        console.log(users.data)
        const allUS = users.data.map((row)=>{
          return row.username
        })
        setDestinataire(allUS)
        console.log(allUS)
        }
    }, [wallet, idWallet])
    const [val,setVal]=useState('')
    const data=[
        "Java",
        "JavaScript",
        "React js",
        "Python",
        "C",
        "C++",
    ]
    
  return (
    <>
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
                
                  <div className="main">
                    <input list="data" onChange={(e)=>setVal(e.target.value)} placeholder="Destinataire" />
                    

                    <h1>{val}</h1>
                   
                    <datalist id="data">
                        {destinataire.map((op)=><option>{op}</option>)}
                    </datalist>
                </div>
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
                    InputLabelProps={{ shrink: true }}
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