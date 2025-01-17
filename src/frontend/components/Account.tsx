import { Link } from "react-router-dom";
import ConnectUser from "../utils/hooks/ConnectUser";
import React, { useRef, useState, useEffect} from "react";
import axios from 'axios'
import "./account.css"

const LOGIN_URL = 'http://localhost:5000/users/login';
const Account = () => {
    const { token, setUser, handleLogin, handleLogout } = ConnectUser();
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

    async function verifyCredentials(){
        // aici trebuie schimbat
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
            <h3 className="title">Esti deja membru?</h3>
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
                    value="Intra in cont" 
                    className="login"
                    />
            </form>
            <br />
            <p className="signin"> Daca inca nu esti membru, nu pierde timpul! <Link to="/signin">Sign in</Link></p>
        </div>
        :
        <div>
            <h2 className="title"> Contul meu </h2>
            <div className="account-details">
                <Link to="/details-account">Detalii despre cont</Link>
                <Link to="/my-discount">Reduceriile mele</Link>
                <Link to="/cart">Cosul meu</Link>
                <Link to="/favorite">Favoritele mele</Link>
                <br />
                <button 
                    className="logout"
                    onClick={handleLogout}> Iesi din cont 
                </button>
            </div>
        </div>
        }
    </div>
    );
}

export default Account;