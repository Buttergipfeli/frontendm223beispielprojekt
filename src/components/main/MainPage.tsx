import { useEffect, useState } from 'react';
import { User } from '../../models/User';
import './MainPage.css';
import { loginService } from '../../service/login.service';

const MainPage = (): JSX.Element => {

    const [user, setUser] = useState<User>(new User(null, '', '', ''));
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        checkAndGetUser();
    }, []);

    const checkAndGetUser = (): void => {
        const gettedUser = loginService.getUser();
        if (gettedUser === null) {
            setErrorMessage("Unexpected error happened");
            return;
        }
        setLoggedInUser(gettedUser);
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        let tmpUser: any = user;
        tmpUser[name] = value;
        setUser({ ...tmpUser });
    }

    const loginHandler = async (): Promise<void> => {
        const response = await loginService.login(user);
        if (!response) {
            setErrorMessage("Invalid username or password");
            return;
        }
        setErrorMessage('');
        checkAndGetUser();
    }

    return (
        <div className='loginForm'>
            <div className="usernameInput">
                <label>Username</label>
                <input type="text" name='username' onChange={(event) => inputHandler(event)} value={user.username} placeholder='Username'></input>
            </div>
            <div className='passwordInput'>
                <label>Password</label>
                <input type="password" name='password' onChange={(event) => inputHandler(event)} value={user.password} placeholder='Password'></input>
            </div>
            <div>
                <button onClick={() => loginHandler()}>Log in</button>
            </div>
            <div>
                <button>Log out</button>
            </div>
            {errorMessage &&
                <div className='errorMessage'>{errorMessage}</div>
            }
            {loggedInUser &&
                <div className='tokenShower'>
                    {loggedInUser.token}
                </div>
            }
        </div>
    );

}

export default MainPage;