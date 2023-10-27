import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Buttons from '../../../shared/Buttons';
import { useRef } from "react";
import { Button } from '@mui/material';
import { networkOperations } from '../../../shared/services/api-client';
import logo from './Logo.jpg';
import { useEffect } from 'react';
import Swal from 'sweetalert2'


import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBBtn,
  MDBTabsPane,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

const Userlogin = () => {
  const [message,setMessage]=useState('');
  
  const emailRef=useRef();
  const passwordRef=useRef();
  const nameRef=useRef();
  const phoneRef=useRef();
  const [mid,setMid]=useState('');
  const addressRef=useRef();
  const [print,setPrint]=useState('');
  
  function func(){
    var d = new Date().getTime();
    return d;
}

  

  const  Register=async()=>{
    
    const midd=func();
    // console.log(midd);
    setMid(midd);
    

    const userInfo={
      'name':nameRef.current.value,
      'email':emailRef.current.value,
      'password':passwordRef.current.value,
      'Mid':midd,
      'phone':phoneRef.current.value
    }
    try{
      const response=await networkOperations.post(process.env.REACT_APP_REGISTER,userInfo);
      setMessage(response.data.message) // printing message registered 
      
      // console.log('response is ', response);
      // console.log('user info',userInfo);
      
    }
    catch(err){
      setMessage('Registered failed');
    }
    // if(message == 'register sucessesfully'){ 
    // Swal.fire('Success!',`Registered sucessfully  YOUR MID IS: ${mid}`);
    // }

  }
  useEffect(()=>{
    // if(message == 'register sucessesfully') {
    //   setPrint(`Registered sucessfully  YOUR MID IS: ${mid}`)
    // }

    if(message == 'register sucessesfully'){ 
      Swal.fire('Success!',`Registered sucessfully  YOUR MID IS: ${mid}`,'success');
      }
    else if(message==''){
      setPrint('');
    }
    else{
      // setPrint('Registered failed');
      Swal.fire('failed!','Registration Failed,Please try again','error');
    }
},[Register])

  return (
    <>
    <div>
  
    

    {/* inputRef for MUI */}
     {/* <TextField id="user_register_name" inputRef={nameRef} label="name" variant="standard" /> <br/> 
     <TextField id="user_register_email" inputRef={emailRef}  label="email" variant="standard" /><br/>
     <TextField id="user_register_password" inputRef={passwordRef} type="password" label="password" variant="standard" /> <br/> 
     <TextField id="user_register_mid" inputRef={midRef}  label="Mid" variant="standard" /><br/>
     <TextField id="user_register_phone" inputRef={phoneRef} label="phone" variant="standard" /> <br/> 
     <TextField id="user_register_address" inputRef={addressRef} label="address" variant="standard" /><br/>
    <Button variant="contained" onClick={Register} > REGISTER</Button><br/> */}

    <div className='text-center'>
    <Buttons/>

    </div>
     <div className="p-5 pb-2 my-5 d-flex flex-column  container  border border-3  rounded shadow-lg p-3 mb-5 bg-white rounded " style={{width:'80%' , background :'#3457D5'}}>
      <div className='row'>
      <div className='col-6 border rounded border shadow h-25 text-center' >
      <h4 className='p-4 font-weight-bold '><u><b>Register</b></u></h4>
     


      <MDBTabsContent className='text-center '>
       

        

         

          <MDBInput wrapperClass='mb-4' placeholder='Name'  type='text'  ref={nameRef}  variant="standard"/>
          <MDBInput wrapperClass='mb-4' placeholder='Email'  type='email'  ref={emailRef}/>
          <MDBInput wrapperClass='mb-4' placeholder='Password'  type='password'  ref={passwordRef}/>
          
          <MDBInput wrapperClass='mb-4' placeholder='Phone'  type='text'  ref={phoneRef}/>
          {/* <MDBInput wrapperClass='mb-4' placeholder='Address' id='form1' type='text' id="user_register_address" inputRef={addressRef}/> */}

          <br></br>

          <button className="mb-5 btn btn-outline-primary text-center w-50"  onClick={Register}>Proceed</button>



      </MDBTabsContent>
      </div>
      <div className='col-6'>
        <img src={logo} style={{height : '35vw'}}></img>
      </div>
      </div>
      
      {print} 
    </div>
   </div>
  
   </>
  )
}

export default Userlogin;