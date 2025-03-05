import React, { useRef, useState, useEffect} from "react";
import ConnectUser from "../utils/hooks/ConnectUser";
import { Link } from "react-router-dom";
import Home from "./Home";
import axios from 'axios'

const LOGIN_URL = "https://ijbgjpo7xg.execute-api.us-east-1.amazonaws.com/test/login";
const SIGNIN_URL = "https://ijbgjpo7xg.execute-api.us-east-1.amazonaws.com/test/register";

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

            return response.status;

          }catch(error){
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
            let accessToken = JSON.parse(response.data.body).accesstoken;
            return accessToken; 
            }
        }catch(error){
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

        const validateEmail = (email : string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if(!validateEmail(email)){
            setErrMsg("Email invalid!");
            if (errRef.current)
                errRef.current.focus();
            return setSuccess(false);
        }

        const register = await Register();

        if(register === 409 ){
            setErrMsg("Email deja exista!");
            if (errRef.current)
                errRef.current.focus();
            return setSuccess(false);
        }
        if(register === 500 ){
            setErrMsg("Nu s-a putut efectua aceasta actiune, revino mai tarziu!");
            if (errRef.current)
                errRef.current.focus();
            return setSuccess(false);
        }

        setSuccess(true);
        alert("Cont creat cu succes!");

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
            <h2 className="title">Creaza cont</h2>
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