import './LoginPage.css';
import { useState } from 'react';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { loginService } from '../../service/login.service';
import { clientUrl } from '../../constants/client';

const LoginPage = (): JSX.Element => {

    const [user, setUser] = useState<User>(new User(null, new Role(0, ''), '', '', ''));
    const [loading, setLoading] = useState<{ logInButton: boolean }>({ logInButton: false });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        let tmpUser: any = user;
        tmpUser[name] = value;
        setUser({ ...tmpUser });
    }

    const loginHandler = async (): Promise<void> => {
        setLoading({ logInButton: true });
        const response = await loginService.login(user);
        if (!response) {
            setErrorMessage("Invalid username or password");
        } else {
            setErrorMessage('');
        }
        setLoading({ logInButton: false });
        window.location.href = clientUrl + "/";
    }

    return (
        <div className='loginPage'>
            <h1>Login</h1>
            <div className='loginInputs'>
                <div className='loginInputField'>
                    <label>Username</label>
                    <input type='text' name='username' onChange={(event) => inputHandler(event)} value={user.username} />
                </div>
                <div className='loginInputField'>
                    <label>Password</label>
                    <input type='password' onChange={(event) => inputHandler(event)} value={user.password} name='password' />
                </div>
                {errorMessage.length > 0 &&
                    <div className='errorMessage'>{errorMessage}</div>
                }
                <button onClick={() => loginHandler()} disabled={loading.logInButton}>Log in</button>
            </div>
        </div>
    );
}

export default LoginPage;