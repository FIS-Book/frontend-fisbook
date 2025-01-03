import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/DownloadsInfo.css'; // Make sure this stylesheet exists

function OnlineReadingInfo() {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedReading, setSelectedReading] = useState(null); // Store the selected reading
    const [searchId, setSearchId] = useState(''); // ID to search for a reading

    // Fetch the list of readings when the page loads
    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/online-readings', {
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

    // Function to delete the selected reading
    const handleDelete = async () => {
        if (!selectedReading) {
            alert('No reading selected');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/v1/online-readings/${selectedReading._id}`, {
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

    // Function to search for a reading
    const handleSearch = async () => {
        if (!searchId) {
            alert('Please enter an ID to search');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/v1/online-readings/${searchId}`, {
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

    // Function to update the selected reading
    const handleUpdate = async () => {
        if (!selectedReading) {
            alert('No reading selected');
            return;
        }

        const updatedReadingData = {
            ...selectedReading,
            // Here you can update the data you want, for example:
            // title: 'New Title', 
            // author: 'New Author',
            // language: 'es',
            // format: 'EPUB',
            // etc.
        };

        try {
            const response = await axios.put(`http://localhost:3000/api/v1/online-readings/${selectedReading._id}`, updatedReadingData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the saved token
                },
            });
            const updatedReading = response.data;
            setReadings(readings.map((reading) => (reading._id === selectedReading._id ? updatedReading : reading))); // Update the reading in the list
            setSelectedReading(updatedReading); // Update the selected reading
            alert('Reading updated successfully');
        } catch (err) {
            setError('Error updating the reading');
        }
    };

    return (
        <div className="container">
            <h1>Online Readings</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Button bar */}
            <div className="buttons-container">
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleUpdate} disabled={!selectedReading}>Update</button>
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

export default OnlineReadingInfo;
