import React from 'react';
import { useRef, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { ProfileNavbar } from '../components/profile-navbar/profile-navbar';
import { patchUserData } from '../../../shared/api/get-data-service';
import { useForm, useTypedSelector } from '../../../shared/hooks';
import { deepEqual } from '../../../shared/utils';

import ProfileStyles from "./css/style.module.css";
import { IUserData } from '../../../shared/types/types';

export const ProfilePage = () => {
    const auth = useTypedSelector(store => store.auth);
    const [isEditable, setIsEditable] = useState(false);
    const { values, handleChange, setValues } = useForm<IUserData>({ name: auth.name, email: auth.email, password: '' });

    const setDefaultValues = () => {
        setValues({ name: auth.name, email: auth.email, password: '',  });
        onIconClick();
    }

    const inputRef = useRef(null)
    const onIconClick = () => {
        setIsEditable(prevState => !prevState);
    }

    return (
        <main className={ProfileStyles.pageWrapper}>
            <div className={ProfileStyles.mainWrapper}>
                <div className={ProfileStyles.mainContainer}>
                    <ProfileNavbar />
                    <div>
                        <form className={`${ProfileStyles.profileInfo}`} onSubmit={(e) => {
                            e.preventDefault()
                            patchUserData(values);
                            onIconClick();
                        }}>
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={handleChange}
                                value={values.name}
                                name={'name'}
                                error={false}
                                ref={inputRef}
                                disabled={(!isEditable)}
                                icon={'EditIcon'}
                                onIconClick={onIconClick}
                                errorText={'Ошибка'}
                                size={'default'}
                                data-testid='name'
                            />
                            <EmailInput
                                onChange={handleChange}
                                value={values.email}
                                name={'email'}
                                isIcon={true}
                            />
                            <PasswordInput
                                onChange={handleChange}
                                value={values.password}
                                name={'password'}
                                icon={'EditIcon'}
                            />
                            {(!deepEqual(values, {name: auth.name, email: auth.email, password: ''})) && <div className={ProfileStyles.buttonsWrapper}>
                                <Button htmlType="button" type="secondary" size="medium" onClick={setDefaultValues}>Отмена</Button>
                                <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">Сохранить</Button>
                            </div>}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}