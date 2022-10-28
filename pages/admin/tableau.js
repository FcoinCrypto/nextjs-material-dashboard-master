import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getUser } from "../../services/user";
import { walletAtom } from "../../recoil/atom/walletAtom";
import { authAtom } from "../../recoil/atom/authAtom";
import { Grid, Input } from "@material-ui/core";
import { Icon } from '@iconify/react';
import { Card,CardContent,Typography, CardActions } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import CurrencyFormat from 'react-currency-format';
import QRCode from "react-qr-code";
import Quote from "../../components/Typography/Quote";
import { cours } from "../../services/cours";

import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
function Tableau() {
  const [fcoin, setFcoin] = useState();
  const [usdt, setUsdt] = useState();
  const [ariary, setAriary] = useState();
  const [euro, setEuro] = useState();
  const [etiquette, setEtiquette] = useState();
  const { user } = useRecoilValue(authAtom);
  const [cour, setCour] = useState({});
  const [wallet, setWallet] = useState({});

  useEffect(async () => {
    if (!fcoin) {
      const data = await getUser(user.id);
      console.log(data.data.wallet)
      setWallet(data.data.wallet)
      
      setFcoin(data.data.wallet.ftc);
      setUsdt(data.data.wallet.usdt);
      setAriary(data.data.wallet.ar);
      setEuro(data.data.wallet.euro);
      setEtiquette(data.data.wallet.etiquette);

      const allcour = await cours();
      console.log(allcour.data.data.attributes)
      setCour(allcour.data.data.attributes)
    }
  }, [fcoin])
  

  return (
    <>
      <Grid container>
            <Grid item xs={1}/>
            <Grid item xs={12}>
            <div className="text-white" style={{borderRadius:25, background:'linear-gradient(145deg, rgba(51,155,158,1) 0%, rgba(104,204,152,1) 100%)'}} >
                <center>
              <Quote text="FPay est le premier wallet qui permet de payer ses achats en crypto-monnaie, directement en caisse des magasins. Il permet également de stocker, envoyer et recevoir des crypto-monnaies."/></center>
            </div>
            </Grid>
            <Grid item xs={1}/>
      </Grid>

      <Grid container>
          <Grid item xs={12}>
            <Card sx={{ minWidth: 100 }}>
              <CardContent>
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography variant="h5"  component="div" sx={{ fontSize: 20,mb: 1.5}}>
                      DEVISE
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography variant="h5"  component="div" sx={{ fontSize: 20,mb: 1.5}}>
                      SOLDE ACTUELLE
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography variant="h5"  component="div" sx={{ fontSize: 20,mb: 1.5}}>
                      COURS ACTUELLE
                    </Typography>
                  </Grid>
                </Grid>
                
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <img src="https://cdn-icons-png.flaticon.com/512/102/102983.png?w=360" width={40} className="mx-2"/>
                      ARIARY
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <NumericFormat value={wallet.ar} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} fixedDecimalScale suffix={' Ar'} />
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <CurrencyFormat value={cour.ar} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'1 Ar =  '} suffix={' Ftc'}  />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <img src="https://cdn-icons-png.flaticon.com/512/20/20932.png" width={40} className="mx-2"/>
                        EURO
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <NumericFormat value={wallet.euro} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' €'} />
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <CurrencyFormat value={cour.euro} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'1 € =  '} suffix={' Ftc'}  />
                    </Typography>
                  </Grid>
                </Grid>   
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <img src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" width={40} className="mx-2"/>
                      FCOIN
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <NumericFormat value={wallet.ftc} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' Ftc'} />
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <CurrencyFormat value={cour.ftc} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'1 Ftc =  '} suffix={' Ftc'}  />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <img src="https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png"  width={40} className="mx-2" />
                      USDT
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <NumericFormat value={wallet.usdt} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' $'} />
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <CurrencyFormat value={cour.usdt} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'1 Usdt =  '} suffix={' Ftc'}  />
                    </Typography>
                  </Grid>
                </Grid>  
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"  width={40} className="mx-2" />
                      BTC
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <NumericFormat value={wallet.btc} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' Btc'} />
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <CurrencyFormat value={cour.btc} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'1 Btc =  '} suffix={' Ftc'}  />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" width={40} className="mx-2"/>
                      ETH
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <NumericFormat value={wallet.eth} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' Eth'} />
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <CurrencyFormat value={cour.eth} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'1 Eth =  '} suffix={' Ftc'}  />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <img src="https://cdn-icons-png.flaticon.com/512/825/825487.png" width={40} className="mx-2"/>
                      XMR
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                        <NumericFormat value={wallet.xmr} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' Xmr'} />
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography sx={{ mb: 1.5 }}  color="text.secondary">
                      <CurrencyFormat value={cour.monero} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'1 Xmr =  '} suffix={' Ftc'}  />
                    </Typography>
                  </Grid>
                </Grid>
                

              </CardContent>
            </Card>
          </Grid>
      </Grid>
      <br/>
   
      <Grid container>
        <Grid item xs={2}/>
          <Grid item xs={12}>
            <Card sx={{ minWidth: 100 }}>
              <CardContent>

                <Typography variant="h5" align="center" component="div" sx={{ fontSize: 20,mb: 1.5}}>
                  VOS PORTEFEUILLES
                </Typography>
                <Grid container
                      spacing={7}
                >
                  <Grid item xs={2} container>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <img src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" width={40} className="mx-2"/>
                      FCOIN
                    </Typography>
                  </Grid>
                  { etiquette &&
                    <>
                      <Grid item xs={6} container>
                        <p style={{
                          overflowWrap: 'break-word',
                          wordWrap: 'break-word',
                          wordBreak: 'break-word',
                          lineHeight: '2.2'
                        }}>Adresse = {etiquette}</p>                   
                      </Grid>
                      <Grid item xs={4} container>
                  
                        <QRCode
                          size={256}
                          style={{ height: "auto", maxWidth: "100", width: "50" }}
                          value={etiquette}
                          viewBox={`0 0 256 256`}
                          />            
                      </Grid>
                  </>
                  }
                </Grid>
                <Grid container
                      spacing={7}
                >
                  <Grid item xs={2} container>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <img src="https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png"  width={40} className="mx-2" />
                      USDT
                    </Typography>
                  </Grid>
                  { etiquette &&
                    <>
                      <Grid item xs={6} container>
                        <p style={{
                          overflowWrap: 'break-word',
                          wordWrap: 'break-word',
                          wordBreak: 'break-word',
                          lineHeight: '2.2'
                        }}>Adresse = {etiquette}</p>                   
                      </Grid>
                      <Grid item xs={4} container>
                  
                        <QRCode
                          size={256}
                          style={{ height: "auto", maxWidth: "100", width: "50" }}
                          value={etiquette}
                          viewBox={`0 0 256 256`}
                          />            
                      </Grid>
                  </>
                  }
                </Grid>
                <Grid container
                      spacing={7}
                >
                  <Grid item xs={2} container>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png" width={40} className="mx-2"/>
                      BTC
                    </Typography>
                  </Grid>
                  { etiquette &&
                    <>
                      <Grid item xs={6} container>
                        <p style={{
                          overflowWrap: 'break-word',
                          wordWrap: 'break-word',
                          wordBreak: 'break-word',
                          lineHeight: '2.2'
                        }}>Adresse = {etiquette}</p>                   
                      </Grid>
                      <Grid item xs={4} container>
                  
                        <QRCode
                          size={256}
                          style={{ height: "auto", maxWidth: "100", width: "50" }}
                          value={etiquette}
                          viewBox={`0 0 256 256`}
                          />            
                      </Grid>
                  </>
                  }
                </Grid>
                <Grid container
                      spacing={7}
                >
                  <Grid item xs={2} container>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" width={40} className="mx-2"/>
                      ETH
                    </Typography>
                  </Grid>
                  { etiquette &&
                    <>
                      <Grid item xs={6} container>
                        <p style={{
                          overflowWrap: 'break-word',
                          wordWrap: 'break-word',
                          wordBreak: 'break-word',
                          lineHeight: '2.2'
                        }}>Adresse = {etiquette}</p>                   
                      </Grid>
                      <Grid item xs={4} container>
                  
                        <QRCode
                          size={256}
                          style={{ height: "auto", maxWidth: "100", width: "50" }}
                          value={etiquette}
                          viewBox={`0 0 256 256`}
                          />            
                      </Grid>
                  </>
                  }
                </Grid>
                <Grid container
                      spacing={7}
                >
                  <Grid item xs={2} container>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <img src="https://cdn-icons-png.flaticon.com/512/825/825487.png" width={40} className="mx-2"/>
                      XMR
                    </Typography>
                  </Grid>
                  { etiquette &&
                    <>
                      <Grid item xs={6} container>
                        <p style={{
                          overflowWrap: 'break-word',
                          wordWrap: 'break-word',
                          wordBreak: 'break-word',
                          lineHeight: '2.2'
                        }}>Adresse = {etiquette}</p>                   
                      </Grid>
                      <Grid item xs={4} container>
                  
                        <QRCode
                          size={256}
                          style={{ height: "auto", maxWidth: "100", width: "50" }}
                          value={etiquette}
                          viewBox={`0 0 256 256`}
                          />            
                      </Grid>
                  </>
                  }
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        <Grid item xs={2}/>
      </Grid>
    </>
  )
}

Tableau.layout = Admin;

export default Tableau;