import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import axios from 'axios'; // Import axios for making HTTP requests

const FeedbackPage = () => {
    const { id } = useParams(); // Get the pickupId from the URL
    const [description, setDescription] = useState('');
    const [starRating, setStarRating] = useState(1); // Default star rating
    const customerId = Cookies.get('userId'); // Get customer ID from cookies

    console.log(id); // Log the pickupId for debugging

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare feedback data
        const feedbackData = {
            customerId,
            pickupId: id, // Correctly set pickupId from URL param id
            description,
            starRating,
        };

        try {
            // Send feedback data to the server
            const response = await axios.post('http://localhost:8020/feedback/feedback', feedbackData);
            alert(response.data.message); // Show success message
            setDescription(''); // Reset description
            setStarRating(1); // Reset star rating
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred while submitting feedback.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
                        Customer ID
                    </label>
                    <input
                        type="text"
                        id="customerId"
                        value={customerId}
                        readOnly // Make it read-only since it's derived from cookies
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Feedback Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Star Rating</label>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                onClick={() => setStarRating(star)}
                                className={`h-6 w-6 cursor-pointer ${star <= starRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .587l3.668 7.425 8.197 1.185-5.938 5.268 1.407 8.078L12 18.897l-7.334 3.867 1.407-8.078-5.938-5.268 8.197-1.185z" />
                            </svg>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackPage;
