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
      
      setFcoin(data.data.wallet.fcoin);
      setUsdt(data.data.wallet.usdt);
      setAriary(data.data.wallet.ariary);
      setEuro(data.data.wallet.euro);
      setEtiquette(data.data.wallet.etiquette);

      const allcour = await cours();
      console.log(allcour.data.data.attributes)
      setCour(allcour.data.data.attributes)
    }
  }, [fcoin])
  

  return (
    <>
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
                        <NumericFormat value={wallet.ariary} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} fixedDecimalScale suffix={' Ar'} />
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
                        <NumericFormat value={wallet.fcoin} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale suffix={' Ftc'} />
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

        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center mb-5">
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

Tableau.layout = Admin;

export default Tableau;