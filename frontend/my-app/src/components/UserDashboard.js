/*
// components/BusDashboard.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBuses } from '../actions/busActions';
import BusList from './BusList';
//import SeatSelection from  './SeatSelections'

export default function BusDashboard() {
    const [form, setForm] = useState({
        from: '',
        to: '',
        date: '',
    });

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchBuses(form));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="from">From </label>
                <input
                    type="text"
                    id="from"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="to">To </label>
                <input
                    type="text"
                    id="to"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                />
                <br />
                <br />
                <input type="Submit" value="Search Buses" />
            </form>
            <BusList />
            
        </div>
    );
}
*/
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchTrips } from '../actions/tripActions';



export default function BusDashboard() {
    const [form, setForm] = useState({
        from: '',
        to: '',
        date: '',
    });

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchTrips(form)); // Dispatch the search action with form data
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="from">From </label>
                <input
                    type="text"
                    id="from"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="to">To </label>
                <input
                    type="text"
                    id="to"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                />
                <br />
                <br />
                <input type="submit" value="Search Buses" />
            </form>
            
        </div>
    );
}
