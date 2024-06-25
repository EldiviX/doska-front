import { Button, IconButton } from '@mui/material';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import './style.css';
import logo from "../../assets/logo.png";
import { width } from '@mui/system';

export default function Header() {
    const navigate = useNavigate();

    const styleLink = {
        width: '4px',
    }

    useEffect(() => {
        localStorage.getItem('token');
    }, [])

    function handleExit() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('role')
        navigate('/');
        window.location.reload();
    }

    return (
        <div className="head">
            <div className="logo">
                <Link to="/">
                    <img style={{width: '200px', height: "auto"}} src={logo} alt="logo" />
                </Link>
            </div>
            <div className="buttons">
                <Link to="/help" style={{marginRight: 10}}>
                    <IconButton >
                        <HeadsetMicIcon />
                    </IconButton>
                </Link>
                {(!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined') ? (
                    <>
                        <Link to="/login">
                            <Button variant="outlined">Войти</Button>
                        </Link>
                        <Link to="/registration" style={{marginLeft: 10}}>
                            <Button variant="contained">Разместить объявление</Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" style={{marginRight: 10}}>
                            <Button onClick={() => handleExit()} style={{color: 'black', borderColor: 'black'}} variant="outlined">Выйти</Button>
                        </Link>
                        {
                            (localStorage.getItem('role') === 'admin') && (
                                <>
                                    <Link to="/admin" style={{marginRight: 10}}>
                                        <Button variant="contained">Админ панель</Button>
                                    </Link>
                                    <Link to="/moderator" >
                                        <Button variant="contained">Модерация</Button>
                                    </Link>
                                </>
                            )
                        }

                        {
                            (localStorage.getItem('role') === 'moderator') && (
                                <Link to="/moderator" >
                                    <Button variant="contained">Модерация</Button>
                                </Link>
                            )
                        }

                        {
                            (localStorage.getItem('role') !== 'moderator' && localStorage.getItem('role') !== 'admin') && (
                                <Link to="/create">
                                    <Button variant="contained">Разместить объявление</Button>
                                </Link>
                            )
                        }
                    </>
                )}
            </div>
        </div>
    )
}
