import { Outlet } from "react-router-dom";
import { useState } from 'react';
import '../../styles/style.css'
import Tabs from "../../components/tabs/Tabs.jsx";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function AdsPage() { 
    const [typeObj, setType] = useState({
        type: '',
        categoryType: ''
    });
    
    const handleChange = (newValue) => {
        setType((typeObj) => ({
            ...typeObj,
            type: newValue
        }));

    }
    return (
        <>
            <div className="container">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Tabs onSaveValue={handleChange}/>
                    <div style={{marginTop: '14px'}}>
                    <FormControl variant="outlined" size="small" sx={{ m: 1, width: 140, marginRight: '17px', marginTop: 'auto'}}>
                        <InputLabel id="select-type-label">Категория</InputLabel>
                        <Select
                            labelId="select-type-label"
                            id="select-type"
                            // size="small"
                            value={typeObj.categoryType}
                            onChange={(e) => setType((typeObj) => ({
                                ...typeObj,
                                categoryType: e.target.value
                            }))}
                            label="Категория"
                        >
                            <MenuItem value={''}><em>Нет</em></MenuItem>
                            <MenuItem value={'Без категории'}>Без категории</MenuItem>
                            <MenuItem value={'Одежда'}>Одежда</MenuItem>
                            <MenuItem value={'Недвижимость'}>Недвижимость</MenuItem>
                            <MenuItem value={'Животные'}>Животные</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                </div>
                <Outlet context={[typeObj, setType]}/>
            </ div>
        </>
    )
}