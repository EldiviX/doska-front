import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useOutletContext } from 'react-router-dom';


import image from '../../assets/img.jpg'
import './style.css';

export const Ads = ({_id, title, price, imageUrl, category, hendleRemoveAd}) => {
    const [isEditable, setIsEditable] = useState(false);
    const [typeObj, setType] = useOutletContext();
    
    const onClickRemove = () => {
        fetch('https://doska-ads.ru:8443/ads/' + _id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        hendleRemoveAd(_id);
    };
    useEffect(() => {
        setIsEditable(false);
    }, [typeObj]);
    
    useEffect(() => {
        if (typeObj.type === 'Мои объявления') {
            setIsEditable(true);
        }
        // const userId = localStorage.getItem('userId');
        // userId === user._id && setIsEditable(true);
    }, [typeObj])


    return (
        <div className="rootAds">
            <Link to={`/ads/${_id}`}>
                {isEditable && (
                    <div className="editButtons">
                    <Tooltip title="Редактировать">
                        <Link to={`/ads/edit/${_id}`}>
                            <IconButton style={{ width: 25, height: 25 }} color="primary">
                                <EditIcon style={{ width: 20, height: 20 }}/>
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Удалить">
                        <Link to={``}>
                            <IconButton style={{ width: 25, height: 25, marginLeft: 5 }} onClick={onClickRemove} color="error">
                                <DeleteIcon style={{ width: 25, height: 25 }} />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    </div>
                )}
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
