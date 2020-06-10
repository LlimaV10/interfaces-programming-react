import React, {useState} from 'react'
import axios from 'axios'

const Authorization = props => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const hangleButtonClick = () => {
        if (isSignIn) {
            axios.post("http://127.0.0.1:5000/account", {
                name: login,
                password
            })
                .then((responce) => {
                    props.setLoggedUser(responce.data.name)
                })
                .catch((error) => {
                    setErrorMessage(error?.response?.data?.msg || 'Error occured')
                })
        } else {
            if (password === passwordConfirm) {
                axios.put("http://127.0.0.1:5000/account", {
                    name: login,
                    password
                })
                    .then((responce) => {
                        props.setLoggedUser(responce.data.name)
                    })
                    .catch((error) => {
                        setErrorMessage(error?.response?.data?.msg || 'Error occured: try to use other name')
                    })
            } else {
                setErrorMessage('Passwords are different');
                setPassword('');
                setPasswordConfirm('');
            }
        }
        setPassword('');
        setPasswordConfirm('');
    }

    return (
        <div className='authContainer'>
            <div className='auth'>
                <div className='loginType'>{isSignIn ? "Log In" : "Register"}</div>
                <label>Login</label>
                <input
                    onChange={(event) => {
                        setLogin(event.target.value)
                    }}
                    type="text"
                />
                <label>Password</label>
                <input
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                    value={password}
                    type="password"
                />
                {
                    !isSignIn &&
                    <>
                        <label>Confirm password</label>
                        <input
                            onChange={(event) => {
                                setPasswordConfirm(event.target.value)
                            }}
                            value={passwordConfirm}
                            type="password"
                        />
                    </>
                }
                <button
                    onClick={hangleButtonClick}
                >
                    {isSignIn ? "Sign In" : "Sign Up"}
                </button>
                {errorMessage !== '' &&
                    <div className='errorMessage'>{errorMessage}</div>
                }
                <a
                    href="/"
                    onClick={(event) => {
                        event.preventDefault();
                        setIsSignIn(!isSignIn);
                        setPassword('');
                        setErrorMessage('');
                    }}
                >
                    {isSignIn ? "Sign Up" : "Sign In"}
                </a>
            </div>
        </div>
    )
}

export default Authorization