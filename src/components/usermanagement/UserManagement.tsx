import './UserManagement.css';
import { loginService } from '../../service/login.service';

export default function UserManagement(): JSX.Element {

    const currentUser = loginService.currentUserValue;

    return (
        <div className="userManagement">
            <table className='userManagementTable'>
                <thead>
                    <td>Username</td>
                    <td>Username</td>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
