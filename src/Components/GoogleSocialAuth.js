import React from 'react';
import GoogleLogin from 'react-google-login';
import {useDispatch} from "react-redux";
import {login} from "../features/userSlice";
import {useHistory} from "react-router-dom";

import googleLogin from "../googleLoginService";


function GoogleSocialAuth(){

    const dispatch = useDispatch()
    const history = useHistory()
    const googleResponse = async (response) => {
      console.log(response);
      response = await googleLogin(response.profileObj)
      dispatch(
          login(response.data.user)
      )
      history.push('/')
    }

    const googleFailure = (response) => {
      console.log(response)
      history.push('/login')
    }


    return (
      <div className="App">
        <GoogleLogin
          className='google_login'
          clientId="561311654021-n81t2djpa6afhgrdf3ah6261ercj8mrd.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={googleResponse}
          onFailure={googleFailure}
        />
      </div>
    );
}

export default GoogleSocialAuth;