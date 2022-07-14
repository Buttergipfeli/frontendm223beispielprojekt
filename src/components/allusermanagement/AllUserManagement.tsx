import { useEffect, useState } from 'react';
import { clientUrl } from '../../constants/client';
import { User } from '../../models/User';
import { userService } from '../../service/user.service';
import './AllUserManagement.css';

export default function AllUserManagement(): JSX.Element {

    const [users, setUsers] = useState<User[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [loading, setLoading] = useState<{ updateUserButton: boolean }>({ updateUserButton: false });

    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserHandler = async (id: number): Promise<void> => {
        const user = await userService.deleteUserById(id);
        if (user === null) {
            setErrorMessage('Could not delete user');
            return
        }
        setErrorMessage("");
        setUsers(users.filter(u => u.id !== id));
    }

    const getAllUsers = async (): Promise<void> => {
        const gettedUsers = await userService.getAllUsers();
        if (gettedUsers === null) {
            setErrorMessage('Error while getting users');
            return;
        } else {
            setUsers(gettedUsers);
        }
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        const { value, name } = event.target;
        let tmpUser: any = users[index];
        tmpUser[name] = value;
        let tmpUsers = users;
        tmpUsers[index] = tmpUser
        setUsers([...tmpUsers]);
    }

    const updateUserHandler = async (index: number): Promise<void> => {
        setLoading({ updateUserButton: true });
        const updateUser = users[index];
        console.log(updateUser);
        if (updateUser.password.length > 0) {
            const updatedUser = await userService.updatePassword(updateUser);
            if (updatedUser === null) {
                setErrorMessage("Error while updating user");
            } else {
                setErrorMessage("");
                setSuccessMessage("User updated successfully");
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
        <div className='allUserManagement'>
            <table className='userManagementTable'>
                <thead>
                    <td>ID</td>
                    <td>Username</td>
                    <td>Role</td>
                    <td>Wallet</td>
                    <td>Password</td>
                    <td>Update</td>
                    <td>Delete</td>
                </thead>
                <tbody>
                    {users.length > 0 &&
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.rolefk.role}</td>
                                    <td>{user.wallet}</td>
                                    <td><input type='text' name='password' value={user.password} onChange={(event) => inputHandler(event, index)} /></td>
                                    <td><button onClick={() => updateUserHandler(index)} disabled={loading.updateUserButton}>Update</button></td>
                                    <td><button onClick={() => deleteUserHandler(user.id || -1)} disabled={loading.updateUserButton}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                {errorMessage &&
                    <div className="errorMessage">{errorMessage}</div>
                }
                {successMessage &&
                    <div className="successMessage">{successMessage}</div>
                }
            </div>
            <br></br>
            <div>
                <button onClick={() => gotToMain()}>Go to main page</button>
            </div>
        </div>
    )
}
