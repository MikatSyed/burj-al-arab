import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from './../../App';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import DatePicker from '@mui/lab/DatePicker';
import { Button } from '@mui/material';
import './Book.css'
import Bookings from './../Bookings';


const Book = () => {
  const [selectedDate, setSelectedDate] = useState(
    {
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckInDate = (date) => {
      const newDates = { ...selectedDate }
      newDates.checkIn = date;
      setSelectedDate(newDates);
  };
  
  const handleCheckOutDate = (date) => {
    const newDates = { ...selectedDate }
    newDates.checkOut = date;
    setSelectedDate(newDates);
};

    const[loggedInUser,setLoggedInUser] = useContext(userContext)
    const {bedType} = useParams()

    const handleBooking = () => {
      const newBookings = {...loggedInUser,...selectedDate};
      fetch('http://localhost:4700/addBooking',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newBookings)
    })
    .then(res => res.json())
    .then(data=>{
      console.log(data);
    })
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Check In"
        value={selectedDate.checkIn}
        onChange={handleCheckInDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
 
    <span>to</span>
 
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Check Out"
        value={selectedDate.checkOut}
        onChange={handleCheckOutDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

            </div>
    <div className="button">
    <Button  onClick={handleBooking} variant="contained" color="primary">Book Now</Button>
    </div>
    <Bookings/>
        </div>
    );
};

export default Book;
