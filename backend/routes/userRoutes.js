express = require('express');
router = express.Router();

const { usersOrganizedEvents, usersRegisteredEvent } = require('../controllers/userControllers');
const { isSignedIn } = require('../controllers/auth');

router.get('/organized-events/:activeUserdId', isSignedIn, usersOrganizedEvents);
router.get('/registered-events/:activeUserId', isSignedIn, usersRegisteredEvent);

module.exports = router;