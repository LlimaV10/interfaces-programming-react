import React from "react";
import {Link} from "react-router-dom";

const Header = props => {
    const {
        loggedUser,
        setLoggedUser
    } = props;

    return (
        <div className='header'>
            <Link to='/'>Home</Link>
            <div className='welcome'>Hello {loggedUser}</div>
            <div className='logout'>
                <div
                    onClick={() => {
                        setLoggedUser('')
                    }}
                    className='button'
                >
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Header