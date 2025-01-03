import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/DownloadsInfo.css'; // Make sure this stylesheet exists

function DownloadsInfo() {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDownload, setSelectedDownload] = useState(null); // Store the selected download
    const [searchId, setSearchId] = useState(''); // ID to search for a download

    // Fetch the list of downloads when the page loads
    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/downloads', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the saved token
                    },
                });
                setDownloads(response.data);
            } catch (err) {
                setError('Error loading downloads');
            } finally {
                setLoading(false);
            }
        };

        fetchDownloads();
    }, []);

    // Function to delete the selected download
    const handleDelete = async () => {
        if (!selectedDownload) {
            alert('No download selected');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/v1/downloads/${selectedDownload._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the saved token
                },
            });
            setDownloads(downloads.filter((download) => download._id !== selectedDownload._id)); // Remove the download from the list
            setSelectedDownload(null); // Deselect the download after deletion
        } catch (err) {
            setError('Error deleting the download');
        }
    };

    // Function to search for a download
    const handleSearch = async () => {
        if (!searchId) {
            alert('Please enter an ID to search');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/v1/downloads/${searchId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the saved token
                },
            });
            setDownloads([response.data]); // Show only the found download
            setError('');
        } catch (err) {
            setError('Download not found');
        }
    };

    // Function to select a download
    const handleSelectDownload = (download) => {
        setSelectedDownload(download);
    };

    return (
        <div className="container">
            <h1>Downloads</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Button bar */}
            <div className="buttons-container">
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleDelete} disabled={!selectedDownload}>Delete</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="downloads-list">
                    {downloads.map((download) => (
                        <div
                            key={download._id}
                            className={`download-item ${selectedDownload && selectedDownload._id === download._id ? 'selected' : ''}`}
                            onClick={() => handleSelectDownload(download)}
                            style={{ cursor: 'pointer' }}
                        >
                            <p><strong>ID:</strong> {download._id}</p>
                            <p><strong>ISBN:</strong> {download.isbn}</p>
                            <p><strong>Title:</strong> {download.titulo}</p>
                            <p><strong>Author:</strong> {download.autor}</p>
                            <p><strong>Language:</strong> {download.idioma}</p>
                            <p><strong>Date:</strong> {download.fecha}</p>
                            <p><strong>Format:</strong> {download.formato}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DownloadsInfo;
