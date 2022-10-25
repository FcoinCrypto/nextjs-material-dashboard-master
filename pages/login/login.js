import React, { useState, useEffect,useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Router from "next/router";

// import GoogleLogin from 'react-google-login/dist/google-login';
import {  GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Image from 'next/image'

import {Formik} from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { confirmeUser, registration } from '../../services/auth';
import { authAtom } from '../../recoil/atom/authAtom';
import {useSetRecoilState } from 'recoil';
import jwt_decode from "jwt-decode";
import { createWallet } from '../../services/wallet';
import TextField from '@mui/material/TextField';
import { Grid } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
function Login() {
    const [rand, setRand] = useState();
    const ref = useRef(null)
            const [divWidth, setDivWidth] = useState('')
            const handleResize = () => {
                setDivWidth(ref.current.offsetWidth)
            }
    useEffect(() => {
       
         

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
          setRand(makeid)
        
      }, [ref]);
    const setAuth = useSetRecoilState(authAtom);

    const  handleResponseLogin = async (response, type) => {
        let input = null;
        let registre = '';
        console.log(response)
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
    return (
            <Grid 
            container 
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            minWidth={"10vw"}
             >
                <Grid item xs={12} sm={6}>
                    <div className='d-flex flex-row mt-2 justify-content-center'>
                        <img className="mx-2 " src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" style={{width:60,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                        <span className="h1 fw-bold mb-0">Fcoin</span>
                    </div>
                    
                    <FacebookLogin
                            appId={'1518285375250811'}
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
                                        width: '100%'
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
                                        marginBottom: 0
                                    }}
                                >
                                    <Image className="mx-2" src="https://cdn-icons-png.flaticon.com/512/124/124010.png" style={{width:20,backgroundColor:'white',borderRadius:50}} alt="Facebook image" layout="fixed" />
                                        Se connecter avec facebook

                                </Button>
                            )}
                        > </GoogleLogin>
                    </div>
                    </GoogleOAuthProvider>


                    <br/><br/>

                    <Formik 
                            enableReinitialize 
                            initialValues={{ 
                                email: '', 
                                password: '' 
                            }} 
                            validationSchema={Yup.object().shape({ 
                                email: Yup.string().email('Merci de corriger votre Email').required('Merci de renseigner votre Email'), 
                                password: Yup.string().min(5, 'Your password must contain between 4 and 60 characters.').max(60, 'Your password must contain between 4 and 60 characters.').required('Merci de renseigner votre mot de passe'), 
                            })} 
                            onSubmit={async (values, { 
                                resetForm, 
                                setErrors, 
                                setStatus, 
                                setSubmitting 
                            }) => { 
                                // try { 
                                //     // NOTE: Make API request 
                                //     // await wait(200);
                                    const userRecoil = await confirmeUser(values.email, values.password);
                                    // console.log(userRecoil)
                                    if(userRecoil.data){
                                        if(userRecoil.data.user.access == "user"){
                                            setAuth({ token: userRecoil.data.jwt, user: userRecoil.data.user  });
                                            resetForm();
                                            setStatus({ success: true }); 
                                            setSubmitting(false);
                                            Router.push("/admin/tableau");
                                        }
                                        if(userRecoil.data.user.access == "SuperAdmin"){
                                            setAuth({ token: userRecoil.data.jwt, user: userRecoil.data.user  });
                                            resetForm();
                                            setStatus({ success: true }); 
                                            setSubmitting(false);
                                            Router.push("/superAdmin/tableau");
                                        }
                                    }
                                    if(userRecoil.message == "Request failed with status code 400"){
                                        toast.error(userRecoil.response.data.error.message);
                                    }
                                    else{
                                        toast.error(userRecoil.message);
                                        setStatus({ success: false }); 
                                        setErrors({ submit: err.message }); 
                                        setSubmitting(false); 
                                    }
                                // } catch (err) { 
                                //     console.error(err); 
                                    // setStatus({ success: false }); 
                                    // setErrors({ submit: err.message }); 
                                    // setSubmitting(false); 
                                // } 
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
                                variant='outlined'
                                error={Boolean(touched.email && errors.email)} 
                                helperText={touched.email && errors.email} 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.email} 
                                fullWidth 
                                label="Email"
                                name="email" 
                                required 
                                style={{marginTop:-20}}
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
                                style={{marginTop : 23, marginBottom : 23}}
                                label="Password" 
                                name="password" 
                                required 
                                variant="outlined"             
                            />


                            <div className="d-flex justify-content-between mx-4 mb-4" >
                                <FormGroup>
                                    <Grid container style={{width:"120%"}}>
                                        <Grid item xs={6} style={{marginTop:-10}}>                                          
                                            <FormControlLabel control={<Checkbox/>} label="Remenber me" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <a href="!#">Forgot password?</a>
                                        </Grid>
                                    </Grid>
                                </FormGroup>
                                
                            </div>

                                <div className='text-center'>
                                <Button
                                    style={{
                                        borderRadius: 35,
                                        backgroundColor: "#1f80b3",
                                    }} 
                                    fullWidth 
                                    variant="contained" 
                                    color="primary" 
                                    disabled={isSubmitting} 
                                    type="submit" 
                                > 
                                    Se connecter 
                                </Button> 
                                </div> 
                                </form>
                        )}
                    </Formik> 
                    <center><p style={{marginTop:5, marginBottom:0}}>--OU--</p></center>
                    <Link href="./registration">
                        <Button
                                    style={{
                                        borderRadius: 35,
                                        backgroundColor: "#34a853",
                                    }} 
                                    fullWidth 
                                    variant="contained" 
                                    color="secondary" 
                                    type="submit" 
                                > 
                                    Je m'inscris 
                                </Button> 
                    </Link>
                </Grid>
            <ToastContainer />
            </Grid>
    );
}

export default Login;

    // export const getServerSideProps = async (email,password) => { 
        
    //       const options = {
    //         method: "POST",    
    //       };
    //      const res = await fetch('http://localhost:1337/api/user-logins/2',options); 
    //     console.log('res'); 
    //     return { props: { data : res } }; 
    //   };