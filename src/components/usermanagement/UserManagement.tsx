import './UserManagement.css';
import { loginService } from '../../service/login.service';
import { useEffect, useState } from 'react';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { userService } from '../../service/user.service';
import { clientUrl } from '../../constants/client';

export default function UserManagement(): JSX.Element {

    const currentUser = loginService.currentUserValue;
    const [user, setUser] = useState<User>(new User(null, new Role(null, ''), '', '', '', null));
    const [loading, setLoading] = useState<{ updateUserButton: boolean }>({ updateUserButton: false });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (): Promise<void> => {
        const gettedUser = await userService.getUserById(currentUser.id || -1);
        if (gettedUser === null) {
            setErrorMessage("Error while getting user");
            return;
        }
        gettedUser.password = '';
        setUser(gettedUser);
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = event.target;
        let tmpUser: any = user;
        tmpUser[name] = value;
        setUser({ ...tmpUser });
    }

    const updateUserHandler = async (): Promise<void> => {
        setLoading({ updateUserButton: true });
        if (user.password.length > 0) {
            const updatedUser = await userService.updatePassword(user);
            if (updatedUser === null) {
                setErrorMessage("Error while updating user");
            } else {
                setErrorMessage("");
                setSuccessMessage("User updated successfully");
                updatedUser.password = '';
                setUser(updatedUser);
            }
        } else {
            setErrorMessage("Username cannot be empty");
            setSuccessMessage("");
        }
        setLoading({ updateUserButton: false });
    }

    const gotToMain = (): void => {
        window.location.href = clientUrl + '/main';
    }
    return (
        <div className="userManagement">
            <table className='userManagementTable'>
                <thead>
                    <td>ID</td>
                    <td>Username</td>
                    <td>Wallet</td>
                    <td>Password</td>
                    <td>Update</td>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>CHF {user.wallet}</td>
                        <td><input onChange={(event) => inputHandler(event)} value={user.password} name="password" /></td>
                        <td><button disabled={loading.updateUserButton} onClick={() => updateUserHandler()}>Update</button></td>
                    </tr>
                </tbody>
            </table>
            {errorMessage &&
                <div className="errorMessage">{errorMessage}</div>
            }
            {successMessage &&
                <div className="successMessage">{successMessage}</div>
            }
            <br></br>
            <div>
                <button onClick={() => gotToMain()}>Go to main page</button>
            </div>
        </div>
    )
}
