import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/OnlineReadings.css'; // Make sure this stylesheet exists

function OnlineReadings() {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedReading, setSelectedReading] = useState(null); // Store the selected reading
    const [searchId, setSearchId] = useState(''); // ID to search for a reading

    // Fetch the list of online readings when the page loads
    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/readings', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the saved token
                    },
                });
                setReadings(response.data);
            } catch (err) {
                setError('Error loading readings');
            } finally {
                setLoading(false);
            }
        };

        fetchReadings();
    }, []);

    // Function to update the readings
    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/v1/readings', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the saved token
                },
            });
            setReadings(response.data); // Update the list of readings
            setError(''); // Clear the error
        } catch (err) {
            setError('Error updating readings');
        } finally {
            setLoading(false);
        }
    };

    // Function to delete the selected reading
    const handleDelete = async () => {
        if (!selectedReading) {
            alert('No reading selected');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/v1/readings/${selectedReading._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the saved token
                },
            });
            setReadings(readings.filter((reading) => reading._id !== selectedReading._id)); // Remove the reading from the list
            setSelectedReading(null); // Deselect the reading after deletion
        } catch (err) {
            setError('Error deleting the reading');
        }
    };

    // Function to search for a reading by ID
    const handleSearch = async () => {
        if (!searchId) {
            alert('Please enter an ID to search');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/v1/readings/${searchId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the saved token
                },
            });
            setReadings([response.data]); // Show only the found reading
            setError('');
        } catch (err) {
            setError('Reading not found');
        }
    };

    // Function to select a reading
    const handleSelectReading = (reading) => {
        setSelectedReading(reading);
    };

    return (
        <div className="container">
            <h1>Online Readings</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Button bar */}
            <div className="buttons-container">
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete} disabled={!selectedReading}>Delete</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="readings-list">
                    {readings.map((reading) => (
                        <div
                            key={reading._id}
                            className={`reading-item ${selectedReading && selectedReading._id === reading._id ? 'selected' : ''}`}
                            onClick={() => handleSelectReading(reading)}
                            style={{ cursor: 'pointer' }}
                        >
                            <p><strong>ID:</strong> {reading._id}</p>
                            <p><strong>ISBN:</strong> {reading.isbn}</p>
                            <p><strong>Title:</strong> {reading.titulo}</p>
                            <p><strong>Author:</strong> {reading.autor}</p>
                            <p><strong>Language:</strong> {reading.idioma}</p>
                            <p><strong>Date:</strong> {reading.fecha}</p>
                            <p><strong>Format:</strong> {reading.formato}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OnlineReadings;
