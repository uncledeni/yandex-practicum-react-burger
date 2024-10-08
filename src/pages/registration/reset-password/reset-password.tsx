import React from 'react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { ActionBlock } from '../components/action-block/action-block';
import { resetPassword } from '../../../shared/api/get-data-service';
import { useForm } from '../../../shared/hooks';

import ResetPasswordStyles from "./css/style.module.css";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { values, handleChange } = useForm({ password: '', code: '' });

    const codeRef = useRef<HTMLInputElement>(null);
    const onIconClick = () => {
        setTimeout(() => { if (codeRef.current !== null) codeRef.current.focus() }, 0);
        alert('Icon Click Callback');
    }

    return (
        <main className={ResetPasswordStyles.pageWrapper}>
            <div className={ResetPasswordStyles.mainWrapper}>
                <form className={ResetPasswordStyles.mainContainer} onSubmit={(e) => {
                    e.preventDefault();
                    resetPassword(values).then(() => {
                        try {
                            navigate('/login', { state: { from: location } });
                        } catch (err) {
                            alert(err);
                        }
                    })
                }}>
                    <h1 className={`${ResetPasswordStyles.title} text text_type_main-medium`}>Восстановление пароля</h1>
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        extraClass="mt-6"
                        placeholder='Введите новый пароль'
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange}
                        value={values.code}
                        name={'code'}
                        error={false}
                        ref={codeRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                    <div className={`${ResetPasswordStyles.button} mt-6 mb-20`}>
                        <Button htmlType="submit" type="primary" size="large">Сохранить</Button>
                    </div>
                    <ActionBlock link={'/login'} title={'Вспомнили пароль?'} linkTitle={'Войти'} />
                </form>
            </div>
        </main>
    )
}