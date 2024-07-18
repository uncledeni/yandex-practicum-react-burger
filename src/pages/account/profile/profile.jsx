import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../../../widgets/app-header";
import { ProfileNavbar } from '../components/profile-navbar/profile-navbar';
import { getUserData } from '../../../shared/api/get-data-service';

import ProfileStyles from "./css/style.module.css";

export const ProfilePage = () => {
    const auth = useSelector(store => store.auth);

    // useMemo(() => {
    //     console.log(auth)
    // }, [])

    const [email, setEmail] = useState(auth.email);
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const [name, setName] = useState(auth.name);
    const inputRef = useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    // const getUser = () => {
    //     return async function (dispatch) {
    //         return getUserData().then((res) => {
    //             console.log(res);
    //             dispatch(setUser(res.user))
    //         })
    //     }
    // }

    // useEffect(() => {
    //     getUser();
    // }, [])

    return (
        <div className={ProfileStyles.pageWrapper}>
            <AppHeader />
            <main className={ProfileStyles.mainWrapper}>
                <div className={ProfileStyles.mainContainer}>
                    <ProfileNavbar />
                    <div>
                        <form className={`${ProfileStyles.profileInfo} ml-15`}>
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
                            />
                            <EmailInput
                                onChange={onChangeEmail}
                                value={email}
                                name={'email'}
                                isIcon={false}
                                // extraClass='mt-6'
                            />
                            <PasswordInput
                                onChange={onChangePassword}
                                value={password}
                                name={'password'}
                                // extraClass="mt-6"
                            />
                            <div className={ProfileStyles.buttonsWrapper}>
                                <Button htmlType="button" type="secondary" size="medium">
                                    Отмена
                                </Button>
                                <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                                    Сохранить
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}