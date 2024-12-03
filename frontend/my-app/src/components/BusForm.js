
/*
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBus } from '../actions/busActions';
import { useAuth } from '../context/AuthContext';

const BusForm = () => {
    const { user } = useAuth(); // Assuming useAuth provides user data
    const [busData, setBusData] = useState({
        busName: '',
        busNumber: '',
        busCapacity: '',
        from: '',
        to: '',
        date:'',
        price: '',
        email: '',
        phone: '',
        duration: '',
        distance: '',
        amenities: '', // Reset amenities field as needed
        rating: '',
        arrival: '',
        departure: '',
       //seats: [],
       rows: '',  // New field for number of rows
        seatsPerRow: '',  // New field for seats per row
        operator: user?.account?._id || '' // Get operator ID from user context
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amenities') {
            // Convert comma-separated string into an array
            const amenitiesArray = value.split(',').map(ele => ele.trim());
            setBusData({
                ...busData,
                [name]: amenitiesArray
            });
        } else if (name === 'busCapacity' || name === 'distance' || name === 'phone' || name === 'rating' || name === 'rows' || name === 'seatsPerRow') {
            setBusData({
                ...busData,
                [name]: parseInt(value, 10)
            });
        } else {
            setBusData({
                ...busData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(busData);
        dispatch(addBus(busData));
        setBusData({
            busName: '',
            busNumber: '',
            busCapacity: '',
            from: '',
            to: '',
            date:'',
            price: '',
            email: '',
            phone: '',
            duration: '',
            distance: '',
            amenities: '', // Reset amenities field as needed
            rating: '',
            arrival: '',
            departure: '',
            rows: '',  // New field for number of rows
            seatsPerRow: '',  // New field for seats per row
            //seats: [],
            operator: user?.account?._id || ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="busName" placeholder="Bus Name" value={busData.busName} onChange={handleChange} required />
            <br/>
            <input type="text" name="busNumber" placeholder="Bus Number" value={busData.busNumber} onChange={handleChange} required />
            <br/>
            <input type="number" name="busCapacity" placeholder="Bus Capacity" value={busData.busCapacity} onChange={handleChange} required />
            <br/>
            <input type="text" name="from" placeholder="From" value={busData.from} onChange={handleChange} required />
            <br/>
            <input type="text" name="to" placeholder="To" value={busData.to} onChange={handleChange} required />
            <br/>
            <input type="date" name="date" placeholder="Date" value={busData.date} onChange={handleChange} required />
            <br/>
            <input type="text" name="price" placeholder="Price" value={busData.price} onChange={handleChange} required />
            <br/>
            <input type="email" name="email" placeholder="Email" value={busData.email} onChange={handleChange} required />
            <br/>
            <input type="tel" name="phone" placeholder="Phone" value={busData.phone} onChange={handleChange} required />
            <br/>
            <input type="text" name="duration" placeholder="Duration" value={busData.duration} onChange={handleChange} required />
            <br/>
            <input type="number" name="distance" placeholder="Distance" value={busData.distance} onChange={handleChange} required />
            <br/>
            <input type="text" name="amenities" placeholder="Amenities (comma-separated)" value={busData.amenities} onChange={handleChange} />
            <br/>
            <input type="number" name="rating" placeholder="Rating" value={busData.rating} onChange={handleChange} required />
            <br/>
            <input type="text" name="arrival" placeholder="Arrival" value={busData.arrival} onChange={handleChange} required />
            <br/>
            <input type="text" name="departure" placeholder="Departure" value={busData.departure} onChange={handleChange} required />
            <br/>
            <input type="number" name="rows" placeholder="Number of Rows" value={busData.rows} onChange={handleChange} required />
            <br/>
            <input type="number" name="seatsPerRow" placeholder="Seats per Row" value={busData.seatsPerRow} onChange={handleChange} required />
            <br/>
            <button type="submit">Add Bus</button>
        </form>
    );
};

export default BusForm;




import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBus } from '../actions/busActions';
import { useAuth } from '../context/AuthContext';

const BusForm = () => {
    const { user } = useAuth(); // Assuming useAuth provides user data
    const [busData, setBusData] = useState({
        busName: '',
        busNumber: '',
        busCapacity: '',
        from: '',
        to: '',
        date:'',
        price: '',
        email: '',
        phone: '',
        duration: '',
        distance: '',
        amenities: '', // Reset amenities field as needed
        rating: '',
        arrival: '',
        departure: '',
        rows: '',  // New field for number of rows
        seatsPerRow: '',  // New field for seats per row
        operator: user?.account?._id || '' // Get operator ID from user context
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amenities') {
            // Convert comma-separated string into an array
            const amenitiesArray = value.split(',').map(ele => ele.trim());
            setBusData({
                ...busData,
                [name]: amenitiesArray
            });
        } else if (name === 'busCapacity' || name === 'distance' || name === 'phone' || name === 'rating' || name === 'rows' || name === 'seatsPerRow') {
            setBusData({
                ...busData,
                [name]: parseInt(value, 10)
            });
        } else {
            setBusData({
                ...busData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(busData);
        dispatch(addBus(busData));
        setBusData({
            busName: '',
            busNumber: '',
            busCapacity: '',
            from: '',
            to: '',
            date:'',
            price: '',
            email: '',
            phone: '',
            duration: '',
            distance: '',
            amenities: '', // Reset amenities field as needed
            rating: '',
            arrival: '',
            departure: '',
            rows: '',  // New field for number of rows
            seatsPerRow: '',  // New field for seats per row
            operator: user?.account?._id || ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="busName" placeholder="Bus Name" value={busData.busName} onChange={handleChange} required />
            <br/>
            <input type="text" name="busNumber" placeholder="Bus Number" value={busData.busNumber} onChange={handleChange} required />
            <br/>
            <input type="number" name="busCapacity" placeholder="Bus Capacity" value={busData.busCapacity} onChange={handleChange} required />
            <br/>
            <input type="text" name="from" placeholder="From" value={busData.from} onChange={handleChange} required />
            <br/>
            <input type="text" name="to" placeholder="To" value={busData.to} onChange={handleChange} required />
            <br/>
            <input type="date" name="date" placeholder="Date" value={busData.date} onChange={handleChange} required />
            <br/>
            <input type="number" name="price" placeholder="Price" value={busData.price} onChange={handleChange} required />
            <br/>
            <input type="email" name="email" placeholder="Email" value={busData.email} onChange={handleChange} required />
            <br/>
            <input type="tel" name="phone" placeholder="Phone" value={busData.phone} onChange={handleChange} required />
            <br/>
            <input type="text" name="duration" placeholder="Duration" value={busData.duration} onChange={handleChange} required />
            <br/>
            <input type="number" name="distance" placeholder="Distance" value={busData.distance} onChange={handleChange} required />
            <br/>
            <input type="text" name="amenities" placeholder="Amenities (comma-separated)" value={busData.amenities} onChange={handleChange} />
            <br/>
            <input type="number" name="rating" placeholder="Rating" value={busData.rating} onChange={handleChange} required />
            <br/>
            <input type="text" name="arrival" placeholder="Arrival" value={busData.arrival} onChange={handleChange} required />
            <br/>
            <input type="text" name="departure" placeholder="Departure" value={busData.departure} onChange={handleChange} required />
            <br/>
            <input type="number" name="rows" placeholder="Number of Rows" value={busData.rows} onChange={handleChange} required />
            <br/>
            <input type="number" name="seatsPerRow" placeholder="Seats per Row" value={busData.seatsPerRow} onChange={handleChange} required />
            <br/>
            <button type="submit">Add Bus</button>
        </form>
    );
};

export default BusForm;
*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBus } from '../actions/busActions';
import { useAuth } from '../context/AuthContext';  // Assuming user authentication is managed in the context

const BusForm = () => {
    const { user } = useAuth(); // Get the logged-in operator details
    const [busData, setBusData] = useState({
        busName: '',
        busNumber: '',
        busCapacity: '',
        email: user?.email || '',  // Automatically populate the operator's email
        phone: '',
        amenities: '',  // Comma-separated amenities
        rating: '',
        rows: '',  // Number of rows in the bus
        seatsPerRow: '',  // Number of seats per row
        operator: user?.account?._id || '' // Operator ID from the user context
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amenities') {
            // Convert comma-separated string into an array
            const amenitiesArray = value.split(',').map(amenity => amenity.trim());
            setBusData({
                ...busData,
                [name]: amenitiesArray
            });
        } else if (name === 'busCapacity' || name === 'phone' || name === 'rating' || name === 'rows' || name === 'seatsPerRow') {
            setBusData({
                ...busData,
                [name]: parseInt(value, 10)  // Convert to integer where applicable
            });
        } else {
            setBusData({
                ...busData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(busData);
        dispatch(addBus(busData)); // Dispatch action to add bus

        // Reset the form
        setBusData({
            busName: '',
            busNumber: '',
            busCapacity: '',
            email: user?.email || '',
            phone: '',
            amenities: '',
            rating: '',
            rows: '',
            seatsPerRow: '',
            operator: user?.account?._id || ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="busName" placeholder="Bus Name" value={busData.busName} onChange={handleChange} required />
            <br />
            <input type="text" name="busNumber" placeholder="Bus Number" value={busData.busNumber} onChange={handleChange} required />
            <br />
            <input type="number" name="busCapacity" placeholder="Bus Capacity" value={busData.busCapacity} onChange={handleChange} required />
            <br />
            <input type="tel" name="phone" placeholder="Phone" value={busData.phone} onChange={handleChange} required />
            <br />
            <input type="text" name="amenities" placeholder="Amenities (comma-separated)" value={busData.amenities} onChange={handleChange} />
            <br />
            <input type="number" name="rating" placeholder="Rating" value={busData.rating} onChange={handleChange} required />
            <br />
            <input type="number" name="rows" placeholder="Number of Rows" value={busData.rows} onChange={handleChange} required />
            <br />
            <input type="number" name="seatsPerRow" placeholder="Seats per Row" value={busData.seatsPerRow} onChange={handleChange} required />
            <br />
            <button type="submit">Add Bus</button>
        </form>
    );
};

export default BusForm;
