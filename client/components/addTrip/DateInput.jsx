import {Stack, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import React, { useState} from 'react';
import InputLabel from '@mui/material/InputLabel';

function DateInput () {
    const [selectedDate, setSelectedDate] = useState('')

    return (
        <Stack spacing = {4} sx= {{width: '242px' }} 
        >

            <DatePicker                   
             
             sx= {{border:'2px solid #000' }}
            label= 'Start Date' 
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