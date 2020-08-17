express = require('express');
router = express.Router();

const { organizeEvent, attendEvent } = require('../controllers/eventControllers');
const { isSignedIn } = require('../controllers/auth');

router.post('/organize-event', organizeEvent);
router.post('/attend-event', isSignedIn, attendEvent);

module.exports = router;