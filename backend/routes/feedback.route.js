const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback.model'); // Adjust the path as necessary

// Submit Feedback Route
router.post('/feedback', async (req, res) => {
    const { customerId, pickupId, description, starRating } = req.body;

    // Basic validation
    if (!customerId || !pickupId || !description || !starRating) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate star rating
    if (starRating < 1 || starRating > 5) {
        return res.status(400).json({ error: 'Star rating must be between 1 and 5' });
    }

    try {
        // Create new feedback with pickupId
        const feedback = new Feedback({ customerId, pickupId, description, starRating });
        await feedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Server error during feedback submission' });
    }
});

// Get All Feedback Route
router.get('/all', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('pickupId'); // Populating pickupId to get pickup details
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Server error while fetching feedbacks' });
    }
});

// Get Feedback by Pickup ID Route
router.get('/feedback/pickup/:pickupId', async (req, res) => {
    const { pickupId } = req.params;

    try {
        const feedbacks = await Feedback.find({ pickupId }).populate('pickupId'); // Find feedback by pickupId
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks for pickup:', error);
        res.status(500).json({ error: 'Server error while fetching feedbacks' });
    }
});

// Get Feedback by Customer ID Route
router.get('/feedback/customer/:customerId', async (req, res) => {
    const { customerId } = req.params;

    try {
        const feedbacks = await Feedback.find({ customerId }).populate('pickupId'); // Optionally populate pickupId for customer feedbacks
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks for customer:', error);
        res.status(500).json({ error: 'Server error while fetching feedbacks' });
    }
});

// Delete Feedback by ID Route
router.delete('/feedback/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findByIdAndDelete(id);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Server error while deleting feedback' });
    }
});

module.exports = router;
