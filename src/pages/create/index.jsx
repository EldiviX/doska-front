import '../../styles/style.css';
import './style.css';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import image from '../../assets/img.jpg'
import axios from 'axios'

export default function Create() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('Без категории');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('')

    const navigateTo = useNavigate();
    const token = localStorage.getItem('token')

    const createAds = async () => {
        try {
            console.log('@'+imageUrl);
            const response = await fetch('https://doska-ads.ru:8443/ads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "title": title,
                    "text": text,
                    "category": category,
                    "price": price,
                    "phone": phone,
                    "type": type,
                    "location": location,
                    "imageUrl": imageUrl,
                    "verified": false
                })
            });

            const data = {
                "title": title,
                "text": text,
                "category": category,
                "price": price,
                "phone": phone,
                "type": type,
                "location": location,
                "imageUrl": imageUrl
            };

            const jsonData = JSON.stringify(data);
            console.log('Отправляемые данные!!!!!!!!!!!:', jsonData);

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setErrorMessage('');

                navigateTo('/');
                alert('Отправлено на проверку');
            } else if (response.status === 400) {
                const responseData = await response.json();
                setErrorMessage(responseData[0].msg);

                console.log('Ответ от сервера:', responseData[0].msg);
            } else if (response.status === 500 || response.status === 404 || response.status === 403) {
                const responseData = await response.json();
                setErrorMessage(responseData.message);

                console.log('Ответ от сервера:', responseData.message);
            }

        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('https://doska-ads.ru:8443/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log(data.url);
            setImageUrl(data.url);
;
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container" style={{flexDirection: "row"}}>
            <div className="create">
                <div className="create-cont">

                    <div className="create-title">Создание объявления</div>
                    <div className="create-line">
                        <div className="create-label">Название товара</div>
                        <TextField 
                            className='create-input'
                            maxLength={50}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            inputProps={{
                                style: { paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', width: '535px' },
                            }}
                        />
                    </div>
                    <div className="create-line">
                        <label className="create-label">Категория</label>
                        <Select
                            style={{width: '160px'}}
                            labelId="select-type"
                            id="select-type"
                            size='small'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value={'Без категории'}>❌ Без категории</MenuItem>
                            <MenuItem value={'Недвижимость'}>🏠 Недвижимость</MenuItem>
                            <MenuItem value={'Вакансии'}>💼 Вакансии</MenuItem>
                            <MenuItem value={'Животные'}>🐶 Животные</MenuItem>
                            <MenuItem value={'Электроника'}>💻 Электроника</MenuItem>
                            <MenuItem value={'Одежда и аксессуары'}>👕 Одежда и аксессуары</MenuItem>
                            <MenuItem value={'Ювелирные изделия и часы'}>⌚ Ювелирные изделия и часы</MenuItem>
                            <MenuItem value={'Медиа и развлечения'}>🎬 Медиа и развлечения</MenuItem>
                            <MenuItem value={'Товары для детей'}>👶 Товары для детей</MenuItem>
                            <MenuItem value={'Книги и канцелярия'}>📚 Книги и канцелярия</MenuItem>
                            <MenuItem value={'Строительство и ремонт'}>🛠️ Строительство и ремонт</MenuItem>
                            <MenuItem value={'Авто и мото'}>🚗 Авто и мото</MenuItem>
                            <MenuItem value={'Продукты питания'}>🍎 Продукты питания</MenuItem>
                        </Select>
                    </div>
                    <div className="create-line">
                        <label className="create-label">Тип</label>
                        <Select
                            style={{width: '120px'}}
                            labelId="select-type"
                            id="select-type"
                            size='small'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value={'Продажа'}>Продажа</MenuItem>
                            <MenuItem value={'Покупка'}>Покупка</MenuItem>
                            <MenuItem value={'Услуга'}>Услуга</MenuItem>
                        </Select>
                    </div>
                    <div className="create-line" style={{alignItems: 'start'}}>
                        <label className="create-label" style={{marginTop: '5px'}}>Описание</label>
                        <textarea value={text} onChange={(e) => setText(e.target.value)} className="create-text" id="d" maxlength="3000" rows="10" haserror="false"></textarea>
                    </div>
                    <div className="create-line">
                        <label className="create-label">Цена</label>
                        <TextField 
                            className='create-input'
                            maxLength={50}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            inputProps={{
                                style: { paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', width: '120px' },
                            }}
                        />
                        <div style={{marginLeft: '5px', color: "#333333"}}>₽</div>
                    </div>
                    <div className="create-line">
                        <label className="create-label">Телефон</label>
                        <div style={{color: "#333333", marginRight: '3px'}}>+7</div>
                        <TextField 
                            className='create-input'
                            maxLength={50}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            inputProps={{
                                style: { paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', width: '93px', paddingLeft: '2px',  maxLength: 10 },
                            }}
                        />
                    </div>
                    <div className="create-line">
                        <label className="create-label">Населённый пункт</label>
                        <TextField 
                            className='create-input'
                            maxLength={50}
                            multiple
                            rows={10}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            inputProps={{
                                style: { paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', width: '250px',  maxLength: 10 },
                            }}
                        />
                    </div>
                    <div className="create-line" style={{marginBottom: '0px'}}>
                        <label className="create-label"></label>
                        {errorMessage && <div style={{ color: '#d32f2f', fontFamily: 'Arial', fontSize: '14px', marginBottom: '10px', marginTop: '-10px'}}>{errorMessage}</div>}
                    </div> 

                    <div className="create-line" style={{marginBottom: '0px'}}>
                        <label className="create-label"></label>
                        <Button onClick={() => createAds()} variant="contained">Отправить</Button>
                    </div>
                </div>
                <div className='create-mini'>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleChangeFile}
                    />
                    <div style={{position: 'absolute', width: '300px', height: '210px', margin: '0 auto', borderRadius: '8px' }}>
                    <img src={imageUrl ? `https://doska-ads.ru:8443${imageUrl}` : image}  style={{width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {/* <img id="uploaded-image" src="#" alt="Uploaded Image" style={{zIndex:'5', position: 'absolute', width: '300px', height: '210px', margin: '0 auto', borderRadius: '8px' }} /> */}
                    <label htmlFor="raised-button-file" style={{width: '180px', margin: '0 auto', marginTop: '215px'}}>
                        <Button variant="text" component="span">
                            Загрузить картинку
                        </Button>
                    </label>
                </div>
            </div>
        </div>
    )
}