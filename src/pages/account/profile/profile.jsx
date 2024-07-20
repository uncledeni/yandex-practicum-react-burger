import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../../../widgets/app-header";
import { ProfileNavbar } from '../components/profile-navbar/profile-navbar';
import { getUserData, patchUserData } from '../../../shared/api/get-data-service';

import ProfileStyles from "./css/style.module.css";

export const ProfilePage = () => {
    const auth = useSelector(store => store.auth);
    const [isEditable, setIsEditable] = useState(false)

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
        setIsEditable(prevState => !prevState)
    }

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
                                disabled={(!isEditable)}
                                icon={'EditIcon'}
                                onIconClick={onIconClick}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                            <EmailInput
                                onChange={onChangeEmail}
                                value={email}
                                name={'email'}
                                isIcon={false}
                                disabled={(!isEditable)}
                                icon={'EditIcon'}
                                onIconClick={onIconClick}
                            />
                            <PasswordInput
                                onChange={onChangePassword}
                                value={password}
                                name={'password'}
                                disabled={(!isEditable)}
                                icon={'EditIcon'}
                                onIconClick={onIconClick}
                            />
                            {(isEditable) && <div className={ProfileStyles.buttonsWrapper}>
                                <Button htmlType="button" type="secondary" size="medium">
                                    Отмена
                                </Button>
                                <Button htmlType="button" type="primary" size="medium" extraClass="ml-2"
                                    onClick={() => {
                                        patchUserData(email, password, name);
                                        onIconClick();
                                    }}
                                >
                                    Сохранить
                                </Button>
                            </div>}
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}