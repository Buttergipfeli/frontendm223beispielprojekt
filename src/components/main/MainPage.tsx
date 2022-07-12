import { useState } from 'react';
import { User } from '../../models/User';
import './MainPage.css';

const MainPage = (): JSX.Element => {

    const [user, setUser] = useState<User>(new User(null, '', '', ''));

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        let tmpUser: any = user;
        tmpUser[name] = value;
        setUser({ ...tmpUser });
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
                <button>Log in</button>
            </div>
            <div>
                <button>Log out</button>
            </div>
        </div>
    );

}

export default MainPage;