import React, { useState, useEffect, useCallback } from "react";
import Admin from "layouts/Admin.js";
import { Box, Button, Container, Grid, IconButton, InputLabel } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import axios from "axios";
// import { updateWallet } from "../../services/achat";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";
import SwapVertRounded from "@material-ui/icons/SwapVertRounded";
import { getAllSymboles, getTicker } from "../../services/dexTrade";
import { conversion, FcoinToUsdT, UsdtToFcoin } from "../../utils/utilAchat";
import CurrencyInput from "../../components/CustomInput/CurrencyInput";


function Exchange() {

    const [amount1, setAmount1] = useState();
    const [amount2, setAmount2] = useState();
    
    const [currency2, setCurrency2] = useState('EUR');
    const [rates, setRates] = useState([]);

   

    const [prix, setPrix] = useState();
    const [frais, setFrais] = useState("coming");
    const [payer, setPayer] = useState();
    const [reçu, setReçu] = useState();
    const [symboles, setSymboles] = useState();
    // const { user } = useRecoilValue(authAtom);
    const [dNone, setdNone] = useState(false);

    const [valueFcoin, setValueFcoin] = useState();
    const [valueUsdt, setValueUsdt] = useState();

    const [currencyUsdt, setCurrencyUsdt] = useState();
    const [usdtValue, setUsdtvalue] = useState();

    function handleUsdtChange(usdtValue) {
        setUsdtvalue(usdtValue);
        console.log(usdtValue)
      }
    
    function handleCurrencyUsdtChange(currencyUsdt) {
        setCurrencyUsdt(currencyUsdt);
    
    }

    const [currencyFcoin, setCurrencyFcoin] = useState();
    const [fcoinValue, setFcoinvalue] = useState();

    function handleFcoinChange(fcoinValue) {
        setFcoinvalue(fcoinValue);
        console.log(fcoinValue)
      }
    
    function handleCurrencyFcoinChange(currencyFcoin) {
        setCurrencyFcoin(currencyFcoin);
    
    }

    const [fcoinDisabled, setFcoinDisabled] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState('disabled');

    const[unite, setUnite]  =useState();
    const { user } = useRecoilValue(authAtom);
    const [insuffisant, setInsuffisant] = useState(); 

    const inputFcoin= useCallback(() => {
            return ( 
                    <InputGroup className="mb-3" id="fcoin" name="fcoin" >
                    <img 
                        className="mx-2" 
                        src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" 
                        style={{width:40,backgroundColor:'white',borderRadius:50}} alt="Facebook image" 
                    />
                    <Form.Control
                        disabled={fcoinDisabled}
                        aria-label="Text input with dropdown button"
                        onChange={(e)=>{
                                setValueFcoin(e.target.value)
                                setdNone(false)
                                setBtnDisabled('')
                            }
                        }
                    />
                    <DropdownButton
                        variant="outline-secondary"
                        title="Fcoin"
                        id="input-group-dropdown-2"
                        align="end"
                        
                    >
                        {  symboles &&
                            symboles.map((symbole)=>{
                                return (
                                    <Dropdown.Item href="#"> {symbole.quote} </Dropdown.Item>
                                )
                            } )
                        }
                        {/* <Dropdown.Divider />
                        <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
                    </DropdownButton>
                    </InputGroup>
            );
        
      }, [fcoinDisabled])
    const inputUsdt = useCallback(() => {
        return (
            <InputGroup className="mb-3">
                <img 
                    className="mx-2" 
                    src="https://cdn-icons-png.flaticon.com/512/2150/2150062.png" 
                    style={{width:40,backgroundColor:'white',borderRadius:50}} alt="Facebook image" 
                />
                <Form.Control
                    disabled={!fcoinDisabled}
                    aria-label="Text input with dropdown button"
                    onChange={(e)=>{
                        setValueUsdt(e.target.value)
                        setBtnDisabled('')
                        setdNone(false)
                    }
                }
                />
                <DropdownButton
                    variant="outline-secondary"
                    title="USDT"
                    id="input-group-dropdown-2"
                    align="end"
                    
                >
                    {  symboles &&
                        symboles.map((symbole)=>{
                            return (
                                <Dropdown.Item href="#"> {symbole.quote} </Dropdown.Item>
                            )
                        } )
                    }
                </DropdownButton>
            </InputGroup>
        );
      }, [fcoinDisabled])
      const swapComponent = useCallback (()=>{
        {
            setFcoinDisabled(!fcoinDisabled)
            setValueFcoin
            setdNone(false)
            if(!fcoinDisabled){
                
                setSubstiteFcoin(inputUsdt);
                setSubstiteUsdt(inputFcoin) ;
                setUnite('FTC')
                
            }else{
                
                setSubstiteFcoin(inputFcoin);
                setSubstiteUsdt(inputUsdt) ;
                setUnite('USDT')
            }
              
            }
      }, [fcoinDisabled])
   
      const [substiteFcoin, setSubstiteFcoin] = useState(inputFcoin);
      const [substiteUsdt, setSubstiteUsdt] = useState(inputUsdt);
    useEffect(async () => {
        setSubstiteFcoin(inputUsdt)
        setSubstiteUsdt(inputFcoin)
        if (!symboles) {
            const data = await getAllSymboles();
            const  listCrypto = data.data.filter( v => {
                if(v.base == "BTC") return v
            })
            setSymboles(listCrypto);
        }
        console.log(symboles)
    }, [symboles])

    const handlerConversion = async (unite) => {
        setBtnDisabled('disabled')
        const tiker = await getTicker("FTCUSDT");
        console.log(tiker)
        setPrix(tiker.data.data.last);
        if(unite=='FTC'){

            setReçu(FcoinToUsdT(valueFcoin, tiker.data.data.last));
        }else{
            setReçu(UsdtToFcoin(valueUsdt, tiker.data.data.last));
        }
        
        setPayer();
        setFrais("exemple");
        setdNone(!dNone);
    }
   
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
                <Grid item xs={12}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Swap from
                    </InputLabel>
                    <br/>
                   {substiteFcoin}
                </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <IconButton 
                        onClick={()=> swapComponent()}
                        
                    >
                        <SwapVertRounded/>
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Swap to
                    </InputLabel>
                    <br/>
                    {substiteUsdt}
                </Grid>

                { dNone &&
                    <>
                    <Grid 
                        xs={12} 
                        container 
                        spacing={5} 
                        style={{
                            padding: "5px",
                        }} 
                    >
                        <Grid xs={2} />
                        <Grid item xs={3}> 
                            <span>Prix : </span>
                        </Grid>
                        <Grid item xs={6}> 
                            <span> 
                                {valueFcoin} {unite} ≈
                                { reçu }
                                {unite}
                            </span>
                        </Grid>
                        <Grid xs={2}/>
                    </Grid>
                    <Grid 
                        xs={12} 
                        container 
                        spacing={5} 
                        style={{
                            padding: "5px"
                        }}
                    >
                        <Grid xs={2}/>
                        <Grid item xs={3}> 
                            <span>Frais : </span>
                        </Grid>
                        <Grid item xs={6}> 
                            <span> 
                                0.0719915 {unite}
                            </span>
                        </Grid>
                        <Grid xs={2}/>
                    </Grid>
                    <Grid 
                        xs={12} 
                        container 
                        spacing={5} 
                        style={{
                            padding: "5px"
                        }}
                    >
                        <Grid xs={2}/>
                        <Grid item xs={3}> 
                            <span>Depense : </span>
                        </Grid>
                        <Grid item xs={6}> 
                            <span> 
                                {reçu} {unite=='FTC'?'USDT':'FTC'}
                            </span>
                        </Grid>
                        <Grid xs={2}/>
                    </Grid>
                    <Grid 
                        xs={12} 
                        container 
                        spacing={5} 
                        style={{
                            padding: "5px"
                        }}
                    >
                        <Grid xs={2}/>
                        <Grid item xs={3}> 
                            <span>Reçu : </span>
                        </Grid>
                        <Grid item xs={6}> 
                            <span> 
                                {valueFcoin} {unite}
                            </span>
                        </Grid>
                        <Grid xs={2}/>
                    </Grid>
                </>
            }
            </Grid>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh', padding: "15px" }}
            >
                <Button
                    variant="contained" 
                    color="primary" 
                    disabled={btnDisabled} 
                    type="submit"
                    onClick={() => handlerConversion(unite)}
                    
                > 
                    Conversion
                </Button>
                
                    { symboles &&
                        <CurrencyInput
                        onAmountChange={handleUsdtChange}
                        onCurrencyChange={handleCurrencyUsdtChange}
                        currencies={symboles}
                        amount={usdtValue}
                        currency={currencyUsdt}
                        linkImage={'https://cdn-icons-png.flaticon.com/512/2150/2150062.png'}
                        /> 
                    }
                    { symboles &&
                        <CurrencyInput
                        onAmountChange={handleFcoinChange}
                        onCurrencyChange={handleCurrencyFcoinChange}
                        currencies={symboles}
                        amount={fcoinValue}
                        currency={currencyFcoin}
                        linkImage={'https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png'}
                        /> 
                    }
                <p style={{ fontSize : 15 }}>Avertissement : Tout achat de cryptomonnaie est un investissement risqué. Le cours du Fcoin dépend de l’offre et de la demande sur les marchés de cryptomonnaies et celui-ci peut significativement monter ou baisser, voire même devenir nul.</p>
            </Grid> 
            </form>
                
        )}
        </Formik> 
    </Container>
  )
}

Exchange.layout = Admin;

export default Exchange;