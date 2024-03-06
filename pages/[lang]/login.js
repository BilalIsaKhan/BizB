import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CloseIcon from '@material-ui/icons/Close';
import { Grid, TextField, Button,  Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  
    
  modal: {
    display: "flex",

    flexDirection: "row",
    justifyContent: "center",
    background: "green",
  },
  paper: {
    height: "931px",
    width: "1074",
    borderRadius: "4px",
  },
  label: {
    display: "flex",
    marginTop: theme.spacing(1),
    color: "#333333",
    flexDirection: "column",
  },
  image: {
    height: "863px",
  },
  image2: {
    height: "96px",
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
  },
  image3: {
    height: "105",
    width: "304px",

    marginTop: theme.spacing(2),
  },
  grid1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    background: theme.palette.secondary.selected,
  },
  grid2: {
    display: "flex",
    flexDirection: "column",
    background: theme.palette.background.default,

    paddingLeft: theme.spacing(3),
  },
  icon: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },

  input: {
    width: "387px",
    height: "48px",
    borderRadius: "6px",
    color: "red",

    justifyContent: "center",
    paddingLeft: theme.spacing(2),
    background: "#F7F7F9",
    borderBottomColor: "none",
    "& .MuiInputBase-input": {
      color: "#969696",
      fontSize: "14px",
      padding: "opx",
    },
  },
  register: {
    width: "214px",
    height: "48px",
    borderRadius: "40px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
  },
  socialmedia: {
    width: "230px",
    height: "48px",
    borderRadius: "40px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    padding: "3px",
    background: theme.palette.secondary.selected,
  },
  topheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  terms: {
    lineHeight: "100px",
  },
  checkbox: {
    color: "green",
    "& .MuiIconButton-label ": {
      color: theme.palette.secondary.selected,
    },
  },
  checkboxdiv: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [checkedEmail, setCheckedEmail] = React.useState(true);
 
  const handleChangeEmail = (event) => {
    setCheckedEmail(event.target.checked);
  };
  return (
    <div className={classes.paper}>
          

          <Modal
 
        open={open}
        onClose={handleClose}
        closeAfterTransition
       
      >
        <Fade in={open}>
          
        
        <Grid container  xs={12}>
        <Grid item xs={4} className={classes.grid1}>
        <img src='/authentication/signup2.svg' alt='Login-SignUP' className={classes.image3} />
        <img src='/authentication/login-siginup.svg' alt='Login-SignUP' className={classes.image} />
        </Grid>
        <Grid item xs={4} className={classes.grid2}>
      <div className={classes.topheader}> 
        <img src='/images/logoDark.svg' alt='Login-SignUP' className={classes.image2} />
        <CloseIcon onClick={handleClose}  className={classes.icon}/>
        </div>
        <Typography variant="body1">REGISTRATION </Typography>
        <form>
              <Grid container >
                <Grid xs={12}  item>
                {/* <span>*</span> */}
                <label className={classes.label}  required >FullName 
                <TextField placeholder="Enter last name"   InputProps={{ disableUnderline: true }}   className={classes.input}   
  />
                </label>
                </Grid>
                <Grid xs={12} item>
                  <label className={classes.label} variant="h6">Email
                <TextField placeholder="Enter last name"   InputProps={{ disableUnderline: true }}  required className={classes.input} />
                </label>
                </Grid>
         
                <Grid item xs={12}>
                <label className={classes.label}>Phone Number
                <TextField placeholder="Enter last name"   InputProps={{ disableUnderline: true }}  required className={classes.input} />
                </label>
                </Grid>
                <Grid item xs={12}>
                <label className={classes.label}>Password
                <TextField placeholder="Enter last name"  InputProps={{ disableUnderline: true }}   required className={classes.input} />
                </label>
                </Grid>
              
                <Grid item xs={12}>
                <label className={classes.label}>Re-Enter Password
                <TextField placeholder="Enter last name"  InputProps={{ disableUnderline: true }}   required className={classes.input} />
                </label>
                </Grid>

              </Grid>
              <div className={classes.checkboxdiv}>
              <FormControlLabel
        control={
          <Checkbox
            checked={checkedEmail}
            onChange={handleChangeEmail}
            className={classes.checkbox}
          />
        }
     
      />
       <Typography variant="h6" className={classes.terms}> Aggree With term and conditions</Typography>
      </div>
     
     
            </form>
            <Button className={classes.register} InputProps={{ disableUnderline: true }} variant="h6"> Register</Button>
            <Box className={classes.socialmedia}>
            <img src='/authentication/signup3.svg' alt='Login-SignUP' />
            <Typography variant="h6"> Register With Google</Typography>
       </Box>
       <Box className={classes.socialmedia}>
            <img src='/authentication/signup4.svg' alt='Login-SignUP'  />
            <Typography variant="h6"> Register With Facebook</Typography>
       </Box>
     
        </Grid>
       
        
       
      </Grid>

       
        </Fade>
     
      </Modal>
    </div>
  );
}