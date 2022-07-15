import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/main/MainPage';
import LoginPage from './components/login/LoginPage';
import AuthGuard from './components/authguard/AuthGuard';
import Unauthorized from './components/unauthorized/Unauthorized';
import { Roles } from './models/Roles';
import { loginService } from './service/login.service';
import jwtDecode from 'jwt-decode';
import { clientUrl } from './constants/client';
import UserManagement from './components/usermanagement/UserManagement';
import AllUserManagement from './components/allusermanagement/AllUserManagement';
import { userService } from './service/user.service';

function App() {

  useEffect(() => {
    if (loginService.currentUserValue) {
      if ((jwtDecode<any>(loginService.currentUserValue.token).exp * 1000) < (new Date().getTime())) {
        loginService.logout();
        window.location.href = clientUrl + '/login';
      }
    }
    updateWallet();
  }, []);

  const updateWallet = async (): Promise<void> => {
    const user = await userService.findUserById(loginService.currentUserValue.id || -1);
    if (user === null) {
      return;
    }
    const wallet = user.wallet;
    userService.updateWallet(wallet || -1);
  }

  return (
    <body>
      <div className="container">
        <main>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<AuthGuard element={MainPage} roles={[Roles.USER, Roles.MODERATOR]} />}></Route>
              <Route path='/main' element={<AuthGuard element={MainPage} roles={[Roles.USER, Roles.MODERATOR]} />}></Route>
              <Route path='/user-management' element={<AuthGuard element={UserManagement} roles={[Roles.USER, Roles.MODERATOR]} />}></Route>
              <Route path='/all-user-management' element={<AuthGuard element={AllUserManagement} roles={[Roles.MODERATOR]} />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/unauthorized' element={<Unauthorized />}></Route>
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </body>
  );
}

export default App;
