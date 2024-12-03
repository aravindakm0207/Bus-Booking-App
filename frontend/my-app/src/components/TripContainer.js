import React from 'react';
import TripForm from './TripForm';
import TripList from './TripList';


const TripContainer = () => {
    return (
        <div>
            <h1>Bus Management</h1>
            <TripForm />
            <TripList />
            
           
        </div>
    );
};

export default TripContainer;
