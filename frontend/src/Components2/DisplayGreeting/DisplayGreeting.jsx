import './DisplayGreeting.css'

import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DisplayGreeting.css';

function DisplayGreeting() {
    const [greeting, setGreeting] = useState(null);
    const [loading, setLoading] = useState(true);
    const { uniqueUrl } = useParams();

    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/greeting/${uniqueUrl}`);
                setGreeting(response.data);
            } catch (error) {
                console.error('Error fetching greeting:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGreeting();
    }, [uniqueUrl]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!greeting) {
        return <div className="not-found">Greeting not found</div>;
    }

    return (
        <div className="greeting-container">
            <div className="greeting-card">
            <div className="greeting-message">
                    <p>{greeting.message}</p>
                </div>
                <img 
                    src={`http://localhost:5000${greeting.imageUrl}`} 
                    alt="User" 
                    className="greeting-image"
                />
            </div>
        </div>
    );
}

export default DisplayGreeting;



