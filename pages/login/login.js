import React, { useState } from 'react';
import Link from 'next/link';
import Router from "next/router";

// import GoogleLogin from 'react-google-login/dist/google-login';
import {  GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Image from 'next/image'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBCheckbox
}
from 'mdb-react-ui-kit';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { confirmeUser, registration } from '../../services/auth';
import { authAtom } from '../../recoil/atom/authAtom';
import { getUser } from '../../services/user';
import {useSetRecoilState } from 'recoil';
import ENV from '../../utils/env';
import jwt_decode from "jwt-decode";
import { createWallet } from '../../services/wallet';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const setAuth = useSetRecoilState(authAtom);
    

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
                    await createWallet(registre.user.id)
                    setAuth({ token: registre.jwt, user: registre.user  });
                    Router.push("/admin/tableau");
                }
                if (registre.message == "Request failed with status code 400"){
                    const userConfirm = await confirmeUser(response.email, response.sub)
                        console.log(userConfirm)
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
                    console.log("registration mandeha",registre.user.id)
                    const wallet = await createWallet(registre.user.id)
                    setAuth({ token: registre.jwt, user: registre.user  });
                    console.log("registration mandeha",wallet)
                    Router.push("/admin/tableau");
                }
                if (registre.message == "Request failed with status code 400"){
                    const userConfirm = await confirmeUser(response.email, response.sub)
                        console.log(userConfirm)
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
    return (
        <>
            <MDBContainer fluid className="p-3 my-5 d-flex justify-content-center">

                <MDBRow className='w-50 d-flex justify-content-center'>

                <MDBCol col='3' sm='6'>

                    <div className='d-flex flex-row mt-2'>
                        <img className="mx-2 " src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" style={{width:60,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                        <span className="h1 fw-bold mb-0">Fcoin</span>
                    </div>
                    <Link href="./registration">
                        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px', cursor:'pointer'}}>Inscrivez-vous</h5>
                    </Link>
                    
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
                                        marginBottom: 4,
                                        fontSize:'0.8rem',
                                        minWidth: '50vh'
                                    }}
                                >
                                    <img className="mx-2" src="http://www.agriculture-biodiversite-oi.org/var/ez_site/storage/images/media/images/contribution/logo-fb/132144-1-fre-FR/logo-fb_full.png" style={{width:30,backgroundColor:'white',borderRadius:50}} alt="Facebook image" layout='fixed' />
                                        Se connecter avec facebook

                                </Button>
                            )}
                        >

                    </FacebookLogin>


                    <GoogleOAuthProvider 
                    
                        clientId={'66220988134-n1m5v05ri12up8gvv6ugnc4790ktatvt.apps.googleusercontent.com'}
                        // style={{
                        //     width: '100%',
                        //     borderRadius: 35,
                        //     backgroundColor:"#00853d",
                        //     color:'white',
                        //     marginBottom: 4,
                        //     minWidth: '50vh'
                        // }}
                    >
                        <br/><br/>
                    <div style={{ width: "194%", backgroundColor: "orange"}}>
                        <GoogleLogin
                            style={{minWidth : '194%'}}
                            borderRadius={'100vh'}
                            theme={'outline'}
                            // width={'460'}
                            type={'standard'}
                            size={'50'}
                            logo_alignment={'center'}
                            useOneTap
                            // render={(renderProps) => (
                            //     <Button
                            //         onClick={renderProps.onClick}
                            //         variant="contained"
                            //         size="big"
                            //         style={{
                            //             width: '100%',
                            //             borderRadius: 35,
                            //             backgroundColor:"#00853d",
                            //             color:'white',
                            //             marginBottom: 4,
                            //             minWidth: '50vh'
                            //         }}
                            //     >
                            //         <img className="mx-2" src="https://cdn-icons-png.flaticon.com/512/2504/2504739.png" style={{width:20,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                            //             Se connecter avec google
                            //     </Button>
                            // )}
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
                                        marginBottom: 4,
                                        minWidth: '50vh'
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
                                            Router.push("/superAdmin/dashboard");
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
                                style={{minWidth : '50vh'}}
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
                                style={{marginTop : 23, marginBottom : 23, minWidth : '50vh'}}
                                label="Password" 
                                name="password" 
                                required 
                                variant="outlined"             
                            />


                            <div className="d-flex justify-content-between mx-4 mb-4" style={{minWidth:'45vh'}}>
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                <a href="!#">Forgot password?</a>
                            </div>

                                <div className='text-center'>
                                <Button
                                    style={{
                                        borderRadius: 35,
                                        backgroundColor: "#1f80b3",
                                        minWidth: '50vh'
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


                    </MDBCol>
                </MDBRow>
                <ToastContainer />
            </MDBContainer>
        </>
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