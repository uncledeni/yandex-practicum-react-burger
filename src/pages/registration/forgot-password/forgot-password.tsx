import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { ActionBlock } from '../components/action-block/action-block';
import { getResetPasswordCode } from '../../../shared/api/get-data-service';
import { useForm } from '../../../shared/hooks';

import ForgotPasswordStyles from "./css/style.module.css";

export const ForgotPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { values, handleChange } = useForm({ email: '', password: '', name: '' });

    return (
        <main className={ForgotPasswordStyles.pageWrapper}>
            <div className={ForgotPasswordStyles.mainWrapper}>
                <form className={ForgotPasswordStyles.mainContainer} onSubmit={(e) => {
                    e.preventDefault();
                    getResetPasswordCode(values).then(res => {
                        if (res.success) {
                            navigate('/reset-password', { state: { from: location } })
                        }
                    })
                }}>
                    <h1 className={`${ForgotPasswordStyles.title} text text_type_main-medium`}>Восстановление пароля</h1>
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        isIcon={false}
                        extraClass='mt-6'
                    />
                    <div className={`${ForgotPasswordStyles.button} mt-6 mb-20`}>
                        <Button htmlType="submit" type="primary" size="large">
                            Восстановить
                        </Button>
                    </div>
                    <ActionBlock link={'/login'} title={'Вспомнили пароль?'} linkTitle={'Войти'} />
                </form>
            </div>
        </main>
    )
}