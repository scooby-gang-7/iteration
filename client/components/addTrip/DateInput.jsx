import {Stack, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import React, { useState} from 'react';

function DateInput () {
    const [selectedDate, setSelectedDate] = useState('')

    return (
        <Stack spacing = {4} sx= {{width: '250px'}}>
            <DatePicker
            
            label= 'Date'
            value={selectedDate}
            renderInput={(params) => <TextField {...params} />}
           
            onChange={(newValue) => {
                setSelectedDate(newValue)
            }}
            
            />
        </Stack>
    )
}

export default DateInput;