import { useRef, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../../../widgets/app-header";
import ProfileStyles from "./css/style.module.css";
import { ProfileNavbar } from '../components/profile-navbar/profile-navbar';

export const ProfilePage = () => {
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
        <div className={ProfileStyles.pageWrapper}>
            <AppHeader />
            <main className={ProfileStyles.mainWrapper}>
                <ProfileNavbar />
                <div className={ProfileStyles.mainContainer}>
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
                    <div className={`${ProfileStyles.button} mt-6 mb-20`}>
                        <Button htmlType="button" type="primary" size="large">
                            Войти
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}