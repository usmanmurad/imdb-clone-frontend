import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {login, logout} from "../features/userSlice";
import {useHistory} from "react-router-dom";
import axios from "../axios";
import requests from "../requests";
import '../styles/Forms.css';
import GoogleSocialAuth from "./GoogleSocialAuth";
import FacebookSocialAuth from "./FacebookSocialAuth";


function Login() {

    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()

    function handleSubmit(e) {
        console.log(e.target)
        e.preventDefault()
        const data = {
            username: username,
            password: password,
        }
        axios.post(requests.login, data)
            .then(response => {
                console.log(response)
                dispatch(
                    login(response.data.user)
                )
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', JSON.stringify(response.data.token))
                history.push('/')
            })
            .catch(errors => {
                console.log(errors)
                dispatch(
                    logout()
                )
                history.push('/login')
            })
    }


    return(
        <>
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <h1 className='form_heading'>Sign-In</h1>
                <label className='input_label'>Username</label>
                <input
                    className='form_input'
                    type='name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className='input_label'>Password</label>
                <input
                    className='form_input'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='submit_button'>Sign-In</button>
                <div className='divider'>
                    <hr className="solid" />
                    <span className='span'>New to IMDb?</span>
                </div>
                <button type='button'
                        onClick={() => history.push('/register')}
                        className='register_button'
                >Create your IMDb account</button>
            </form>
            <GoogleSocialAuth />
            <FacebookSocialAuth />
        </div>
       </>
    )

}

export default Login