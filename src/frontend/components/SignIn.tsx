import React, { useRef, useState, useEffect} from "react";
import ConnectUser from "../utils/hooks/ConnectUser";
import { Link } from "react-router-dom";
import Home from "./Home";
import axios from 'axios'
import './signin.css'

const LOGIN_URL = 'http://localhost:5000/users/login';
const SIGNIN_URL = 'http://localhost:5000/users/register';
const SignIn = () => {
    const {token, setUser, handleLogin } = ConnectUser();
    const emailRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const errRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(true);

    useEffect( () => {
        if (emailRef.current) 
            emailRef.current.focus();
    }, []);
      
    useEffect( () => {
        setErrMsg('');
    }, [email, password]);

    async function Register() 
    {
        try{
            const response = await axios.post(SIGNIN_URL,
                {
                    email: email, 
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Accept': 'application/json'
                    },   
                    withCredentials: true
                }
            )
            if(response.status === 200){
                return true;
            }
          }catch(error){
              console.log(error);
              return false;
          }
    }

    async function verifyCredentials(){
        try{
          const response = await axios.post(LOGIN_URL,
              {
                  email: email, 
                  password: password
              },
              {
                  headers: {
                      'Content-Type': 'application/json; charset=utf-8',
                      'Accept': 'application/json'
                  },   
                  withCredentials: true
              }
          )
          if(response.status === 200){
            setUser({
              email : email,
              password : password
            })
            console.log(response);
            const accessToken = response.data.accessToken;
    
            return accessToken;
          }
        }catch(error){
            console.log(error);
            return false;
        }
    }

    async function handleSubmit(event: { preventDefault: () => void; } ) {
        event.preventDefault();
    
        if(!email || !password){
            setErrMsg("Completati toate campurile!");
            if (errRef.current)
                errRef.current.focus();
            return setSuccess(false);
        }

        const register = await Register();

        if(!register){
            setErrMsg("Email deja exista!");
            if (errRef.current)
                errRef.current.focus();
            return setSuccess(false);
        }else{
            setSuccess(true);
            alert("Cont creat cu succes!");
        }


        const accessToken = await verifyCredentials()
    
        if(!accessToken){
            setErrMsg("Email sau parola gresita!");
            if (errRef.current) 
                errRef.current.focus();
            return setSuccess(false);
        }
        else{
          handleLogin(accessToken)
        }
    
        setEmail('');
        setPassword('');
      }

    return (
    <div className="account">
        {
            !token.user ?
            <div className="account-body">
            <h5 ref={errRef} className={!success ? `error` : `success`}> {errMsg} </h5>
            <h2 className="title">Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Email
                </label>
                <br />
                <input 
                    type="text" 
                    id="username"
                    value={email}
                    ref={emailRef}
                    className="email"
                    required
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                <br /><br />
                <label htmlFor='password'>
                    Password
                </label>
                <br />
                <input 
                    type="password" 
                    id='password'
                    className="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <br />
                <br />
                <input 
                    type="submit" 
                    value="Trimite" 
                    className="login"
                    />
            </form>
            <br />
            <p>
                Ai deja cont? <Link to="/account">Conecteaza-te</Link>
            </p>
        </div>
        : <Home />
        }
    </div>
    );
}


export default SignIn;