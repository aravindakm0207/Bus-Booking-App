import React from 'react';
import { useNavigate } from 'react-router-dom';


const FailurePage = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/payment'); // Redirect to the payment page or retry logic
    };

    return (
        <div className="failure-container">
            <h1>Payment Failed 😔</h1>
            <p>Something went wrong during the payment process. Please try again.</p>
            <button onClick={handleRetry} className="retry-button">
                Retry Payment
            </button>
        </div>
    );
};

export default FailurePage;
