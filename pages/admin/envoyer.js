import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import { Button, Grid, Input } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import {Formik, Form} from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import { envoyer, updateWalletOnSend } from "../../services/envoyer.js";
import { addTransfertTransaction } from "../../services/transaction";
import { getUser } from "../../services/user";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";
import { allUSer } from "../../services/allUser.js";
import Autocomplete from '@mui/material/Autocomplete';

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
    const [etiquette, setEtiquette] = useState();
    const [val,setVal]=useState('???');
    const [destID,setDestID]=useState();
      
    useEffect(async () => {
        if (!wallet) {
        const data = await getUser(user.id);
        setWallet(data.data.wallet.ftc);
        setIdWallet(data.data.wallet.id)
        const users = await allUSer();
        console.log(users)
        setEtiquette(data.data.wallet.etiquette)
        const allUS = users.data.filter(row=>row.access=="user"&&row.id!=user.id).map((key)=>{
          return {"label":key.username,"destinataire_id":key.id}
        })
        
        setDestinataire(allUS)
        console.log(allUS)
        }
    }, [wallet, idWallet])
    
  return (
    <>
        <div><b>ENVOYER DES FCOINS</b></div>
        <center><p> Vous détenez actuellement : <strong> {wallet} Fcoin </strong><br/>  Entrez le montant de Fcoin que vous souhaitez envoyer</p></center>
        <Formik 
            enableReinitialize 
            initialValues={{ 
                montant: '',
            }} 
            validationSchema={Yup.object().shape({ 
                montant: Yup.number()
                    .typeError("That doesn't look like a phone number")
                    .positive("A phone number can't start with a minus")
                    .min(0.00000000000001)
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
                    // const newFcoin = values.fcoin + fcoin.data;
                    // console.log("test",newFcoin, fcoin.data)
                    // await updateWallet(newFcoin)

                    const newFcoin  = wallet - values.montant;
                    if(newFcoin > 0){
                      console.log(values.montant)
                      console.log(etiquette)
                      console.log(val)
                      console.log(user.id)
                      console.log(destID)
                       const myEnv = await envoyer(val, etiquette, values.montant, destID,user.id);
                        console.log(myEnv)
                       const numTrans = 'TRN'+myEnv.data.id
                       const myTransaction = await addTransfertTransaction(values.montant,'Transfert',numTrans, myEnv.data.id,user.id)

                        toast.info("On va étudier votre transaction N° "+numTrans+" et vous devez recevoir un mail en cas de validation");

                    }else{
                        toast.error("Votre fcoin est insuffisant");
                        setdNone('');
                    }
                    resetForm(); 
                    setStatus({ success: true }); 
                    setSubmitting(true);
                    
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
            <Grid spacing={0}
                container
                alignItems="center"
                justifyContent="center">
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(e,values)=>{setVal(values.label); setDestID(values.destinataire_id)}}
                  options={destinataire}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField 
                    variant="outlined"
                    style={{marginTop : 23, marginBottom : 23}}

                  {...params} label="Destinataire" />}
                />
              </Grid>
              <Grid item xs={6}>
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
                      sx={{ width: 300 }}
                      InputLabelProps={{ shrink: true }}
                      // disabled='true'             
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
                
               
            </Grid>
            <center>
                <p style={{ color : "red", display: dNone}}>{insuffisant}</p>
                <p>  
                <br/> Vous allez envoyer 
                <strong> {values.montant} Fcoin </strong> à
                <strong> {val} </strong></p></center>
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
       <ToastContainer />
    </>
  )
}

Envoyer.layout = Admin;

export default Envoyer;