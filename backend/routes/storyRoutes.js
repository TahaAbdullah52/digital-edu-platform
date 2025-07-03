const express = require('express');
const {getAcceptedStories, submitStory, getAllStories, acceptStory, rejectStory, deleteStory} = require('../controllers/storyController');
const router = express.Router();



router.get('/stories', getAcceptedStories); // Get all accepted stories
router.post('/stories/create', submitStory); // Submit a new story
router.get('/stories/admin', getAllStories);
router.put('/stories/admin/:id/accept', acceptStory);
router.put('/stories/admin/:id/reject', rejectStory);
router.delete('/stories/admin/:id', deleteStory);



module.exports = router;