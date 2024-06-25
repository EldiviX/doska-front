import React, { useState } from 'react';
import './style.css';
import {  Button, Box } from '@mui/material';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import styles from './Login.module.scss';

export default function Help() {

    return (
        <div className="login-peper" style={{width: '400px'}}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Связаться с нами
            </Typography>
            <AlternateEmailIcon style={{ color: '#3c3c3c', fontSize: 65, marginLeft: '170px', marginBottom: '10px'}}/>
            <TextField
                className={styles.field}
                
                label="E-Mail"
                fullWidth
                
            />
            <TextField
                style={{ forcedColorAdjust: "none" }}
                className={styles.field}
                
                
                label="Сообщение"
                multiline
                rows={5}
                fullWidth
                
            />
            
            <Button size="large" variant="contained" fullWidth>
                Отправить
            </Button>
        </div>
    );
}
