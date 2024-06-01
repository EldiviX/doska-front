import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useReducer } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import './style.css';
import image from '../../assets/img.jpg'
import { Button, Tooltip } from '@mui/material';

export default function Ad() {
    const { id } = useParams();
    const [details, setDetails] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [error, setError] = useState(false);
    const [tooltipUserId, setTooltipUserId] = useState('Скопировать ID пользователя');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4444/ads/${id}`)
            .then((response) => {
                console.log('Данные из MongoDB:', response);
                setDetails(response.data);
                setUrlImage(`http://localhost:4444${response.data.imageUrl}`)
            })
            .catch((error) => {
                console.error('Ошибка при запросе:', error);
                setError(true);
            });
    }, []);
       
    async function handleClickDone() {
        const response = await fetch(`http://localhost:4444/ads/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...details,
                verified: true
            })
        });

        if (response.ok) {
            navigate('/moderator');
        } else {
            alert('Что-то пошло не так');
            console.log(response.error);
        }
    }

    async function handleClickRemove() {
        const response = await fetch(`http://localhost:4444/ads/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            navigate('/moderator');
        } else {
            alert('Что-то пошло не так');
            console.log(response.error);
        }
    }

    function handleCopyUserId() {
        setTooltipUserId('Скопировано');
        navigator.clipboard.writeText(details.user._id)
    }

    if (error) {
        return <div className='ad-page-error'>Объявление не найдено</div>;
    }

    if (!details) {
        return <div></div>;
    }

    return (
        <div className="container">
            <div className="ad-page">
                <div className="ad-type">{details.title}</div>
                <div className="ad-place">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {urlImage === 'http://localhost:4444' ? 
                            <div className="ad-place_box-img" style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backdropFilter: 'blur(7px)' }}>
                                <div className='box-img-filter'>
                                    <img className='box-img_img' src={image} alt="Image" />
                                </div>
                            </div>
                        :
                            <div className="ad-place_box-img" style={{backgroundImage: `url(${urlImage})`, backgroundSize: 'cover', backdropFilter: 'blur(7px)' }}>
                                <div className='box-img-filter'>
                                    {urlImage && <img className='box-img_img' src={urlImage} alt="Image" />}
                                </div>
                            </div>
                        }
                        <div className="ad-place_info">
                            <div className="ad-place_price">
                                <span className="thousands-separator">{details.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽</span>
                            </div>
                            <div className="ad-place_type">{details.type}</div>
                            <div className="ad-place_name">
                                <PersonOutlineOutlinedIcon style={{marginTop: '-2px', marginRight: '5px'}}/>
                                <div>
                                    {details.user && details.user.name ? details.user.name : ""}
                                </div>
                                
                            </div>
                            <div className="ad-place_phone">
                                <LocalPhoneOutlinedIcon style={{marginTop: '-2px', marginRight: '5px'}}/>
                                <div>
                                    +7{details.phone}
                                </div>
                            </div>
                            <div className="ad-place_location">
                                <span class="ymaps-geolink">
                                    {details.location}
                                </span>
                            </div>
                            {
                                !details.verified &&
                                <div className="ad-place-check">
                                    <Button 
                                        style={{
                                            borderTopRightRadius: '0', 
                                            borderBottomRightRadius: '0',
                                            padding: '5px 30px',
                                        }} 
                                        variant="outlined"
                                        color="success"
                                        onClick={handleClickDone}
                                    >
                                        <DoneOutlineOutlinedIcon style={{fontSize: 20}}/>
                                    </Button>
                                    <Button
                                        style={{
                                            marginLeft: '-1px',
                                            borderTopLeftRadius: '0', 
                                            borderBottomLeftRadius: '0',
                                            padding: '5px 30px',
                                        }} 
                                        variant="outlined" 
                                        color="error"
                                        onClick={handleClickRemove}
                                    >
                                        <DoNotDisturbAltOutlinedIcon style={{fontSize: 20}}/>
                                    </Button>
                                    <Tooltip title={tooltipUserId}>
                                        <button onClick={handleCopyUserId} className="ad-place-id">
                                            <InfoOutlinedIcon style={{fontSize: 22, marginLeft: '-7px', marginTop: '-2px', color: 'rgb(128, 128, 128)'}}/>
                                        </button>
                                    </Tooltip>
                                </div>
                            }
                        </div>
                    </div>
                    {details.text && (
                        <div className="ad-place_text">
                            <div className="ad-place_text-title">Описание</div>
                            <div className="ad-place_text-description">{details.text}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    )
}