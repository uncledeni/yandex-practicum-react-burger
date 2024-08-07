import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { ProfileNavbar } from '../components/profile-navbar/profile-navbar';
import { patchUserData } from '../../../shared/api/get-data-service';
import { useForm } from '../../../shared/hooks/useForm';

import ProfileStyles from "./css/style.module.css";

export const ProfilePage = () => {
    const auth = useSelector(store => store.auth);
    const [isEditable, setIsEditable] = useState(false);
    const { values, handleChange, setValues } = useForm({ name: auth.name, email: auth.email, password: '',  });

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
                        <form className={`${ProfileStyles.profileInfo} ml-15`} onSubmit={(e) => {
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
                            />
                            <EmailInput
                                onChange={handleChange}
                                value={values.email}
                                name={'email'}
                                isIcon={false}
                                disabled={(!isEditable)}
                                icon={'EditIcon'}
                                onIconClick={onIconClick}
                            />
                            <PasswordInput
                                onChange={handleChange}
                                value={values.password}
                                name={'password'}
                                disabled={(!isEditable)}
                                icon={'EditIcon'}
                                onIconClick={onIconClick}
                            />
                            {(isEditable) && <div className={ProfileStyles.buttonsWrapper}>
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