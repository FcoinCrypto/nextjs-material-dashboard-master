import React, { useEffect, useState } from "react";
import { Button, Grid, InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { getCours, updateCours } from "../../services/wallet";
import superAdmin from "layouts/superAdmin.js";
import { Card } from "@mui/material";
import { Typography } from "antd";
import CurrencyFormat from 'react-currency-format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
    root: {
    //   width: '100vw',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 70,
      padding: '0 30px',
    },
    group:{
        background: 'linear-gradient(145deg, rgba(51,155,158,1) 0%, rgba(104,204,152,1) 100%)',
        width: '100%',
        margin: '0 auto 20px',
        display: 'grid',
        gridTemplateColumns: '65vw 10vw 100vw',
        borderRadius: '15px'
    },
    
    input:{
        paddingLeft: '10px',
        background: 'none',
        border:0,
        color:'#fff',
        // borderLeft:'solid 1px white'
    },

    select:{
        padding: '15px',
        background: 'none',
        border:0,
        color:'#fff'
    },
    option:{
      background: '#335',
      borderRadius: '15px'
    }
    ,
    option:{
      background: '#335',
      borderRadius: '15px'
    }
  });


export default function parametre() {

    const classes = useStyles();
    const [cours, setCours] = useState();
    const [amount, setAmount] = useState();
    const [devis, setDevis] = useState("USDT");

    const onDevisChange = (event, value) => {
        setDevis(event.target.value);
    };
    
    const onAmountChange = (value) => {
        setAmount(value);
    }
    const handleFocus = (e) => {
        setAmount("")
    }

    const changeCours = async (e) => {
        const response = await updateCours(devis, amount);
        if(response.statusText == "OK"){
            toast.success("cours mise a jours en " + devis.toUpperCase());
            window.location.reload(false);
        }else{
            toast.success("erreur" + response.statusText);
        }
    }


    useEffect(async () => {
        if (!cours) {
            const data = await getCours();
            const cours = Object.entries(data.data[0].attributes).filter(row => {
                return  row.includes("ar") || row.includes("eth") || row.includes("monero") || row.includes("usdt") || row.includes("btc") || row.includes("euro");
            }
            );
            setCours(cours);
            // setDevis(Object.keys(data.data[0].attributes));
        }
    }, [cours])

    return (
        <div>
            { cours &&
            <>
                <Card>
                { cours.map((cour => (
                    <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <CurrencyFormat value={cour[1]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'1 FTC =  '} suffix={' ' +cour[0]}  />
                    </Typography>
                </Grid>
                )))}    
                </Card>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Changer les cours
                        </InputLabel>
                        <br/>
                        <div className={classes.group}>
                            {/* <img 
                                className="mx-3" 
                                src={props.linkImage}
                                style={{width:32,backgroundColor:'white',borderRadius:50,marginTop:10,borderRight:'solid 1px white'}} alt="Facebook image" 
                            /> */}
                            <input 
                                className={classes.input} 
                                type="text"
                                value={amount} 
                                onChange={ev => onAmountChange(ev.target.value)}
                                onFocus = {(e) => handleFocus(e)}
                            />
                            <select className={classes.select} value={devis} onChange={onDevisChange}>
                                {cours.map((cour => (
                                    <option className={classes.option} value={cour[0]}>{cour[0].toUpperCase()}</option>
                            )))}
                            </select>
                            </div>
                    </Grid>

                    <Button
                        variant="contained" 
                        color="primary" 
                        // disabled={btnDisabled} 
                        type="submit"
                        onClick={() => changeCours()}
                        
                    >
                        Modifier
                    </Button>
                </Grid>
            </>
            }
            <ToastContainer />
        </div>
    );
    
}

parametre.layout = superAdmin;
