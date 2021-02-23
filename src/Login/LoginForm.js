import React, {useState} from 'react';

function LoginForm ({onLoginSubmit}) {

    const [email, setEmail] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        onLoginSubmit(email)
        console.log(email)
    }

    return(
        <div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <table className="loginForm">
                    <tbody>
                        <tr>
                            <td>
                                <label>Email</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="example@gmail.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="submit" value="Login"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default LoginForm;