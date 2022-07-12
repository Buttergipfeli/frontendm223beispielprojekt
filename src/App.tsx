import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/main/MainPage';

function App(): JSX.Element {
  return (
    <body>
      <div className="container">
        <main>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />}></Route>
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </body>
  );
}

export default App;
