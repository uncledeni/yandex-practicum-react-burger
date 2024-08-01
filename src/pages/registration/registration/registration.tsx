import React, { FC } from 'react';
import { useRef } from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { ActionBlock } from '../components/action-block/action-block';
import { register } from '../../../shared/api/get-data-service';
import { useForm } from '../../../shared/hooks/useForm';

import RegistrationStyles from "./css/style.module.css";

export const RegistrationPage: FC = () => {
    const { values, handleChange } = useForm({ email: '', password: '', name: '' });

    const inputRef = useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <main className={RegistrationStyles.pageWrapper}>
            <div className={RegistrationStyles.mainWrapper}>
                <form className={RegistrationStyles.mainContainer} onSubmit={(e) => {
                    e.preventDefault();
                    register(values)
                }}>
                    <h1 className={`${RegistrationStyles.title} text text_type_main-medium`}>Регистрация</h1>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        value={values.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
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
                        extraClass="mt-6"
                    />
                    <div className={`${RegistrationStyles.button} mt-6 mb-20`}>
                        <Button htmlType="submit" type="primary" size="large">
                            Зарегистрироваться
                        </Button>
                    </div>
                    <ActionBlock link={'/login'} title={'Уже зарегистрированы?'} linkTitle={'Войти'} />
                </form>
            </div>
        </main>
    )
}