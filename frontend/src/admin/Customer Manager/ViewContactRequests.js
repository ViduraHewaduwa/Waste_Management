import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewContactRequests = () => {
    const [contactRequests, setContactRequests] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchContactRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8020/contact/contacts'); // Adjust endpoint as needed
                setContactRequests(response.data); // Assume the data is in the response
            } catch (err) {
                console.error('Error fetching contact requests:', err);
                setError('Failed to fetch contact requests. Please try again later.');
            }
        };

        fetchContactRequests();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8020/contact/requests/${id}`);
            setContactRequests(contactRequests.filter(request => request._id !== id)); // Update the state to remove the deleted contact
        } catch (err) {
            console.error('Error deleting contact request:', err);
            setError('Failed to delete contact request. Please try again later.');
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Contact Requests</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
            {successMessage && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{successMessage}</div>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Issue ID</th>
                        <th className="py-2 px-4 border-b">Customer ID</th>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Created At</th>
                        <th className="py-2 px-4 border-b">Actions</th> {/* Add actions column */}
                    </tr>
                </thead>
                <tbody>
                    {contactRequests.length > 0 ? (
                        contactRequests.map((request) => (
                            <tr key={request._id}>
                                <td className="py-2 px-4 border-b">{request.issueId}</td>
                                <td className="py-2 px-4 border-b">{request.customerId}</td>
                                <td className="py-2 px-4 border-b">{request.title}</td>
                                <td className="py-2 px-4 border-b">{request.description}</td>
                                <td className="py-2 px-4 border-b">{new Date(request.createdAt).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(request._id)} // Call delete function on click
                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="py-2 px-4 text-center">No contact requests found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewContactRequests;
