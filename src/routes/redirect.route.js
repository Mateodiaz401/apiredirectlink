const Router = require('express');
const { redirectLink } = require('../controllers/redirect.controller');

const router = Router();


router.get('/:nanoLink', redirectLink);

module.exports = router;
