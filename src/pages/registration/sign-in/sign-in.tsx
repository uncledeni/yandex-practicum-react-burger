import React from 'react';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { ActionBlock } from '../components/action-block/action-block';
import { loginThunk } from '../../../shared/services/actions/auth';
import { useForm, useTypedDispatch } from '../../../shared/hooks';

import SignInStyles from "./css/style.module.css";

export const SignInPage = () => {
    const dispatch = useTypedDispatch();
    const { values, handleChange } = useForm({ email: '', password: '' });

    return (
        <main className={SignInStyles.pageWrapper}>
            <div className={SignInStyles.mainWrapper}>
                <form className={SignInStyles.mainContainer} onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(loginThunk(values))
                }}>
                    <h1 className={`${SignInStyles.title} text text_type_main-medium`}>Вход</h1>
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        isIcon={false}
                        extraClass='mt-6'
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        extraClass='mt-6'
                        autoComplete="on"
                    />
                    <div className={`${SignInStyles.button} mt-6 mb-20`}>
                        <Button htmlType="submit" type="primary" size="large" >
                            Войти
                        </Button>
                    </div>
                    <ActionBlock link={'/register'} title={'Вы — новый пользователь?'} linkTitle={'Зарегистрироваться'} />
                    <ActionBlock link={'/forgot-password'} title={'Забыли пароль? '} linkTitle={'Восстановить пароль'} extraClass={'mt-4'} />
                </form>
            </div>
        </main>
    )
}