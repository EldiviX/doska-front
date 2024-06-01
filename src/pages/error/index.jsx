import './style.css'
import image from '../../assets/cat.png'
import { useState } from 'react';

export default function Error() {
    const [hidden, setHidden] = useState(false);

    const handleClick = () => {
        setHidden(true);
    };

    return (
        <>
            <div className='error-page'>
                Страница не найдена
            </div>
            <div className="error-page_img">
                <img
                    style={{
                        width: 365,
                        height: 220,
                        position: 'fixed',
                        bottom: hidden ? -350 : 0,
                        left: '37%',
                        transform: 'translateX(-50%)',
                        transition: 'bottom 0.5s',
                        cursor: 'pointer'
                    }}
                    src={image}
                    alt="cat"
                    onClick={handleClick}
                />
            </div>
        </>
    );
}
