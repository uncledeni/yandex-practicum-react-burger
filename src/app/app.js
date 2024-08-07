import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Home } from '../pages/home';
import { SignInPage } from '../pages/registration/sign-in/sign-in';
import { RegistrationPage } from '../pages/registration/registration/registration';
import { ForgotPasswordPage } from '../pages/registration/forgot-password/forgot-password';
import { ResetPassword } from '../pages/registration/reset-password/reset-password';
import { ProfilePage } from '../pages/account/profile/profile';
import { ErrorPage } from '../pages/error/error';
import { IngredientPage } from '../pages/ingredient-info/ingredient-page/ingredient-page';
import { OnlyAuth, OnlyUnAuth } from '../shared/utils/protected-route';
import { checkUserAuth } from '../shared/services/actions/auth';
import { IngredientDetailsModal } from '../widgets/burger-ingredients/components/ingredient-details-modal/ingredient-details';
import { AppHeader } from '../widgets/app-header';
import { getBurgerIngredients } from "../shared/services/actions/burger-ingredients";

function App() {
  const dispatch = useDispatch();
  let location = useLocation();
  let state = location.state;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch])

  useEffect(() => {
    dispatch(getBurgerIngredients());
}, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<SignInPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
        <Route path="/profile/orders" />
        <Route path="/profile/orders/:number" />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;