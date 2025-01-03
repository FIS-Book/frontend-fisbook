import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/Users.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // Store the selected user

    // Fetches the list of users when the page loads
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/auth/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the stored token
                    },
                });
                setUsers(response.data);
            } catch (err) {
                setError('Error loading users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Function to delete the selected user
    const handleDelete = async () => {
        if (!selectedUser) {
            alert('No user selected');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/v1/auth/users/${selectedUser._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the stored token
                },
            });
            setUsers(users.filter((user) => user._id !== selectedUser._id)); // Removes the user from the list
            setSelectedUser(null); // Deselect the user after deletion
        } catch (err) {
            setError('Error deleting user');
        }
    };

    // Function to update the selected user
    const handleUpdate = async () => {
        if (!selectedUser) {
            alert('No user selected');
            return;
        }

        const newUserData = {
            nombre: 'New name',
            apellidos: 'New surname',
            email: 'newemail@example.com',
            plan: 'Plan1',
            rol: 'User',
        };

        try {
            const response = await axios.put(`http://localhost:3000/api/v1/auth/users/${selectedUser._id}`, newUserData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the stored token
                },
            });
            const updatedUser = response.data;
            setUsers(users.map(user => (user._id === selectedUser._id ? updatedUser : user))); // Updates the user in the list
            setSelectedUser(updatedUser); // Updates the selected user
        } catch (err) {
            setError('Error updating user');
        }
    };

    // Function to search for a user
    const handleSearch = async () => {
        const userId = prompt('Enter the user ID to search for:');
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/auth/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the stored token
                    },
                });
                alert(JSON.stringify(response.data, null, 2)); // Shows user details
            } catch (err) {
                setError('Error searching for user');
            }
        }
    };

    // Function to select a user
    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    return (
        <div>
            <h1>Fisbook Users</h1>
            {error && <p className="error-message">{error}</p>}

            {/* General Buttons */}
            <div className="buttons-container">
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleUpdate} disabled={!selectedUser}>Update</button>
                <button onClick={handleDelete} disabled={!selectedUser}>Delete</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} onClick={() => handleSelectUser(user)} style={{ cursor: 'pointer' }}>
                                <td>{user.username}</td> {/* Username */}
                                <td>{user.nombre}</td> {/* Name */}
                                <td>{user.apellidos}</td> {/* Surname */}
                                <td>{user.email}</td> {/* Email */}
                                <td>{user.rol}</td> {/* Role */}
                                <td>{user.plan}</td> {/* Plan */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Users;
