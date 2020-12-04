import React,{useState} from 'react';
import {TextField,Button} from '@material-ui/core';

const SignUp = () =>{
    return(
        <div className = 'signContainer'>
            <h2 style = {{textAlign:'center',fontSize:'2rem',fontFamily:"'Lato',sansSerif",letterSpacing:'0.5vw'}}>Sign Up</h2>
            <div className = 'signInputs'>
                <TextField label = 'Email' variant = "outlined"/>
                <TextField style = {{marginTop:'2vh'}} label = 'Password' variant = "outlined" />
                <TextField style = {{marginTop:'2vh'}} label = 'Confirm' variant = "outlined"/>
                <Button>Register</Button>
            </div>
        </div>
    );
}

export default SignUp;