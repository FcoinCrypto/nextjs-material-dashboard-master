import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
const useStyles = makeStyles({
    root: {
      width:200,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 70,
      padding: '0 30px',
    },
    group:{
        background: '#335',
        width: '100%',
        margin: '0 auto 20px',
        display: 'grid',
        gridTemplateColumns: '60px 350px 100px',
        borderRadius: '15px'
    },
    
    input:{
        paddingLeft: '10px',
        background: 'none',
        border:0,
        color:'#fff',
        borderLeft:'solid 1px white'
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
function CurrencyInput(props) {
  const classes = useStyles();

  const handleFocus = (e) => {
    e.target.value = "";
    props.onFocusChange();
  }
  return (
    <div className={classes.group}>
      <img 
          className="mx-2" 
          src={props.linkImage}
          style={{width:35,backgroundColor:'white',borderRadius:50,marginTop:10,borderRight:'solid 1px white'}} alt="Facebook image" 
      />
      <input 
        className={classes.input} 
        type="text" 
        value={props.amount} 
        onChange={ev => props.onAmountChange(ev.target.value)}
        onFocus = {(e) => handleFocus(e)}
        disabled={props.disabled}
      />
      <select className={classes.select} value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
        {props.currencies.map((currency => (
          <option className={classes.option} value={currency.quote}>{currency.quote}</option>
        )))}
      </select>
    </div>
  );
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  linkImage: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CurrencyInput;