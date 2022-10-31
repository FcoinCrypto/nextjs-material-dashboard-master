import React, { useState, useEffect } from "react";
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
import { authAtom } from "../../recoil/atom/authAtom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Quote from "../../components/Typography/Quote";
import { Icon } from '@iconify/react';
import { addDemandeTransaction } from "../../services/transaction";

import {

  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

function Reception() {

        const [wallet, setWallet] = useState();
        const [idWallet, setIdWallet] = useState();
        const { user } = useRecoilValue(authAtom);
        const [etiquette, setEtiquette] = useState();

    function handleChangeCustom(event){

    }
    useEffect(async () => {
      if (!wallet)
      
      {
        const data = await getUser(user.id);
      setEtiquette(data.data.wallet.etiquette)
      }

  }, [wallet, idWallet])
  
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
            })} 
            onSubmit={async (values, { 
                resetForm, 
                setErrors, 
                setStatus, 
                setSubmitting 
            }) => {
                try { 
                    // NOTE: Make API request 
                    const recevoir = await recevoirs(etiquette,values.message, values.montant, user.id);
                    const numTrans = 'DPM'+recevoir.data.id
                    const myTransaction = await addDemandeTransaction(values.montant,'Demande de paiement',numTrans, recevoir.data.id,user.id)

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
                <Grid item xs={6}>
                    <TextField
                         error={Boolean(touched.montant && errors.montant)} 
                         helperText={touched.montant && errors.montant} 
                         type="number" 
                         onBlur={handleBlur} 
                         onChange={handleChange} 
                         value={values.montant} 
                         style={{marginTop : 23, marginBottom : 23, width:"100%"}}
                         label="Montant en Fcoin" 
                         name="montant"
                         variant="outlined"
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
        <footer className=" footer">
          <Container>
            <Row className="row-grid align-items-center mb-5">
              <Col lg="6">
              <h5><b>Mentions légales</b></h5>

                <h4 className=" mb-0 font-weight-light" style={{fontSize:15,marginTop:-10}} >
                  Conditions Génerales d'utilisation
                </h4>
                <h4 className=" mb-0 font-weight-light" style={{fontSize:15}}>
                  Conditions Génerales de vente
                </h4>
                <h4 className=" mb-0 font-weight-light" style={{fontSize:15}}>
                  Politique de confidentialité
                </h4>
              </Col>
              <Col className="text-lg-center btn-wrapper" lg="6" style={{marginTop:0}}>
                <h5><b>Contacter nous</b></h5>
                <Button
                  className="btn-icon-only rounded-circle"
                  color="twitter"
                  href="https://twitter.com/CryptoFcoin"
                  id="tooltip475038074"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <Icon icon="simple-icons:twitter" width="30" height="30"/>
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip475038074">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.facebook.com/fcoincrypto"
                  id="tooltip837440414"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <Icon icon="simple-icons:facebook" width="25" height="25" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip837440414">
                  Like us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="dribbble"
                  href="https://discord.com/invite/94trf6G2mQ"
                  id="tooltip829810202"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <Icon icon="simple-icons:discord" width="25" height="25"/>
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip829810202">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="github"
                  href="https://t.me/FCoin"
                  id="tooltip495507257"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <Icon icon="simple-icons:telegram" width="25" height="25" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip495507257">
                  Follow us
                </UncontrolledTooltip>
              </Col>
            </Row>
            <hr style={{marginTop:-30}}/>
            <Row className=" align-items-center justify-content-md-between" style={{marginBottom:-30}}>
              <Col md="12">
                <div className="copyright d-flex justify-content-center">
                Copyright © {new Date().getFullYear()}{" "}
                  <a
                    href="https://www.dev.fcoin.mg"
                    target="_blank"
                    style={{marginLeft:5}}
                  >
                     Fcoin
                  </a>
                  .
                </div>
              </Col>

            </Row>
          </Container>
        </footer>
    </>
  )
}

Reception.layout = Admin;

export default Reception;