import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainMenu } from '../pages/main-page';
import { SignInPage } from '../pages/registration/sign-in/sign-in';
import { RegistrationPage } from '../pages/registration/registration/registration';
import { ErrorPage } from '../pages/error/error';
import { ForgotPasswordPage } from '../pages/registration/forgot-password/forgot-password';
import { ResetPassword } from '../pages/registration/reset-password/reset-password';
import { ProfilePage } from '../pages/account/profile/profile';

function App() {
  const [isAuth, setIsAuth] = useState(true);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;