import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ContactUs = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Get customer ID from cookies
    const customerId = Cookies.get('userId');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError('');
        setSuccessMessage('');

        // Validate input
        if (!title || !description) {
            setError('Please fill in all fields');
            return;
        }

        try {
            // Send contact request to your API
            const response = await axios.post('http://localhost:8020/contact/submit', {
                customerId,
                title,
                description,
            });

            // Handle response
            if (response.status === 201) {
                setSuccessMessage('Your message has been sent successfully!');
                setTitle('');
                setDescription('');
            }
        } catch (err) {
            console.error('Error submitting contact request:', err);
            setError('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[#F6F1E5]">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Contact Us</h2>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md border border-red-300">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-md border border-green-300">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                            placeholder="Enter your title"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                            rows="5"
                            placeholder="Enter your message"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-3 rounded-lg hover:shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
