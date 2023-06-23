import React from 'react';
import { useSignUp } from '../../hooks/auth/useSignUp';

export const useSignUpScreen = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordForConfirmation, setPasswordForConfirmation] =
        React.useState('');

    const { mutate: signUp } = useSignUp();

    const handleEmailChange = (email: string) => setEmail(email);
    const handlePasswordChange = (password: string) => setPassword(password);
    const handlePasswordForConfirmation = (password: string) =>
        setPasswordForConfirmation(password);

    // TODO: フォームのエラーハンドリングを実装
    const handleCreateAccount = () => {
        console.log('hello');
        if (!email || !password || !passwordForConfirmation) return;
        if (password !== passwordForConfirmation) return;
        signUp(
            { email, password },
            {
                onError: (error) => console.log(error),
            }
        );
    };

    return {
        handleEmailChange,
        handlePasswordChange,
        handlePasswordForConfirmation,
        handleCreateAccount,

        email,
        password,
        passwordForConfirmation,
    };
};
