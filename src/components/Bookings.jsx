import React, { useContext, useEffect, useState } from 'react';
import { userContext } from './../App';

const Bookings = () => {
    const[bookings,setBookings] = useState([])
    const[loggedInUser,setLoggedInUser] = useContext(userContext)
    useEffect(()=>{
      fetch('http://localhost:4700/bookings?email='+loggedInUser.email,{
          method: 'GET',
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(data => setBookings(data))
    },[])
    return (
        <div>
            <h3>You have {bookings.length} bookings</h3>
            {
                bookings.map(book => <li key={book._id}>{book.name} from: {new Date(book.checkIn).toDateString('dd/mm/yyyy')} to: {new Date(book.checkOut).toDateString('dd/mm/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;