import axios from "axios";

const googleLogin = async (profileObj) => {
    let response = await axios.post("http://localhost:8000/rest-auth/google/", profileObj);
    console.log(response);
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('token', JSON.stringify(response.data.token))
    return await response;
  };

export default googleLogin;