import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {login} from "../features/userSlice";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import facebookLogin from "../facebookLoginService";


function FacebookSocialAuth() {

    const dispatch = useDispatch()
    const history = useHistory()

    const responseFacebook = async (response) => {
      console.log(response);
      response = await facebookLogin({email: response.email, name:response.name})
      dispatch(
          login(response.data.user)
      )
      history.push('/')
    }

    return (
        <FacebookLogin
            appId="993408714554132"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass='facebook_login'
        />
    )
}

export default FacebookSocialAuth