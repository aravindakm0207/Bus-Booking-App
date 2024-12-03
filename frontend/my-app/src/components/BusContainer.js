import React from 'react';
import BusForm from './BusForm';
import BusList from './BusList';

const BusContainer = () => {
    return (
        <div>
            <h1>Bus Management</h1>
            <BusForm />
            <BusList />
        </div>
    );
};

export default BusContainer;
