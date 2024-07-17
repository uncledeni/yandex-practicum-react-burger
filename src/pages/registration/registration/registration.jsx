import { useRef, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../../../widgets/app-header";
import { ActionBlock } from '../components/action-block/action-block';
import RegistrationStyles from "./css/style.module.css";
import { register } from '../../../shared/api/get-data-service';

export const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const [name, setName] = useState('');
    const inputRef = useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <div className={RegistrationStyles.pageWrapper}>
            <AppHeader />
            <main className={RegistrationStyles.mainWrapper}>
                <div className={RegistrationStyles.mainContainer}>
                    <h1 className={`${RegistrationStyles.title} text text_type_main-medium`}>Регистрация</h1>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
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
                        extraClass="mt-6"
                    />
                    <div className={`${RegistrationStyles.button} mt-6 mb-20`}>
                        <Button htmlType="button" type="primary" size="large" onClick={() => register(email, password, name)}>
                            Зарегистрироваться
                        </Button>
                    </div>
                    <ActionBlock link={'/login'} title={'Уже зарегистрированы?'} linkTitle={'Войти'} />
                </div>
            </main>
        </div>
    )
}