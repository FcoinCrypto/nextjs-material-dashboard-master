import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import { Grid } from "@material-ui/core";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {  GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { confirmeUser, registration } from '../../services/auth';
import jwt_decode from "jwt-decode";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { 
    Button 
} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { authAtom } from '../../recoil/atom/authAtom';
import {useSetRecoilState } from 'recoil';
import Router from 'next/router';
import { createWallet } from '../../services/wallet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@iconify/react';

import {

    Container,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";

function Registration() {
    const setAuth = useSetRecoilState(authAtom);
    const [rand, setRand] = useState();
    const ref = useRef(null)
            const [divWidth, setDivWidth] = useState('')
            const handleResize = () => {
                setDivWidth(ref.current.offsetWidth)
            }
    useEffect(() => {

        setRand(makeid)
        
        if (ref.current) window.addEventListener('resize', 
        handleResize)
     
             return () => {
                 window.removeEventListener('resize', handleResize)
        }
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 34; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
          }
        
      }, [ref]);
      const  handleResponseLogin = async (response, type) => {
        let input = null;
        let registre = '';

        switch (type) {
            case 'facebook':
                registre = await registration(response.name+" ", response.email, response.id)
                
                // const registre = await registration(response.name, response.email, response.sub)  email
                // console.log("registration",registre.response.data.error.message)
                 //console.log("registration mandeha",registre)

                if(registre.jwt) {
                    await createWallet(registre.user.id,rand)
                    setAuth({ token: registre.jwt, user: registre.user  });
                    Router.push("/admin/tableau");
                }
                if (registre.message == "Request failed with status code 400"){
                    const userConfirm = await confirmeUser(response.email, response.sub)
                    if(userConfirm.data){
                        setAuth({ token: userConfirm.data.jwt, user: userConfirm.data.user  });
                        Router.push("/admin/tableau");
                    }
                    else{
                        toast.error(userConfirm.response.data.error.message);
                    }
                }
                else {
                    toast.error(registre.message);
                }
                    
                
                
            break;
            case 'google':
                registre = await registration(" "+ response.name, response.email, response.sub)
                

                if(registre.jwt) {
                    const wallet = await createWallet(registre.user.id)
                    setAuth({ token: registre.jwt, user: registre.user  });
                    Router.push("/admin/tableau");
                }
                if (registre.message == "Request failed with status code 400"){
                    const userConfirm = await confirmeUser(response.email, response.sub)
                    if(userConfirm.data){
                        setAuth({ token: userConfirm.data.jwt, user: userConfirm.data.user  });
                        Router.push("/admin/tableau");
                    }
                    else{
                        toast.error(userConfirm.response.data.error.message);
                    }
                }
                else {
                    toast.error(registre.message);
                }
                    
            break;
            default:
            break;
        }
    }
    useLayoutEffect(() => {
        setDivWidth(ref.current.offsetWidth)
    }, [])
  return (<>
            <Grid 
            container 
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{padding:10}}
            minWidth={"10vw"}
                >
                    <Grid xs={12} lg={6}>
                        <Grid container>
                            <Grid item xs={8}>
                                <div className='d-flex flex-row mt-2 justify-content-center'>
                                        <img className="mx-2 " src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" style={{width:60,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                                        <span className="h1 fw-bold mb-0">Fcoin</span>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={8}>
                                <h5 align="center" className="fw-normal mt-4" style={{letterSpacing: '1px', marginBottom:-10}}>Inscrivez-vous gratuitement pour profiter de tous nos services</h5>
                            </Grid>
                        </Grid>

                        <FacebookLogin
                            appId={'827782618658221'}
                            callback={(response) =>
                                handleResponseLogin(response, 'facebook')
                            }
                            fields="name,email,picture"
                            render={(renderProps) => (
                                <Button
                                    
                                    onClick={renderProps.onClick}
                                    variant="contained"
                                    size="big"
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor:"#1f80b3",
                                        color:'white',
                                        marginBottom: 0,
                                        marginTop:40,
                                        fontSize:'0.8rem',
                                        width: '100%',
                                        maxWidth:400
                                    }}
                                >
                                    <img className="mx-2" src={require('../../assets/img/logo-fb_full.png')} style={{width:30,backgroundColor:'white',borderRadius:50}} alt="Facebook image" layout='fixed' />
                                        Se connecter avec facebook

                                </Button>
                            )}
                        >

                        
                        </FacebookLogin>
                        
                        <GoogleOAuthProvider 
                        
                         clientId={'66220988134-n1m5v05ri12up8gvv6ugnc4790ktatvt.apps.googleusercontent.com'}
                        >
                            <br/><br/>
                            <div id="gl"  ref={ref} style={{ width: "100%", backgroundColor: "#eeeeee"}}>
                                <GoogleLogin
                                    borderRadius={'100vh'}
                                    theme={'outline'}
                                    type={'standard'}
                                    size={'large'}
                                    logo_alignment={'center'}
                                    useOneTap
                                    width={divWidth}
                                    text="Se connecter"

                                    onSuccess={(response) =>
                                        handleResponseLogin(jwt_decode(response.credential), 'google')
                                    }
                                    onFailure={(response) =>
                                        console.log(response)
                                    }
                                    scope={
                                        "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/dialogflow"
                                    }
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                    render={(renderProps) => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            variant="contained"
                                            size="big"
                                            style={{
                                                width: '100%',
                                                borderRadius: 35,
                                                backgroundColor:"#00853d",
                                                color:'white',
                                                
                                            }}
                                        >
                                            <Image className="mx-2" src="https://cdn-icons-png.flaticon.com/512/124/124010.png" style={{width:20,backgroundColor:'white',borderRadius:50}} alt="Facebook image" layout="fixed" />
                                                Se connecter avec facebook

                                        </Button>
                                    )}
                                > 
                                </GoogleLogin>
                            </div>
                        </GoogleOAuthProvider>
                        <Formik 
                                enableReinitialize 
                                initialValues={{ 
                                    username: '',
                                    email: '', 
                                    password: '' ,
                                    changePassword:''
                                }} 
                                validationSchema={Yup.object().shape({ 
                                    email: Yup.string().email('Merci de corriger votre Email').required('Merci de renseigner votre Email'), 
                                    password: Yup.string().min(5, 'Your password must contain between 4 and 60 characters.').max(60, 'Your password must contain between 4 and 60 characters.').required('Merci de renseigner votre mot de passe'), 
                                    changePassword: Yup.string().when("password", {
                                        is: val => (val && val.length > 0 ? true : false),
                                        then: Yup.string().oneOf(
                                        [Yup.ref("password")],
                                        "Both password need to be the same"
                                        )
                                    })
                                })} 
                                onSubmit={async (values, { 
                                    resetForm, 
                                    setErrors, 
                                    setStatus, 
                                    setSubmitting 
                                }) => { 
                                        const userRecoil = await registration(values.username, values.email, values.password);
                                        if(userRecoil.jwt){
                                            console.log(rand)
                                            await createWallet(userRecoil.user.id,rand)
                                            setAuth({ token: userRecoil.jwt, user: userRecoil.user  });
                                            resetForm();
                                            setStatus({ success: true }); 
                                            setSubmitting(false);
                                            Router.push("/admin/tableau");
                                        }
                                        else{
                                            toast.error(userRecoil.response.data.error.message);
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
                                    <TextField 
                                        error={Boolean(touched.username && errors.username)} 
                                        helperText={touched.username && errors.username} 
                                        onBlur={handleBlur} 
                                        onChange={handleChange} 
                                        value={values.username} 
                                        fullWidth 
                                        label="Nom et Prénom(s)" 
                                        name="username" 
                                        required 
                                        variant="outlined"
                                        sx={{
                                            marginTop: 5,
                                            maxWidth:400
                                        }}
                                    />
                                    <br/>
                                    <TextField 
                                        error={Boolean(touched.email && errors.email)} 
                                        helperText={touched.email && errors.email} 
                                        onBlur={handleBlur} 
                                        onChange={handleChange} 
                                        value={values.email} 
                                        fullWidth 
                                        style={{marginTop : 23, marginBottom : 23}}
                                        label="Email" 
                                        name="email" 
                                        required 
                                        variant="outlined"
                                        sx={{
                                            maxWidth:400
                                        }}
                                        
                                    />
                                    <div></div>
                                    <TextField 
                                        error={Boolean(touched.password && errors.password)} 
                                        helperText={touched.password && errors.password} 
                                        type="password" 
                                        onBlur={handleBlur} 
                                        onChange={handleChange} 
                                        value={values.password} 
                                        fullWidth
                                        style={{marginBottom : 23}}
                                        label="Password" 
                                        name="password" 
                                        required 
                                        variant="outlined"
                                        sx={{
                                            maxWidth:400
                                        }}
                                                    
                                    />
                                    <TextField 
                                        error={Boolean(touched.changePassword && errors.changePassword)} 
                                        helperText={touched.changePassword && errors.changePassword} 
                                        type="password" 
                                        onBlur={handleBlur} 
                                        onChange={handleChange} 
                                        value={values.changePassword} 
                                        fullWidth
                                        style={{marginBottom : 23}}
                                        label="confirm password" 
                                        name="changePassword" 
                                        required 
                                        variant="outlined"
                                        sx={{
                                            maxWidth:400
                                        }}  
                                                   
                                    />

                                        <FormGroup>
                                            <Grid container style={{maxWidth:400}}>
                                                <Grid item xs={6} style={{marginTop:-10}}>                                          
                                                    <FormControlLabel control={<Checkbox/>} label="Remenber me" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <a href="!#">J'ai dejà un compte ?</a>
                                                </Grid>
                                            </Grid>
                                        </FormGroup>
                                

                                                <Button
                                                    style={{
                                                        borderRadius: 35,
                                                        backgroundColor: "#1f80b3",
                                                        maxWidth:400,
                                                        marginBottom:20,
                                                        marginTop:20
                                                    }} 
                                                    fullWidth 
                                                    variant="contained" 
                                                    color="primary" 
                                                    // onClick={fetchapi}
                                                    disabled={isSubmitting} 
                                                    type="submit" 
                                                > 
                                                    Je m&apos; inscris 
                                                </Button> 
                                    
                                    </form>
                            )}
                        </Formik> 
                        
                        <ToastContainer />
                    </Grid>
                    <ToastContainer />
                </Grid>
                <hr></hr>
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
   
    
</>);
}

export default Registration;

