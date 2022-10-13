import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, InputLabel } from "@material-ui/core";
import {  UsdtToFcoin } from "../../utils/utilAchat";
import CurrencyInput from "../../components/CustomInput/CurrencyInput";
import {  getTicker } from "../../services/dexTrade";


export default function Depot(props) {

    const [prix, setPrix] = useState();
    const [frais, setFrais] = useState("coming");
    const [payer, setPayer] = useState();
    const [reçu, setReçu] = useState();
    const [dNone, setdNone] = useState(false);

    const [currencyFcoin, setCurrencyFcoin] = useState();
    const [valueFcoin, setValueFcoin] = useState();
    const [currencyUsdt, setCurrencyUsdt] = useState();
    const [usdtValue, setUsdtvalue] = useState();

    function handleUsdtChange(usdtValue) {
        setUsdtvalue(usdtValue);
        setBtnDisabled('')
      }
    
    function handleCurrencyUsdtChange(currencyUsdt) {
        setCurrencyUsdt(currencyUsdt);
    }

    function onFocusChange() {
        setReçu("");
        setUsdtvalue("");
        setBtnDisabled('disabled')
        setdNone(false);
    }


    function handleFcoinChange(fcoinValue) {
        setValueFcoin(fcoinValue);
        setBtnDisabled('')
      }
    
    function handleCurrencyFcoinChange(currencyFcoin) {
        setCurrencyFcoin(currencyFcoin);
    }

    const [btnDisabled, setBtnDisabled] = useState('disabled');

    const[unite, setUnite]  =useState();

    const handlerConversion = async (unite) => {
        console.log(valueFcoin)
        console.log("usdt", usdtValue)
        setBtnDisabled('disabled')
        const tiker = await getTicker("FTCUSDT");
        console.log(tiker)
        setPrix(tiker.data.data.last);
        setReçu(UsdtToFcoin(usdtValue, tiker.data.data.last));
        setUnite("FTC")
        // if(unite=='FTC'){

        //     setReçu(FcoinToUsdT(valueFcoin, tiker.data.data.last));
        // }else{
        //     setReçu(UsdtToFcoin(usdtValue, tiker.data.data.last));
        // }
        
        setPayer();
        setFrais("exemple");
        setdNone(!dNone);
    }

  
    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        J'envoie
                    </InputLabel>
                    <br/>
                    { props.symboles &&
                        <CurrencyInput
                            onAmountChange={handleUsdtChange}
                            onCurrencyChange={handleCurrencyUsdtChange}
                            currencies={props.symboles}
                            amount={usdtValue}
                            currency={currencyUsdt}
                            linkImage={'https://cdn-icons-png.flaticon.com/512/2150/2150062.png'}
                            onFocusChange={onFocusChange}
                        /> 
                    }
                </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Je reçois
                    </InputLabel>
                    <br/>
                    { props.symboles &&
                        <CurrencyInput
                            onAmountChange={handleFcoinChange}
                            onCurrencyChange={handleCurrencyFcoinChange}
                            currencies={props.symboles}
                            amount={reçu}
                            currency={currencyFcoin}
                            linkImage={'https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png'}
                            disabled={true}
                        /> 
                    }
                </Grid>

                { dNone &&
                    <>
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
                                {usdtValue} {unite}
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
            </Grid>
        </div>
    );
    
}


Depot.propTypes = {
  symboles : PropTypes.checkPropTypes(),
};