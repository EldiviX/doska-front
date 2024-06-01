import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

import { useState} from 'react';

import styles from './Login.module.scss';
import '../login/style.css';

export default function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigateTo = useNavigate();

    const registerUser = async () => {
        try {
            const response = await fetch('http://localhost:4444/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "name": name,
                    "password": password,
                    "role": "user",
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Пользователь зарегистрирован успешно!');
                setErrorMessage('');

                localStorage.setItem('token', responseData.token);
                localStorage.setItem('role', 'user');

                console.log(localStorage.getItem('token'))

                navigateTo('/');
                window.location.reload();
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessage(responseData[0].msg);

                console.log('Ответ от сервера:', responseData[0].msg);
            }  else if (response.status === 500) {
                const responseData = await response.json();
                setErrorMessage(responseData.message);

                console.log('Ответ от сервера:', responseData.message);
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };


    return (
        <Paper className='login-peper'>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar style={{ width: 70, height: 70}} />
            </div>
            <TextField
                className={styles.field}
                onChange={(e) => setName(e.target.value)}
                label="Полное имя"
                fullWidth
                value={name}
                error={name === '' && errorMessage !== ''}
                helperText={name === '' && errorMessage !== '' ? 'Это поле обязательно' : ''}
            />
            <TextField 
                className={styles.field}
                onChange={(e) => setEmail(e.target.value)}
                label="E-Mail"
                fullWidth
                value={email}
                error={email === '' && errorMessage !== ''}
                helperText={email === '' && errorMessage !== '' ? 'Это поле обязательно' : ''}
            />
            <TextField className={styles.field}
                onChange={(e) => setPassword(e.target.value)}
                label="Пароль"
                fullWidth
                value={password}
                error={password === '' && errorMessage !== ''}
                helperText={password === '' && errorMessage !== '' ? 'Это поле обязательно' : ''}
            />
            {errorMessage && <div style={{ color: '#d32f2f', fontFamily: 'Arial', fontSize: '14px', marginBottom: '10px', marginTop: '-10px'}}>{errorMessage}</div>}
            <Button onClick={() => registerUser()}  size="large" variant="contained" fullWidth>
                Зарегистрироваться
            </Button>
        </Paper>
    );
};
