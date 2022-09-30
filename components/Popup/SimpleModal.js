import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

function SimpleModal() {
  const [open, setOpen] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [modalData, setData] = useState();

  const data = [
    {
      title: "Payment Terms",
      Info: "Mobile Money"
    }
  ];
  const CustomModal = () => {
    return modalData ? (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            {modalData.Info}
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            {/** Radio button */}
          </Typography>
          {/* <SimpleModal /> */}
        </div>
      </Modal>
    ) : null;
  };

  const handleOpen = index => {
    setOpen(true);
    setData(data[index]);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      {data.map((d, index) => (
        <div>
          <Button
             onClick={() => {
              handleOpen(index);
            }}
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
        </div>
      ))}
      <CustomModal />
    </div>
  );
}

export default SimpleModal;
