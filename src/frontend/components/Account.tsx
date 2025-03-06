import { Link } from "react-router-dom";
import ConnectUser from "../utils/hooks/ConnectUser";
import React, { useRef, useState, useEffect } from "react";
// import jwt from "jsonwebtoken"
import axios from 'axios'
import { Button } from "./elements/Button";


// const VerifyAdmin = () : boolean =>{
//     const { token } = ConnectUser();

//     if(!token.user){
//         return false;
//     }

//     const verifyToken : any = jwt.verify(token.user, secretToken , (err, decoded) => {
//         if (err) {
//             return false;
//         }
//         else {
//             return decoded;
//         }
//     });

//     if(verifyToken.email)
//         return verifyToken.email === "matei.partac45@gmail.com" 
//     else
//         return false;
// }
// const LOGIN_URL = "http://localhost:5000/users/login";
// const secretToken = "secret";

// const LOGIN_URL = "https://ijbgjpo7xg.execute-api.us-east-1.amazonaws.com/test/login";
const LOGIN_URL = "http://localhost:5000/users/login"

const Account = () => {
    const { token, setUser, handleLogin, handleLogout } = ConnectUser();
    const emailRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const errRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(true);

    useEffect(() => {
        if (emailRef.current)
            emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    async function verifyCredentials() {
        try {
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
            if (response.status === 200) {
                setUser({
                    email: email,
                    password: password
                })
                const accessToken = response.data.accessToken;
                // let accessToken = JSON.parse(response.data.body).accesstoken;
                return accessToken;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        const validateEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if (!validateEmail(email)) {
            setErrMsg("Email invalid!");
            if (errRef.current)
                errRef.current.focus();
            return setSuccess(false);
        }

        const accessToken = await verifyCredentials()

        if (!accessToken) {
            setErrMsg("Email sau parola gresita!");
            if (errRef.current)
                errRef.current.focus();
            return setSuccess(false);
        }
        else {
            handleLogin(accessToken)
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className="flex justify-center">
            {
                !token.user ?
                    <div className="flex flex-col py-4 px-20">
                        <h5 ref={errRef} className={!success ? `p-5 text-red-700 text-lg text-center` : ''}> {errMsg} </h5>
                        <h3 className="text-center">Esti deja membru?</h3>
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
                                className="border mt-2 h-8 w-full border-b border-gray-500 text-sm px-2"
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
                                className="border mt-2 h-8 w-full border-b border-gray-500 text-sm px-2"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <br />
                            <input
                                type="submit"
                                value="Intra in cont"
                                className="py-3 w-full bg-red-700 text-white shadow-md text-sm border border-white hover:bg-red-300 hover:text-white"
                            />
                        </form>
                        <br />
                        <p className="text-center"> Daca inca nu esti membru, nu pierde timpul! <Link to="/signin">Sign in</Link></p>
                    </div>
                    :
                    <div className="flex flex-col justify-center pt-5" >
                        <h2 className="flex justify-center text-center"> Contul meu </h2>
                        <div className="flex flex-col py-10">
                            <Link to="/details-account">Detalii despre cont</Link>
                            <Link to="/my-discount">Reduceriile mele</Link>
                            <Link to="/cart">Cosul meu</Link>
                            <Link to="/favorite">Favoritele mele</Link>
                            {/* {   VerifyAdmin()  ?
                            <Link to="/admin">Admin</Link> : null
                        } */}
                            <br />
                            <Button color="red" onClick={handleLogout}> Iesi din cont </Button>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Account;