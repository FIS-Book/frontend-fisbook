import React, { useState } from 'react';
import '../../assets/styles/LogIn.css';
import { Link } from 'react-router-dom'; // Importing Link
import axios from 'axios'; // Import axios

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/auth/users/login', 
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure the content type is JSON
                    }
                }
            );

            // If the response is successful
            console.log('Response:', response); // Check the API response
            localStorage.setItem('token', response.data.token); // Store the JWT in localStorage
            window.location.href = '/catalogue'; // Redirect to the catalog page (change the route as needed)

        } catch (error) {
            // Handle error if it occurs
            console.error('Login error:', error); // Check if any error occurs
            setError(error.response?.data?.message || 'Authentication error');
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="login-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            {/* Register Button to redirect to the register page */}
            <p className="login-redirect">
                Don't have an account? <Link to="/register"> Register </Link>
            </p>
        </div>
    );
}

export default Login;
