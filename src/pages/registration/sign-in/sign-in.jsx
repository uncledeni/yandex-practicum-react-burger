import { useState } from 'react';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../../../widgets/app-header";
import { ActionBlock } from '../components/action-block/action-block';
import SignInStyles from "./css/style.module.css";
import { login } from '../../../shared/api/get-data-service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../../shared/services/actions/auth';

export const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const goToHomePage = async (email, password) => {
        try {
            const res = await login(email, password);
            if (res.success) {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }


    return (
        <div className={SignInStyles.pageWrapper}>
            <AppHeader />
            <main className={SignInStyles.mainWrapper}>
                <div className={SignInStyles.mainContainer}>
                    <h1 className={`${SignInStyles.title} text text_type_main-medium`}>Вход</h1>
                    <EmailInput
                        onChange={onChangeEmail}
                        value={email}
                        name={'email'}
                        isIcon={false}
                        extraClass='mt-6'
                    />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={password}
                        name={'password'}
                        extraClass='mt-6'
                    />
                    <div className={`${SignInStyles.button} mt-6 mb-20`}>
                        <Button htmlType="button"
                        type="primary"
                        size="large"
                        onClick={() => dispatch(loginThunk({email, password}))}>
                            Войти
                        </Button>
                    </div>
                    <ActionBlock link={'/register'} title={'Вы — новый пользователь?'} linkTitle={'Зарегистрироваться'} />
                    <ActionBlock link={'/forgot-password'} title={'Забыли пароль? '} linkTitle={'Восстановить пароль'} extraClass={'mt-4'} />
                </div>
            </main>
        </div>
    )
}