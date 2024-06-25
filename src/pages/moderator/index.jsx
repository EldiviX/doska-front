import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import image from '../../assets/img.jpg'
import './style.css';


export default function Moderator() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios.get('https://doska-ads.ru:8443/ads')
            .then((response) => {
                console.log('Данные из MongoDB:', response.data);
                setAds(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при запросе:', error);
            });
    }, []);

    const unverifiedAds = ads.filter(ad => !ad.verified);
    const unverifieLength = unverifiedAds.length === 0;

    if (ads.length === 0) {
        return <div></div>
    }

    return (
        <div className="container">
            {!unverifieLength && <div className="mod-page_title">Модерация</div>}
            <div className="mod-page">
                {unverifieLength ? (
                    <div className="mod-page-info">
                        Нет объявлений для проверки
                    </div>
                ) : (
                    unverifiedAds.map((ad, index) => (
                        <Ads key={index} {...ad} />
                    ))
                )}
            </div>
        </div>
    )
}


const Ads = ({_id, title, price, imageUrl}) => {
    return (
        <div className="rootAds">
            <Link to={`/ads/${_id}`}>
                {imageUrl ? (
                    <div className="image-box">
                        <img
                        className="image"
                        src={'https://doska-ads.ru:8443' + imageUrl}
                        alt={title}
                        />
                    </div>
                ) : (
                    <div className="image-box">
                        <img
                            className="image"
                            src={image}
                            alt={title}
                        />
                    </div>
                )}
                <div className="block">
                    <div className="info">
                        <div className="price">{price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}  ₽</div>
                        <div className="title" title={title}>
                            {title.length > 20 ? title.slice(0, 19) + '...' : title}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
