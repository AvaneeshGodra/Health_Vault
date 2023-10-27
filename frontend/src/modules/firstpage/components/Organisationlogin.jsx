import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Buttons from '../../../shared/Buttons';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRef } from 'react';
import { networkOperations } from '../../../shared/services/api-client.js';
import MainPage from '../../organization/pages/MainPage';
import logo from './Logo.jpg'
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
const Organisationlogin = () => {
  const [mess,setMess]=useState('');
  const [org,setOrgdata]=useState("");

  const emailRef=useRef();
  const passwordRef=useRef();
  
  const submit=async()=>{
    
    const userInfo={
      'password':passwordRef.current.value,
      'email':emailRef.current.value
    }

    
    try{
      const response= await networkOperations.post(process.env.REACT_APP_ORGLOGIN,userInfo);//backend

      
      if(response.data.message=='invalid userid or password'){
        setMess(response.data.message);
      }
      else{
        
        setOrgdata(response.data.orgdata);
        localStorage.setItem('temp', JSON.stringify(response.data.orgdata));
        localStorage.setItem("flag",'true');


      }
      

    }
    catch(err){
      // console.log(err);
      setMess('login fails');
    }
  }
  const navigate = useNavigate();
  const logout=()=>{
      localStorage.setItem('flag','false');
      localStorage.removeItem('temp')
      navigate("/");
    
  }

  if(localStorage.getItem("flag")=='true'){
    return(
      <>
      
        <MainPage orgdata={JSON.parse(localStorage.getItem('temp'))} fn={logout}/>
        
      </>
    
    )

  }
  else{
    return (
      <>
      {/* <Buttons/>
  
      <div className='container'>
      <TextField id="organisation_email"inputRef={emailRef}label="email" variant="standard"/> <br/>
      <TextField id="organisation_password" inputRef={passwordRef}label="password" variant="standard" /><br/>
      <Button variant="contained" onClick={submit}> LOGIN </Button>
      </div> */}
      <div className='text-center'>
    <Buttons/>

    </div>
     <MDBContainer className="p-5 pb-2 my-5 d-flex flex-column  container  border border-3  rounded shadow-lg p-3 mb-5 bg-white rounded " style={{width:'80%' , background :'#3457D5'}}>
      <div className='row'>
      <div className='col-6 border rounded border shadow h-25 text-center' >
      <h4 className='p-2 font-weight-bold p-3'><u><b>Organisation Login</b></u></h4>
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        
        
      </MDBTabs>

      <MDBTabsContent className='text-center p-5'>


          {/* <MDBInput wrapperClass='mb-4' placeholder='Name' id='form1' type='text' id="user_register_name" inputRef={nameRef}  variant="standard"/> */}
          <MDBInput wrapperClass='mb-4' placeholder='Organization Email' id='form1' type='email'  ref={emailRef}/>
          <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1' type='password'  ref={passwordRef}/>
          {/* <MDBInput wrapperClass='mb-4' placeholder='Mid' id='form1' type='text'  id="user_register_mid" inputRef={midRef}/> */}
          {/* <MDBInput wrapperClass='mb-4' placeholder='Phone' id='form1' type='text' id="user_register_phone" inputRef={phoneRef}/>  */}
        

          <br></br>

          <button className="mb-5 btn btn-outline-primary text-center w-50" onClick={submit}>Login</button>



      </MDBTabsContent>
      </div>
      <div className='col-6'>
        <img src={logo} style={{height : '35vw'}} alt='healt-valut'></img>
      </div>
      </div>
      

    </MDBContainer>
    

    
   


      
  
       
    </>

    )
  }
  
  
}

export default Organisationlogin

