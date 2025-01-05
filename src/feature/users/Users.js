import React, { useState, useEffect } from 'react';
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook
import axios from 'axios';
import '../../assets/styles/Users.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // Store the selected user

    // Verificar si el token ha expirado al cargar la página
    useCheckTokenExpiration();

     // Fetches the list of users when the page loads
     useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users`, {
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
        if (!selectedUser || !selectedUser.id) { // Cambiado _id por id
            alert('No user selected or invalid ID');
            return;
        }
    
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${selectedUser.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(users.filter((user) => user.id !== selectedUser.id)); // Cambiado _id por id
            setSelectedUser(null); // Deselecciona al usuario después de eliminarlo
        } catch (err) {
            console.error('Error deleting user:', err.response || err.message || err);
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
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${selectedUser.id}`, newUserData, { // Cambiado _id por id
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const updatedUser = response.data;
            setUsers(users.map(user => (user.id === selectedUser.id ? updatedUser : user))); // Cambiado _id por id
            setSelectedUser(updatedUser); // Updates the selected user
        } catch (err) {
            setError('Error updating user');
        }
    };

    // Function to select a user
    const handleSelectUser = (user) => {
        if (selectedUser && selectedUser.id === user.id) {
            // If the same user is clicked, deselect it
            setSelectedUser(null);
        } else {
            // If a different user is clicked, select it
            setSelectedUser(user);
        }
    };

    // Searches for a user by ID
    const handleSearch = async () => {
        const userId = prompt('Enter the user ID to search for:');
        if (userId) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the stored token
                    },
                });
                alert(JSON.stringify(response.data, null, 2)); // Shows user details
            } catch (err) {
                console.error('Error searching for user:', err.response || err.message || err);
                setError('Error searching for user');
            }
        }
    };

    return (
        <div>
            <h1>Fisbook Users</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Instruction */}
            <p>Click on a user to select them, then choose an action (Update/Delete).</p>

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
                        <tr 
                            key={user.id}
                            onClick={() => handleSelectUser(user)} 
                            style={{ 
                                cursor: 'pointer', 
                                backgroundColor: selectedUser && selectedUser.id === user.id ? 'lightblue' : 'transparent'
                            }}
                        >
                            <td>{user.username}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.email}</td>
                            <td>{user.rol}</td>
                            <td>{user.plan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
}

export default Users;


