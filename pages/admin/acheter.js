import React, { useState, useEffect } from "react";
import { Radio } from "@nextui-org/react";
import Admin from "layouts/Admin.js";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Grid, Input } from "@material-ui/core";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { achatMobile, updateWallet } from "../../services/achat";
import { achat, achatCash, achatBank, getNumero } from "../../services/achat";
import { conversionUsdt } from "../../utils/utilAchat";
import { conversion } from "../../utils/utilAchat";
import { authAtom } from "../../recoil/atom/authAtom";
import { getUser } from "../../services/user";
import { addTransaction } from "../../services/transaction";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import MuiPhoneNumber from "material-ui-phone-number";
import { TextField } from "@mui/material";
import Quote from "../../components/Typography/Quote";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Icon } from '@iconify/react';
import {

  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";


  
function Acheter() {
  const [wallet, setWallet] = useState();
  const [idWallet, setIdWallet] = useState();
  const [etiquette, setEtiquette] = useState();
 
  const [infoMoney, setNoneInfoMoney] = useState('none');
  const [choixOperateur, setChoixOperateur] = useState('');
  const { user } = useRecoilValue(authAtom);
  const [ numeroOrange, setNumeroOrange ] = useState();
  const [ numeroTelma, setNumeroTelma ] = useState();
  const [ numeroAirtel, setNumeroAirtel ] = useState();
  const [checked, setChecked] = useState('???');
  const [checkedNumero, setCheckedNumero] = useState();
  const [moneyColor, SetMoneyColor] = useState();
  const [montantMobile, setMontantMobile] = useState();
  const [telClient, setTelClient] = useState();
  const [numero, setNumero] = useState();


 
  const checkedRadio = async(e) =>{
   
    switch (e) {
      case 'Orange Money':{
        SetMoneyColor('#f6ab32')
        setNumero(numeroOrange)
      }
        
        break;
      case 'MVola': {
        SetMoneyColor('#00703d')
        setNumero(numeroTelma)

      }
        
        break;
      case 'Airtel Money': {
        SetMoneyColor('#fb0405')
        setNumero(numeroAirtel)

      }
        
        break;
    
      default:
        break;
    }
    setChecked(e)
    setChoixOperateur('none');

    setNoneInfoMoney('')
  }
  
  //open modal
  const [open, setOpen] = useState(false);
  const [isChangeTransaction, setIsChangeTransaction] = useState(true);
  const [openCash, setOpenCash] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
 //modalData   
    const [modalData, setData] = useState();
    const [cashModalData, setCashData] = useState();
    const [bankModalData, setBankData] = useState();
    const [step1, setStep1] = useState('');
    const [step2, setStep2] = useState('none');
  
    const data = [
      {
        title: "Payment Terms",
        Info: "Mobile Money",
      }
    ];
    const cashdata = [
      {
        title: "Payment Terms",
        Info: "Cash"
      }
    ];
    const bankdata = [
      {
        title: "Payment Terms",
        Info: "Bank"
      }
    ];
//handleOpen +handleClose (Modal)
//Mobile
    const handleOpen = index => {
      setOpen(true);
      setData(data[index]);
    };
  
    const handleClose = () => {
      setOpen(false);
      setNoneInfoMoney('none')
      setChecked('')
      setChoixOperateur('')
      setIsChangeTransaction(true)
      setCheckedNumero()
      setStep2("none")
    };
//Cash
    const handleCloseModalCash = () => {
      setOpenCash(false);
    };
    const handleOpenModalCash = index => {
      setOpenCash(true);
      setCashData(cashdata[index]);
    };
  //Bank
    const handleCloseModalBank = () => {
      setOpenBank(false);
    };
    const handleOpenModalBank = index => {
      setOpenBank(true);
      setBankData(cashdata[index]);
    };

 //Style
    const useStyles = makeStyles(theme => ({
      paper: {
        position: "absolute",
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none",
        minWidth:"300px"
      }
    }));
    const classes = useStyles();
//Modal
    const CustomModal = () => {
      return modalData ? (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
           
            <Typography variant="string" style={{width:'100%'}}>
              <h5>{modalData.Info.toUpperCase()}</h5>
              <div style={{display:choixOperateur}}>

                <Radio.Group 
                  orientation="horizontal" 
                  label="Quel est votre opérateur ?"
                  value={checked}
                  onChange={checkedRadio} 
                >
                  <Grid container>
                    <Grid item lg={4} xs={12}>
                        
                        <Grid container direction="row" alignItems={'center'} justify={'center' }>
                            <Grid item xs={12}>
                            <Button style={{backgroundColor:"#f27f2c", width:180}} onClick={()=>{
                              setChecked("Orange Money")
                              checkedRadio("Orange Money")
                            }}>
                              <img src="https://www.solutions-numeriques.com/wp-content/uploads/2016/06/orange-money.jpg" width="82"/>
                            </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <p style={{ color:'#f27f2c', fontSize:20,marginLeft:40}}>Orange Money</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Grid container direction="row" alignItems={'center'} justify={'center' }>
                            <Grid item xs={12}>
                              <Button style={{backgroundColor:"#00703d", width:180, height:80}} onClick={()=>{
                                  setChecked("MVola")
                                  checkedRadio("MVola")
                                }}>
                                <img src="https://www.moov.mg/sites/default/files/MVOLA.jpg" width="100" height="40"/>
                              </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <p style={{ color:'#00703d', fontSize:20,marginLeft:65}} >Mvola</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Grid container direction="row" alignItems={'center'} justify={'center' }>
                            <Grid item xs={12}>
                              <Button style={{backgroundColor:"#fb0405", width:180}} onClick={()=>{
                                setChecked("Airtel Money")
                                checkedRadio("Airtel Money")
                              }}>
                                <img src="https://images.squarespace-cdn.com/content/v1/5bc4882465019f632b2f8653/1620735164758-K5OSBIW343JMFMKNFEKR/Airtel+Money.png?format=300w" width="100" height="68"/>
                              </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <p style={{ color:'#fb0405', fontSize:20,marginLeft:40}}>Airtel Money</p>
                             
                            </Grid>
                        </Grid>
                    </Grid>
                  </Grid>                
                </Radio.Group>
              </div>
              <p style={{display:infoMoney, marginBottom:0,marginTop:5, color:moneyColor}}>Recharger avec {checked}</p>
              <div style={{display:infoMoney}}>
                
              <Formik
                
                enableReinitialize 
                initialValues={{
                    fcoin:'', 
                    montant: '', 
                    tel:'',
                    description:''
                }} 
                validationSchema={Yup.object().shape({ 
                    montant: Yup.number()
                        .typeError("type error")
                        .positive("A number can't start with a minus")
                        .min(500)
                        .required('require'),
                    description: Yup.string()
                        
                        .required('require'),
                    tel: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
        
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
                        setSubmitting(true);
                        // window.location.reload(false);
                        
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
                <form onSubmit={handleSubmit} >
                <div style={{display:step1}}> 
                    <p>1{')'} Voici votre numéro de recharge {numero}</p>
                    <p>2{')'} Entrer le montant {'> 500 Ar '}ainsi que votre numéro de télephone 03......</p>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6} md={6}>
                          <TextField
                            error={Boolean(touched.montant && errors.montant)} 
                            helperText={touched.montant && errors.montant} 
                            type="number" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.montant} 
                            fullWidth
                            style={{marginTop : 10, marginBottom : 10}}
                            label="Montant en Ariary"
                            placeholder="Montant en Ariary"
                            name="montant" 
                            required 
                            variant="standard"             
                          />
                        </Grid>
                        <Grid item xs={12} lg={6} md={6}>
                          <TextField
                            value={conversion(values.montant,'FTC')} 
                            fullWidth
                            style={{marginTop : 10, marginBottom : 10, marginLeft: 0}}
                            label="Fcoin"
                            placeholder="Fcoin" 
                            name="fcoin" 
                            variant="standard"             
                          />
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={12}>
                        <TextField
                            error={Boolean(touched.tel && errors.tel)} 
                            helperText={touched.tel && errors.tel} 
                            type="text" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.tel} 
                            fullWidth
                            style={{marginTop : 10, marginBottom : 10}}
                            label="Votre numéro de télephone"
                            placeholder="Votre numéro de télephone"
                            name="tel" 
                            required 
                            variant="standard" 
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
                        <Button
                            variant="contained" 
                            color="primary" 
                            disabled={!values.tel || !values.montant} 
                            type="button"
                            style={{marginTop:10}}
                            onClick={(event)=>{
                              event.preventDefault()
                              setStep1("none")
                              setStep2("")
                              setMontantMobile(values.montant)
                              setTelClient(values.tel)
                              
                            }}
                        > 
                            valider
                        </Button>
                        
        
                  </Grid>
                </div>
                 

                </form>
              )}
            </Formik>
              </div>
              <div style={{display:step2}}>
              <Formik
                
                enableReinitialize 
                initialValues={{
                    raison:'', 
                    transaction: '', 
                }} 
                validationSchema={Yup.object().shape({ 
                    raison: Yup.string()
                        
                        .required('require'),
                    
                        transaction: Yup.string()
                        .required("This field is Required")
                })} 
                onSubmit={async (values, { 
                    resetForm, 
                    setErrors, 
                    setStatus, 
                    setSubmitting 
                    }) => {
                    try { 
                      
                      console.log(montantMobile)
                      console.log(etiquette)
                      console.log(montantMobile)
                      const myAchat = await achat(conversion(montantMobile,'FTC'),conversionUsdt(conversion(montantMobile,'FTC')),montantMobile, 'mobile',etiquette,user.id);
                      console.log(myAchat)
                         const numTrans = 'RMB'+myAchat.data.id
                         const myTransaction = await addTransaction(montantMobile,'Achat',numTrans, myAchat.data.id,user.id)
                         const myMobile = await achatMobile(myAchat.data.id,telClient,checked,checkedNumero,values.raison,values.transaction);
                         console.log(myMobile)
                         toast.info("On va étudier votre transaction N° "+values.transaction+" et vous devez recevoir un mail en cas de validation");
                         resetForm(); 
                        setStatus({ success: true }); 
                        setSubmitting(true);
                        handleClose()
                        // window.location.reload(false);
                        
                      } catch (err) { 
                        console.log(err); 
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
                  <p>Veuillez tapez votre raison de transfert ainsi que votre n° de transaction</p>
                  <Grid container
                  mobile={{ overflow: "auto" }}
                  spacing={2} >
                  <Grid item xs={12}>
                    <TextField
                            error={Boolean(touched.raison && errors.raison)} 
                            helperText={touched.raison && errors.raison} 
                            type="text" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.raison} 
                            fullWidth
                            style={{marginTop : 10, marginBottom : 10}}
                            label="Votre raison de tranfert"
                            placeholder="Votre raison de tranfert"
                            name="raison" 
                            required 
                            variant="standard"             
                          />
                      </Grid>

                      <Grid item xs={12}>
                    <TextField
                            error={Boolean(touched.transaction && errors.transaction)} 
                            helperText={touched.raison && errors.raison} 
                            type="text" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.transaction} 
                            fullWidth
                            style={{marginTop : 10, marginBottom : 10}}
                            label="Tapez ici votre numéro de transaction"
                            placeholder="Tapez ici votre numéro de transaction"
                            name="transaction" 
                            required 
                            variant="standard"             
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
                        <Button
                            variant="contained" 
                            color="primary" 
                            disabled={!values.raison || !values.transaction} 
                            type="submit"
                        > 
                            valider
                        </Button>
                  </Grid>
                </form>
              )}
              </Formik>
              </div>
            </Typography>      
          </div>
        </Modal>
      ) : null;
    };

    const CashModal = () => {
      return cashModalData ? (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openCash}
          onClose={handleCloseModalCash}
        >
          <div style={modalStyle} className={classes.paper}>
            
            <Typography variant="string" id="simple-modal-description" style={{width:'100%'}}>
            <h5>PAYEMENT EN ESPECES</h5>
              <Formik
                
                enableReinitialize 
                initialValues={{
                    fcoin:'', 
                    montant: ''
                }} 
                validationSchema={Yup.object().shape({ 
                    montant: Yup.number()
                        .typeError("type error")
                        .positive("A number can't start with a minus")
                        .min(500)
                        .required('require'),
                    
                  
                })} 
                onSubmit={async (values, { 
                    resetForm, 
                    setErrors, 
                    setStatus, 
                    setSubmitting 
                    }) => {
                    try { 
                      
                      const myAchat = await achat(conversion(values.montant,'FTC'),conversionUsdt(conversion(values.montant,'FTC')),values.montant, 'espèces',etiquette,user.id);
                      const numTrans = 'RPM'+myAchat.data.id
                      const myTransaction = await addTransaction(values.montant,'Achat',numTrans, myAchat.data.id,user.id)
                      const myCash = await achatCash(myAchat.data.id);
                      toast.info("On va étudier votre transaction N° "+numTrans+" et veuillez la valider au point cash");

                      resetForm(); 
                        setStatus({ success: true }); 
                        setSubmitting(true);
                        // window.location.reload(false);
                        handleCloseModalCash()
                      } catch (err) { 
                        console.log(err); 
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
                  <Grid container
                  mobile={{ overflow: "auto" }}
                  spacing={2} >
                  <Grid item xs={12}>
                        <TextField
                         error={Boolean(touched.montant && errors.montant)} 
                          helperText={touched.montant && errors.montant} 
                          onBlur={handleBlur} 
                          onChange={handleChange} 
                          type="number"
                          value={values.montant} 
                          fullWidth
                          style={{marginTop : 23, marginBottom : 23,marginRight:10}}
                          label="Montant en Ariary"
                          placeholder="Montant en Ariary" 
                          name="montant" 
                          variant="standard"             
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          
                          
                          value={conversion(values.montant,'FTC')} 
                          fullWidth
                          style={{marginTop : 23, marginBottom : 23}}
                          label="Fcoin"
                          name="fcoin" 
                          required 
                          variant="standard"             
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
                        <Button
                            variant="contained" 
                            color="primary" 
                            disabled={isSubmitting} 
                            type="submit"
                        > 
                            valider
                        </Button>
                  </Grid>
                </form>
              )}
              </Formik>
            </Typography>      
          </div>
        </Modal>
      ) : null;
    };

    const BankModal = () => {
      return bankModalData ? (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openBank}
          onClose={handleCloseModalBank}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="string" id="simple-modal-description" style={{width:'100%'}}>
              <h5>ONLINE PAYEMENT</h5>
              <Formik
                
                enableReinitialize 
                initialValues={{
                    fcoin:'', 
                    montant: '',
                    bank:'', 
                    etiquette:''
                }} 
                validationSchema={Yup.object().shape({ 
                    montant: Yup.number()
                        .typeError("type error")
                        .positive("A number can't start with a minus")
                        .min(500)
                        .required('require'),
                    
                    etiquette: Yup.string()
                        .required("This field is Required")
                })} 
                onSubmit={async (values, { 
                    resetForm, 
                    setErrors, 
                    setStatus, 
                    setSubmitting 
                    }) => {
                    try { 
                      const myAchat = await achat(conversion(values.montant,'FTC'),conversionUsdt(conversion(values.montant,'FTC')),values.montant, 'bank',values.etiquette,user.id);
                      const myBank = await achatBank(myAchat.data.id, values.bank);
                      console.log(myBank)
                        resetForm(); 
                        setStatus({ success: true }); 
                        setSubmitting(false);
                        // window.location.reload(false);
                        
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
                  <Grid container
                  mobile={{ overflow: "auto" }}
                  spacing={2} >
                  <Grid item xs={12}>
                        <TextField
                         error={Boolean(touched.montant && errors.montant)} 
                          helperText={touched.montant && errors.montant} 
                          onBlur={handleBlur} 
                          onChange={handleChange} 
                          type="number"
                          value={values.montant} 
                          fullWidth
                          style={{marginTop : 23, marginBottom : 23,marginRight:10}}
                          label="Montant en Ariary"
                          placeholder="Montant en Ariary" 
                          name="montant" 
                          variant="standard"             
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          
                          
                          value={conversion(values.montant,'FTC')} 
                          fullWidth
                          style={{marginTop : 23, marginBottom : 23}}
                          label="Fcoin"
                          name="fcoin" 
                          required 
                          variant="standard"             
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.bank && errors.bank)} 
                          helperText={touched.bank && errors.bank} 
                          onBlur={handleBlur} 
                          onChange={handleChange} 
                          value={values.bank} 
                          fullWidth
                          style={{marginTop : 23, marginBottom : 23}}
                          label="Bank n°"
                          name="bank" 
                          required 
                          variant="standard"             
                        />
                      </Grid>
                  </Grid>

                  <Grid container >
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.etiquette && errors.etiquette)} 
                          helperText={touched.etiquette && errors.etiquette} 
                          onBlur={handleBlur} 
                          onChange={handleChange} 
                          value={values.etiquette} 
                          fullWidth
                          style={{marginTop : 23, marginBottom : 23}}
                          label="Votre etiquette" 
                          placeholder="Etiquette" 
                          name="etiquette" 
                          required 
                          variant="standard"             
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
                        <Button
                            variant="contained" 
                            color="primary" 
                            disabled={isSubmitting} 
                            type="submit"
                        > 
                            valider
                        </Button>
                  </Grid>
                </form>
              )}
              </Formik>
            </Typography>      
          </div>
        </Modal>
      ) : null;
    };
  
    

  
  useEffect(async () => {
    if (!wallet) {
      const data = await getUser(user.id);
      setWallet(data.data.wallet.fcoin);
      setIdWallet(data.data.wallet.id);
      setEtiquette(data.data.wallet.etiquette);
      const num = await getNumero()
      const numeroOp = num.data
        numeroOp.map((row) => {
        if(row.attributes.operateur == "Airtel"){     
             setNumeroAirtel(row.attributes.numero)
            
            }            
        if(row.attributes.operateur == "Telma"){     
             setNumeroTelma(row.attributes.numero) 
            }            
        if(row.attributes.operateur == "Orange"){     
             setNumeroOrange(row.attributes.numero)
            }            
        }
        
        )
        
      }
  }, [wallet, idWallet,etiquette])
  

  return (
    <>
        {/* header */}
        <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        >
              <Grid item xs={8} lg={4}>
              <img className="mb-3" 
                src="data:image/png;base64,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"                            
                style={{width:'100%',backgroundColor:'white', borderRadius:10, marginTop:-80}} 
                alt="Fpay image" 
              />
              </Grid>
        </Grid>
        <div className="text-white" style={{borderRadius:25, background:'linear-gradient(145deg, rgba(51,155,158,1) 0%, rgba(104,204,152,1) 100%)',fontSize:"17.5px", padding:"10px 0px 1px 0px", verticalAlign:"middle"}} >
          <center>
            <p>Recharger votre compte FPay pour faciliter vos transactions</p>
          </center>
        </div>
        {/* CardTypeRecharge */}
        <Grid container  spacing={2}>
            <Grid item xs={12} lg={6} md={6}>
              <Card>

              <CardHeader color="info">
                
              <p align="center"><b>MOBILE BANKING</b></p>
              </CardHeader>
              <CardBody align="center">
              {data.map((d, index) => (
                <div>
                  <Button
                  onClick={() => {
                      handleOpen(index);

                  }}
                  variant="contained"
                  type="string"
                  size="big"
                  style={{
                      width: '90%',
                      borderRadius: 5,
                      backgroundColor:"#e72f23",
                      color:'white',
                      marginBottom: 4,
                      height: '15vw',
                  }}
                >
                  <img className="mx-2" 
                      src="https://cdn-icons-png.flaticon.com/512/848/848382.png"
                      style={{width: '10vw',backgroundColor:'none',borderRadius:5}} 
                      alt="Mobile Money" 
                  />
                      
                </Button>
              </div>
              ))}
              </CardBody>
              <CardFooter>
              Ariary
              </CardFooter>
              </Card>                  
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <Card>

              <CardHeader color="info">
                
              <p align="center"><b>ESPECES AU POINT MARCHAND</b></p>
              </CardHeader>
              <CardBody align="center">
                {cashdata.map((d, index) => (
                    <Button
                        variant="contained"
                        size="big"
                        style={{
                            width: '90%',
                            borderRadius: 5,
                            backgroundColor:"#ec926b",
                            color:'white',
                            marginBottom: 4,
                            height: '15vw'
                        }}
                        onClick = {()=>{
                          handleOpenModalCash(index)
                        }}
                    >
                        <img className="mx-2" 
                            src="https://cdn-icons-png.flaticon.com/512/438/438526.png"                            
                            style={{width:'10vw',backgroundColor:'none',borderRadius:5}} 
                            alt="Fpay image" 
                        />
                    </Button>
                ))}
              </CardBody>
              <CardFooter>
              Ariary
              </CardFooter>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <Card>

                <CardHeader color="info">
                  
                <p align="center"><b>VIREMENT BANCAIRE</b></p>
                </CardHeader>
                <CardBody align="center">
                {bankdata.map((d, index) => (
                  <Button
                      onClick={() => { 
                        //handleOpenModalBank(index)
                        toast.info("En cours de déveleppement")

                      }}
                      variant="contained"
                      size="big"
                      style={{
                          width: '90%',
                          borderRadius: 5,
                          backgroundColor:"#5fbdbb",
                          color:'white',
                          marginBottom: 4,
                          height: '15vw'
                      }}
                  >
                      <img className="mx-2" 
                          src="https://cdn-icons-png.flaticon.com/512/4313/4313033.png"
                          style={{width: '10vw',backgroundColor:'none',borderRadius:5}} 
                          alt="Card image" 
                      />
                          

                  </Button>
                ))}
                </CardBody>
                <CardFooter>
                Euro
                </CardFooter>
            </Card>                  
          </Grid>            
          <Grid item xs={12} lg={6} md={6}>
            <Card>

              <CardHeader color="info">
                
              <p align="center"><b>CARTE BLEUE</b></p>

              </CardHeader>
              <CardBody align="center">
              {cashdata.map((d, index) => (
                <Button
                    variant="contained"
                    size="big"
                    style={{
                        width: '90%',
                        borderRadius: 5,
                        backgroundColor:"#1c80b3",
                        color:'white',
                        marginBottom: 4,
                        height: '15vw'
                    }}
                    onClick = {()=>{
                      //handleOpenModalBank(index)
                      toast.info("En cours de déveleppement")
                    }}
                >
                    <img className="mx-2" 
                        src="https://cdn-icons-png.flaticon.com/512/5701/5701574.png"                            
                        style={{width:'10vw',backgroundColor:'none',borderRadius:5}} 
                        alt="Fpay image" 
                    />
                </Button>
              ))}                 
              </CardBody>
              <CardFooter>
              Euro
              </CardFooter>
            </Card>                
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
          <Card>

              <CardHeader color="info">
                
              <p align="center"><b>CRYPTOMONAIE</b></p>

              </CardHeader>
              <CardBody align="center">
              {cashdata.map((d, index) => (
                <Button
                    variant="contained"
                    size="big"
                    style={{
                        width: '90%',
                        borderRadius: 5,
                        backgroundColor:"#b6605d",
                        color:'white',
                        marginBottom: 4,
                        height: '15vw'
                    }}
                    onClick = {()=>{
                     //handleOpenModalBank(index)
                     toast.info("En cours de déveleppement")
                    }}
                >
                    <img className="mx-2" 
                        src="https://cdn-icons-png.flaticon.com/512/1213/1213797.png"                            
                        style={{width:'10vw',backgroundColor:'none',borderRadius:5}} 
                        alt="Fpay image" 
                    />
                </Button>
              ))}                 
              </CardBody>
              <CardFooter>
              Crypto
              </CardFooter>
            </Card> 
          </Grid>
        </Grid>
        {/* Modal    && Toast       */}
            <CustomModal />
            <CashModal/>
            <BankModal/>
            <ToastContainer />

       
        
        
    </>
  )
}

Acheter.layout = Admin;

export default Acheter;

function rand() {
    return Math.round(Math.random() * 2) - 1;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      display: 'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    };
  }
  
  