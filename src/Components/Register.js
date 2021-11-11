import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {register} from "../features/userSlice";
import axios from "../axios";
import requests from "../requests";

import {Link } from "react-router-dom";

import '../styles/Forms.css'

function Register() {
    //const user = useSelector((state => state.user.user))
    //const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const data = {
                username: name,
                first_name: firstname,
                last_name: lastname,
                email: email,
                bio: bio,
                password: password,
            }
        debugger;
        axios.post(requests.users, data)
            .then(response => {
                console.log("in then")
                console.log(response)
            })
            .catch(error => {
                console.log("in catch")
                console.log(error)
            })
    }

    return(
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <h1 className='form_heading'>Create account</h1>
                <label className='input_label'>Username</label>
                <input
                    type='name'
                    className='form_input'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className='input_label'>First name</label>
                <input
                    type='name'
                    className='form_input'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label className='input_label'>Last name</label>
                <input
                    type='name'
                    className='form_input'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label className='input_label'>Email</label>
                <input
                    type='email'
                    className='form_input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className='input_label'>Bio</label>
                <input
                    type='bio'
                    className='form_input'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <label className='input_label'>Password</label>
                <input
                    type='password'
                    className='form_input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='register_submit_button'>Create your IMDb account</button>
                <div className='divider'>
                    <hr className="solid" />
                    <span className='span'>Already have an account?</span>
                    <Link to='/login'>Sign-In</Link>
                </div>
            </form>
        </div>
    )

}

export default Register