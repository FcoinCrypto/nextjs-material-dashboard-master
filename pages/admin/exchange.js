import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import { Button, Container, Grid } from "@material-ui/core";
import { getAllSymboles, getTicker } from "../../services/dexTrade";
import Retrait from "../../components/exchange/retrait";
import Depot from "../../components/exchange/depot";


function Exchange() {

    const [symboles, setSymboles] = useState();
    const [retrait, setRetrait] = useState(true);
    const [depot, setDepot] = useState(false);

    function handleRetrait() {
        setDepot(false);
        setRetrait(true);
    }

    function handleDepot() {
        setRetrait(false);
        setDepot(true);
    }

    useEffect(async () => {
        // setSubstiteFcoin(inputUsdt)
        // setSubstiteUsdt(inputFcoin)
        if (!symboles) {
            const data = await getAllSymboles();
            const  listCrypto = data.data.filter( v => {
                if(v.base == "FTC") return v
            })
            setSymboles(listCrypto);
        }
        console.log(symboles)
    }, [symboles])
   
  return (
    <Container maxWidth="sm" sx={20}>
        <Grid 
            container
            spacing={0}
            direction="row"
            style={{ marginBottom : 25 }}
        >
            <Grid item xs={3}>
                <Button
                    variant="outlined" 
                    color="default"
                    textPrimary
                    disableElevation
                    style={{ borderTopLeftRadius: 25, borderBottomLeftRadius: 25, height: 30 }}
                    // disabled={btnDisabled} 
                    // type="button"
                    onClick={() => handleRetrait()}   
                > 
                    Retrait Fcoin
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="outlined" 
                    color="default"
                    disableElevation
                    style={{ borderTopRightRadius: 25, borderBottomRightRadius: 25, height: 30 }}
                    // disabled={btnDisabled} 
                    // type="button"
                    onClick={() => handleDepot()}   
                > 
                    Depot Fcoin
                </Button>
            </Grid>
        </Grid>

        { retrait && <Retrait symboles={symboles}/> }

        { depot && <Depot symboles={symboles} />}
            
        <p style={{ fontSize : 15 }}>
            Avertissement : Tout achat de cryptomonnaie est un investissement risqué.
                Le cours du Fcoin dépend de l’offre et de la demande sur les marchés de cryptomonnaies et celui-ci peut significativement monter ou baisser, voire même devenir nul.
        </p>
    </Container>
  )
}

Exchange.layout = Admin;

export default Exchange;