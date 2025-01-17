import * as React from "react"
import { useCookies } from 'react-cookie'
import { User } from "../../@types/user"

type ConnectUserProps = {
    token: { user? : string},
    user : User,
    setUser : React.Dispatch<React.SetStateAction<User>>
    handleLogin : (token : string) => void
    handleLogout : () => void
}

const ConnectUser = (): ConnectUserProps => {
    const [token, setToken, removeToken] = useCookies(['user'])
    const [user, setUser]: [User, React.Dispatch<React.SetStateAction<User>>] = React.useState<User>(
        {
            email: '',
            password: ''
        }
    )
    function handleLogin(accessToken: string) {
        setToken('user', accessToken, { path: '/' });
    }

    function handleLogout() {
        removeToken('user');
    }
    
    return {
        token,
        user,
        setUser,
        handleLogin,
        handleLogout
    }
    
}

export default ConnectUser;