import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Home } from '../pages/home';
import { IngredientPage } from '../pages/ingredient-info/ingredient-page/ingredient-page';
import { SignInPage } from '../pages/registration/sign-in/sign-in';
import { RegistrationPage } from '../pages/registration/registration/registration';
import { ForgotPasswordPage } from '../pages/registration/forgot-password/forgot-password';
import { ResetPassword } from '../pages/registration/reset-password/reset-password';
import { FeedOrders } from '../pages/feed/feed-order/feed-order';
import { ProfilePage } from '../pages/account/profile/profile';
import { ProfileFeedOrders } from '../pages/account/profile/profile-feed-orders/profile-feed-orders';
import { FeedOrderDetailsPage } from '../pages/feed/feed-order-details-page/feed-order-details-page';
import { ErrorPage } from '../pages/error/error';
import { AppHeader } from '../widgets/app-header';
import { FeedOrderDetailsModal } from '../widgets/feed-order-details/modal/feed-order-details-modal';
import { IngredientDetailsModal } from '../widgets/burger-ingredients/components/ingredient-details/modal/ingredient-details-modal';
import { checkUserAuth } from '../shared/services/actions/auth';
import { getBurgerIngredients } from "../shared/services/actions/burger-ingredients";
import { OnlyAuth, OnlyUnAuth } from '../shared/utils';
import { useTypedDispatch } from '../shared/hooks';

function App() {
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const state = location.state;

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
        <Route path="/feed" element={<FeedOrders />} />
        <Route path="/feed/:number" element={<FeedOrderDetailsPage />} />
        <Route path="/profile" element={<OnlyAuth onlyUnAuth={false} component={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<OnlyAuth onlyUnAuth={false} component={<ProfileFeedOrders />} />} />
        <Route path="/profile/orders/:number" element={<OnlyAuth onlyUnAuth={false} component={<FeedOrderDetailsPage />} />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
          <Route path="/feed/:number" element={<FeedOrderDetailsModal />} />
          <Route path="/profile/orders/:number" element={<OnlyAuth onlyUnAuth={false} component={<FeedOrderDetailsModal />} />} />
        </Routes>
      )}
    </>
  );
}

export default App;