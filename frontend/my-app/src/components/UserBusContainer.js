import React from 'react';
import BusDashboard from './UserDashboard';
//import TripList from './TripList';
import UserBusList from './UserBusList'


const UserBusContainer = () => {
    return (
        <div>
            <h1>Bus Management</h1>
            <BusDashboard />
            <UserBusList />
        </div>
    );
};

export default UserBusContainer;
