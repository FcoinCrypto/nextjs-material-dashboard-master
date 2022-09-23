import React, { useState } from 'react';
import axios from 'axios'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { 
    Button 
} from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { registration } from '../../services/auth';
import { authAtom } from '../../recoil/atom/authAtom';
import {useSetRecoilState } from 'recoil';
import Router from 'next/router';


function Registration() {
    const setAuth = useSetRecoilState(authAtom);

  return (
    <MDBContainer fluid className="p-3 my-5">

        <MDBRow className='w-100 d-flex justify-content-center'>

            <MDBCol col='3' sm='4'>

                <div className='d-flex flex-row mt-2'>
                    <img className="mx-2 " src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" style={{width:60,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                    <span className="h1 fw-bold mb-0">Fcoin</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Créez votre portefeuille Fcoin</h5>
              
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
                            try { 
                                // NOTE: Make API request 
                                // await wait(200);
                                const userRecoil = await registration(values.username, values.email, values.password);
                                setAuth({ token: userRecoil.jwt, user: userRecoil.user });
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
                                error={Boolean(touched.username && errors.username)} 
                                helperText={touched.username && errors.username} 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.username} 
                                fullWidth 
                                label="Username" 
                                name="username" 
                                required 
                                variant="outlined"
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
                            />
                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">J&apos;ai déja un compte</a>
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
                                // onClick={fetchapi}
                                disabled={isSubmitting} 
                                type="submit" 
                            > 
                                Je m&apos; inscris 
                            </Button> 
                            </div> 
                            </form>
                    )}
                </Formik> 


            </MDBCol>
        </MDBRow>

    </MDBContainer>
    
  );
}

export default Registration;

