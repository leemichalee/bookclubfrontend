import React from 'react';
import LoginForm from './LoginForm';

function Login({onLoginSubmit}) {
    
    return(
        <div>
            <LoginForm onLoginSubmit={onLoginSubmit}/>
        </div>
    )
}
export default Login