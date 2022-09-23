import React, { useState } from 'react';
import Link from 'next/link';
import Router from "next/router";

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBCheckbox
}
from 'mdb-react-ui-kit';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { TextField , Button } from '@material-ui/core';
import { confirmeUser } from '../../services/auth';
import { authAtom } from '../../recoil/atom/authAtom';
import { useSetRecoilState } from 'recoil';
import { getUser } from '../../services/user';

function Login() {

    const setAuth = useSetRecoilState(authAtom);
    const  handleResponseLogin = async (response, type) => {
        let input = null;
        let fullname = '';
        
        switch (type) {
            case 'facebook':
                console.log(response)
            //   fullname = (response.name).split(' ');
            //   input = {
            //     email: response.email,
            //     firstname: fullname.length > 0?fullname[1].toLowerCase():fullname[0].toLowerCase(),
            //     lastname: fullname.length > 0?fullname[0].toUpperCase():'',
            //     password: response.userID,
            //     confirmPassword: response.userID,
            //     provider_name: 'facebook',
            //     oauth_uid: response.userID,
            //     oauth_access_token: response.accessToken,
            //     create_methode: 'account_connectwith'
            //   };
            break;
            case 'google':
                console.log(response)
            //   input = {
            //     email: response.profileObj.email,
            //     firstname: response.profileObj.givenName.toLowerCase(),
            //     lastname: response.profileObj.familyName.toUpperCase(),
            //     password: response.profileObj.googleId,
            //     confirmPassword: response.profileObj.googleId,
            //     provider_name: 'google',
            //     oauth_uid: response.profileObj.googleId,
            //     oauth_access_token: response.accessToken,
            //     create_methode: 'account_connectwith'
            //   };
            break;
            case 'register':
            input = {
                email: response.email,
                firstname: response.firstname.toLowerCase(),
                lastname: response.lastname.toUpperCase(),
                password: response.password,
                confirmPassword: response.confirmPassword,
                provider_name: null,
                oauth_uid: null,
                oauth_access_token: null,
                base_url_website: ENV.host,
                create_methode: 'account_register'
            };
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
                        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Inscrivez-vous</h5>
                    </Link>

                    <GoogleLogin
                        clientId={'186741013778-bh3ph6mmpj4si62e0ejktopeqdqq0tfl.apps.googleusercontent.com'}
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
                                <img className="mx-2" src="https://cdn-icons-png.flaticon.com/512/2504/2504739.png" style={{width:20,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                                    Se connecter avec google

                            </Button>
                        )}
                        onSuccess={(response) =>
                                handleResponseLogin(response, 'google')
                        }
                        onFailure={undefined}
                        cookiePolicy={'single_host_origin'}
                        />


                    <br/><br/>

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
                                        width: '100%',
                                        borderRadius: 35,
                                        backgroundColor:"#1f80b3",
                                        color:'white',
                                        marginBottom: 4,
                                        minWidth: '50vh'

                                    }}
                                >
                                    <img className="mx-2" src="https://cdn-icons-png.flaticon.com/512/124/124010.png" style={{width:20,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                                        Se connecter avec facebook

                                </Button>
                            )}
                        >

                    </FacebookLogin>


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
                                try { 
                                    // NOTE: Make API request 
                                    // await wait(200);
                                    const userRecoil = await confirmeUser(values.email, values.password);
                                    setAuth({ token: userRecoil.data.jwt, user: userRecoil.data.user  });
                                    resetForm();
                                    setStatus({ success: true }); 
                                    setSubmitting(false);
                                    Router.push("/admin/tableau");
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
                            <TextField 
                                error={Boolean(touched.email && errors.email)} 
                                helperText={touched.email && errors.email} 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.email} 
                                fullWidth 
                                label="Email" 
                                name="email" 
                                required 
                                variant="outlined"
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


                            <div className="d-flex justify-content-between mx-4 mb-4">
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