import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button, Grid, Input, TextField } from "@material-ui/core";
import Card from "../Card/Card";
  
export default function MobileMoney(){
  return(
  <div>
    <h4>Paiement Mobile Money</h4>
    <Popup trigger={
        <Button
            
            variant="contained"
            size="big"
            style={{
                width: '90%',
                borderRadius: 5,
                backgroundColor:"#6aaa70",
                color:'white',
                marginBottom: 4,
                height: '20vh'
            }}
        >
            <img className="mx-2" 
                src="https://previews.123rf.com/images/redeer/redeer1703/redeer170300025/74346681-mobile-payment-vector-isolated-icon-mobile-money-transfer-and-contactless-payment-concept-.jpg" 
                style={{width: '15vh',backgroundColor:'white',borderRadius:5}} 
                alt="Mobile Money" 
            />
                Mobile Money
        </Button>
    } 
     position="right center">
     
      <Button
            variant="contained"
            size="big"
            style={{
                width: '90%',
                borderRadius: 5,
                backgroundColor:"#f27f2c",
                color:'white',
                marginBottom: 4,
                height: '20vh'
            }}
        >
            <img className="mx-2" 
                src="https://pbs.twimg.com/media/FF2qQcLWQAM3Va_.jpg" 
                style={{width: '15vh',backgroundColor:'white',borderRadius:5}} 
                alt="Orange Money" 
            />
                Orange Money
      </Button>
      <Button
            variant="contained"
            size="big"
            style={{
                width: '90%',
                borderRadius: 5,
                backgroundColor:"#6aaa70",
                color:'white',
                marginBottom: 4,
                height: '20vh'
            }}
        >
            <img className="mx-2" 
                src="https://pbs.twimg.com/media/CEdwx6OVEAAfGzN.png:large" 
                style={{width: '15vh',backgroundColor:'white',borderRadius:5}} 
                alt="Mobile Money" 
            />
                Mvola
      </Button>
      <Button
            variant="contained"
            size="big"
            style={{
                width: '90%',
                borderRadius: 5,
                backgroundColor:"#6aaa70",
                color:'white',
                marginBottom: 4,
                height: '20vh'
            }}
        >
            <img className="mx-2" 
                src="https://ugandanweekly.com/wp-content/uploads/2021/03/amc.jpeg" 
                style={{width: '15vh',backgroundColor:'white',borderRadius:5}} 
                alt="Mobile Money" 
            />
                Mobile Money
      </Button>
    </Popup>
  </div>
  )
};