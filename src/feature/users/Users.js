import React from 'react';
import '../../assets/styles/Users.css';

function Users({ users }) {
    return (
        <div className="Users-container">
            <h2>User List</h2>
            <div className="Users">
                {users.map((user) => (
                    <div key={user.id} className="user-item">
                        <img src={user.profilePicture} alt={user.name} className="user-profile-picture" />
                        <div className="user-details">
                            <h4>{user.name}</h4>
                            <p>{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Users;