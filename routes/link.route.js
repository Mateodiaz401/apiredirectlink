const Router = require('express');
const { getLinks, createLink, getLink, deleteLink, updateLink } = require('../controllers/link.controller');
const { requireToken } = require('../middlewares/requireToken');
const { bodyLinkValidator, paramLinkValidator } = require('../middlewares/validatorManager');

const router = Router();
// get         /api/v1/links.          all links
// get         /api/v1/links/:id       single link
// post        /api/v1/links/:id       create link
// PATCH/PUT   /api/v1/links/:id       update link
// DELETE     /api/v1/links/:id        remove link

router.post('/', requireToken, bodyLinkValidator, createLink);
router.get('/', requireToken, getLinks);
router.get('/:nanoLink', getLink);
router.delete('/:id', requireToken, paramLinkValidator, deleteLink);
router.patch('/:id', requireToken, paramLinkValidator, bodyLinkValidator, updateLink)

module.exports = router;