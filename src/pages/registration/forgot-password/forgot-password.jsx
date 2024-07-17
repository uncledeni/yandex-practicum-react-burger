import { useState } from 'react';
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../../../widgets/app-header";
import { ActionBlock } from '../components/action-block/action-block';
import ForgotPasswordStyles from "./css/style.module.css";
import { requestResetCode } from '../../../shared/api/get-data-service';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const goToResetPage = async (email) => {
        try {
            const res = await requestResetCode(email);
            if (res.success) {
                navigate('/reset-password');
            }
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className={ForgotPasswordStyles.pageWrapper}>
            <AppHeader />
            <main className={ForgotPasswordStyles.mainWrapper}>
                <div className={ForgotPasswordStyles.mainContainer}>
                    <h1 className={`${ForgotPasswordStyles.title} text text_type_main-medium`}>Восстановление пароля</h1>
                    <EmailInput
                        onChange={onChangeEmail}
                        value={email}
                        name={'email'}
                        isIcon={false}
                        extraClass='mt-6'
                    />
                    <div className={`${ForgotPasswordStyles.button} mt-6 mb-20`}>
                        <Button htmlType="button" type="primary" size="large" onClick={() => goToResetPage(email)}>
                            Восстановить
                        </Button>
                    </div>
                    <ActionBlock link={'/login'} title={'Вспомнили пароль?'} linkTitle={'Войти'} />
                </div>
            </main>
        </div>
    )
}