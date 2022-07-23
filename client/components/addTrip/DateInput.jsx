import {Stack, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import React, { useState} from 'react';
import InputLabel from '@mui/material/InputLabel';

function DateInput (props) {
    const [selectedDate, setSelectedDate] = useState('')

    return (
        <Stack spacing = {4} sx= {{width: '242px' }} 
        >

            <DatePicker                   
             
            sx= {{border:'2px solid #808080' }}
            value={selectedDate || null}
            renderInput={(params) => <TextField {...params} />}
            onChange={(newValue) => {
                setSelectedDate(newValue)
            
            }}
            label={props.label}
            
            />
        </Stack>
    )
}

export default DateInput;