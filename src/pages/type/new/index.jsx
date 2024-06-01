import { Ads } from "../../../components/ads/index";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from 'react';

import axios from 'axios';
import './style.css'

export default function New() {
    const [typeObj, setType] = useOutletContext();
    const { type, categoryType } = typeObj;
    const [ads, setAds] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const userId = localStorage.getItem('userId');

    function hendleRemoveAd(newValue) {
        const filtered = ads.filter(item => item._id !== newValue);
        setAds(filtered);
    }

    useEffect(() => {
        axios.get('http://localhost:4444/ads/')
            .then((response) => {
                console.log('Данные из MongoDB:', response.data);
                setAds(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при запросе:', error);
            });
        }, []);

    useEffect(() => {
        if (type === 'Покупка') {
            const filtered = ads.filter(item => item.type === type);
            setFilteredItems(filtered);
            return;
        }
        if (type === 'Продажа') {
            const filtered = ads.filter(item => item.type === type);
            setFilteredItems(filtered);
            return;
        }
        if (type === 'Услуга') {
            const filtered = ads.filter(item => item.type === type);
            setFilteredItems(filtered);  
            return;
        }
        if (type === 'Мои объявления') {
            const filtered = ads.filter(item => item.user._id === userId);
            setFilteredItems(filtered);  
            return;
        }
        else {
            setFilteredItems(ads);
            return;
        }
    }, [ads, type, userId]);

    useEffect(() => {
        let filtered = ads;

        if (type === 'Покупка' || type === 'Продажа' || type === 'Услуга') {
            filtered = filtered.filter(item => item.type === type);
        } else if (type === 'Мои объявления') {
            filtered = filtered.filter(item => item.user._id === userId);
        } else if (type === 'Новые') {
            filtered = ads;
        }

        if (categoryType) {
            filtered = filtered.filter(item => item.category === categoryType);
        }

        setFilteredItems(filtered);
    }, [ads, type, categoryType, userId]);
    
    return (
        <>
            <div className="page">
                {filteredItems.map((ad) => {
                    return ad.verified  && <Ads key={ad._id} {...ad} hendleRemoveAd={() => hendleRemoveAd(ad._id)}/>
                })}
            </div>
        </>
    )
}