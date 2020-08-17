express = require('express');
router = express.Router();

const { organizeEvent, attendEvent, upcommingEventList } = require('../controllers/eventControllers');
const { isSignedIn } = require('../controllers/auth');

router.post('/organize-event', isSignedIn, organizeEvent);
router.post('/attend-event', isSignedIn, attendEvent);
router.get('/upcomming-event-list/:activeUserId', isSignedIn, upcommingEventList);

module.exports = router;