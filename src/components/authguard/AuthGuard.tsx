import { loginService } from '../../service/login.service';
import { Navigate } from 'react-router-dom';

type Props = {
    element: () => JSX.Element,
    roles?: string[]
}

function AuthGuard(props: Props): JSX.Element {

    const { element: Component, roles } = props;
    const currentUser = loginService.currentUserValue;

    if (!currentUser) {
        return <Navigate to='/login' />;
    } else if (roles && roles.indexOf(currentUser.rolefk.role) === -1) {
        return <Navigate to='/unauthorized' />
    }

    return (<Component></Component>);
}

export default AuthGuard;