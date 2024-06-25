import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.scss";
import './style.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigateTo = useNavigate();

    const loginUser = async () => {
        try {
            const response = await fetch('https://doska-ads.ru:8443/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // "access-control-allow-origin": "*",
                    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    // 'Access-Control-Allow-Methods': '*',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(response);
                setErrorMessage('');
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('role', responseData.role);
                navigateTo('/');
                function parseJwt(token) {
                    let base64Url = token.split('.')[1];
                    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                
                    return JSON.parse(jsonPayload);
                }
                
                let token = localStorage.getItem('token');
                if (token) {
                    let decodedToken = parseJwt(token);
                    localStorage.setItem('userId', decodedToken._id);
                }
                window.location.reload();
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessage(responseData[0].msg);

                console.log('Ответ от сервера:', responseData[0].msg);
            } else if (response.status === 500 || response.status === 404) {
                const responseData = await response.json();
                setErrorMessage(responseData.message);

                console.log('Ответ от сервера:', responseData.message);
            }

        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };


    return (
        <div className="login-peper">
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход в аккаунт
            </Typography>
            <TextField
                className={styles.field}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="E-Mail"
                fullWidth
                error={email === '' && errorMessage !== ''}
                helperText={email === '' && errorMessage !== '' ? 'Это поле обязательно' : ''}
            />
            <TextField
                style={{ forcedColorAdjust: "none" }}
                className={styles.field}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="Пароль"
                type="password"
                fullWidth
                error={password === '' && errorMessage !== ''}
                helperText={password === '' && errorMessage !== '' ? 'Это поле обязательно' : ''}
            />
            {errorMessage && <div style={{ color: '#d32f2f', fontFamily: 'Arial', fontSize: '14px', marginBottom: '10px', marginTop: '-10px'}}>{errorMessage}</div>}
            <Button onClick={() => loginUser()} size="large" variant="contained" fullWidth>
                Войти
            </Button>
        </div>
    );
};