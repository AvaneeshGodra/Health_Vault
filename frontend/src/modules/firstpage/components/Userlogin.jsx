import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Buttons from "../../../shared/Buttons";
import { useState } from "react";
import { useRef } from "react";
import { Button } from "@mui/material";
import { networkOperations } from "../../../shared/services/api-client";
import Profile from "../../user/components/Profile";
import ResponsiveDrawer from "../../user/components/ResponsiveDrawer";
import { useNavigate } from "react-router-dom";
// import css from "./style.css";
import logo from "./Logo.jpg";

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
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Userpage from "../../user/pages/Userpage";

const Userlogin = () => {
  const [message, setMessage] = useState("");
  const [Mid, setMid] = useState(-1);
  const midRef = useRef();
  const passwordRef = useRef();

  const verifylogin = async () => {
    try {
      const data = {
        authtoken: localStorage.getItem("authtoken"),
      };
      const response = await networkOperations.post(
        process.env.REACT_APP_VERIFY,
        data
      );

      if (response.status == 400) {
        return;
      } else {
        setMessage(response.data.data.userdata);
        setMid(response.data.data.Mid);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifylogin();
  }, []);

  const submit = async () => {
    const userInfo = {
      password: passwordRef.current.value,
      Mid: midRef.current.value,
    };

    try {
      const response = await networkOperations.post(
        process.env.REACT_APP_LOGIN,
        userInfo
      ); //backend
      setMessage(response.data.message);

      if (response.data.message == "invalid userid or password") {
        setMessage(response.data.message);
      } else {
        localStorage.setItem("authtoken", response.data.authtoken);
        verifylogin();
      }
    } catch (err) {
      console.log(err);
      setMessage("login fails");
    }
  };
  const logout = () => {
    localStorage.removeItem("authtoken");
    setMid(-1);
  };

  if (Mid != -1) {
    return (
      <>
        <Userpage data={message} fn={logout} />
        {/* <Profile data={message} /> */}
        {/* <Button variant="contained" onClick={logout}>LOGOUT</Button> */}
      </>
    );
  } else {
    return (
      // <>
      //   <Buttons />
      //   <head>
      //     <meta charset="UTF-8" />
      //     <meta
      //       name="viewport"
      //       content="width=device-width, initial-scale=1.0"
      //     />
      //     <title>Login Form | By Code Info</title>
      //     {/* <link rel="stylesheet" href={css} /> */}
      //   </head>
      //   <body>
      //     <div class="container">
      //       <div class="login">
      //         <form>
      //           <h1>Login In</h1>
      //           <hr />
      //           <label>Mid</label>
      //           <TextField
      //             id="user_mid"
      //             inputRef={midRef}
      //             label=""
      //             variant="standard"
      //           />{" "}
      //           <br />
      //           <label>Password</label>
      //           <TextField
      //             id="user_password"
      //             inputRef={passwordRef}
      //             type="password"
      //             label=""
      //             variant="standard"
      //           />
      //           <br />
      //           <p>
      //             <Button variant="contained" onClick={submit}>
      //               {" "}
      //               SUBMIT
      //             </Button>
      //           </p>
      //           <closeform></closeform>
      //         </form>
      //       </div>
      //       <div class="pic">
      //         <img src={logo} />
      //       </div>
      //     </div>
      //   </body>
      // </>
      //   <>
      //   <div className='text-center'>
      // <Buttons/>

      // </div>
      //  <div className="p-5 pb-2 my-5 d-flex flex-column  container  border border-3  rounded shadow-lg p-3 mb-5 bg-white rounded " style={{width:'80%' , background :'#3457D5'}}>
      //   <div className='row'>
      //   <div className='col-6 border rounded border shadow h-25 text-center' >
      //   <h4 className='p-2 font-weight-bold  p-4' ><u>Login</u></h4>

      //   <MDBTabsContent className='text-center p-5'>

      //       <MDBInput wrapperClass='mb-4' placeholder='Mid' id='form1' type='text' ref={midRef}/>

      //       <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1' type='password' ref={passwordRef} />

      //       {/* <MDBInput wrapperClass='mb-4' placeholder='Address' id='form1' type='text' id="user_register_address" inputRef={addressRef}/> */}

      //       <br></br>

      //       <button className="mb-5 btn btn-outline-primary text-center w-50" onClick={submit} >Login</button>

      //   </MDBTabsContent>
      //   </div>
      //   <div className='col-6'>
      //     <img src={logo} style={{height : '35vw'}} alt="health-valut"></img>
      //   </div>
      //   </div>

      // </div>

      // {message}
      //   </>

      <>
        <div className="text-center">
          <Buttons />
        </div>
        <div
          className="p-5 pb-2 my-5 d-flex flex-column  container  border border-3  rounded shadow-lg p-3 mb-5 bg-white rounded "
          style={{ width: "80%", background: "#3457D5" }}
        >
          <div className="row">
            <div className="col-6 border rounded border shadow  text-center h-75">
              <h4 className="p-2 font-weight-bold  p-4">
                <u>
                  <b>Login</b>
                </u>
              </h4>

              <MDBTabsContent className="text-center p-5">
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Mid"
                  id="form1"
                  type="text"
                  ref={midRef}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Password"
                  id="form1"
                  type="password"
                  ref={passwordRef}
                />

                {/* <MDBInput wrapperClass='mb-4' placeholder='Address' id='form1' type='text' id="user_register_address" inputRef={addressRef}/> */}

                <br></br>

                <button
                  className="mb-5 btn btn-outline-primary text-center w-50"
                  onClick={submit}
                >
                  Login
                </button>
              </MDBTabsContent>
            </div>
            <div className="col-6">
              <img
                src={logo}
                style={{ height: "35vw" }}
                alt="health-valut"
              ></img>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Userlogin;
