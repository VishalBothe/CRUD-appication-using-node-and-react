express = require('express');
router = express.Router();

const { organizeEvent, attendEvent, cancelRegistration, upcommingEventList } = require('../controllers/eventControllers');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');

// Create
router.post('/organize-event', isSignedIn, organizeEvent);
// Create
router.post('/attend-event', isSignedIn, attendEvent);
// Read
router.get('/upcomming-event-list/:userId', isSignedIn, upcommingEventList);
// Delete
router.delete('/cancel-registration/:userId/:eventId', isSignedIn, isAuthenticated, cancelRegistration);

module.exports = router;