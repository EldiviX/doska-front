import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function BasicTabs({ onSaveValue }) {
    const [value, setValue] = React.useState('Новые');
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        onSaveValue(newValue);
    };

    return (
        <Box sx={{ width: '558px', marginTop: '10px', marginBottom: '10px' }}>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Новые" value="Новые"/>
                    <Tab label="Продажа" value="Продажа"/>
                    <Tab label="Покупка" value="Покупка"/>
                    <Tab label="Услуга" value="Услуга"/>
                    <Tab label="Мои объявления" value="Мои объявления"/>
                </Tabs>
            </Box>
        </ Box>
    );
}