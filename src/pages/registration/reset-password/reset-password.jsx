import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { AppHeader } from "../../../widgets/app-header";
import { ActionBlock } from '../components/action-block/action-block';
import { resetPassword } from '../../../shared/api/get-data-service';

import ResetPasswordStyles from "./css/style.module.css";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState('');
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const [code, setCode] = useState('');
    const codeRef = useRef(null);
    const onIconClick = () => {
        setTimeout(() => codeRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <div className={ResetPasswordStyles.pageWrapper}>
            <AppHeader />
            <main className={ResetPasswordStyles.mainWrapper}>
                <div className={ResetPasswordStyles.mainContainer}>
                    <h1 className={`${ResetPasswordStyles.title} text text_type_main-medium`}>Восстановление пароля</h1>
                    <PasswordInput
                        onChange={onChangePassword}
                        value={password}
                        name={'password'}
                        extraClass="mt-6"
                        placeholder='Введите новый пароль'
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        name={'code'}
                        error={false}
                        ref={codeRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                    <div className={`${ResetPasswordStyles.button} mt-6 mb-20`}>
                        <Button htmlType="button" type="primary" size="large" onClick={() => {
                            resetPassword(password, code).then(res => {
                                try {
                                    navigate('/login', { state: { from: location } });
                                } catch (err) {
                                    alert(err);
                                }
                            })
                        }}>
                            Сохранить
                        </Button>
                    </div>
                    <ActionBlock link={'/login'} title={'Вспомнили пароль?'} linkTitle={'Войти'} />
                </div>
            </main>
        </div>
    )
}