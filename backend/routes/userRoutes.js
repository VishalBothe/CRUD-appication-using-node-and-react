express = require('express');
router = express.Router();

const { usersOrganizedEvents, usersRegisteredEvent } = require('../controllers/userControllers');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');


router.get('/organized-events/:userId', isSignedIn, isAuthenticated, usersOrganizedEvents);
router.get('/registered-events/:userId', isSignedIn, isAuthenticated, usersRegisteredEvent);



module.exports = router;