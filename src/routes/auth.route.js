const Router = require('express');
const { login, register, infoUser, refreshToken, logout } = require('../controllers/auth.controller');
const { requireToken } = require('../middlewares/requireToken');
const requireRefreshToken = require('../middlewares/requireRefreshToken');
const { bodyLoginValidator, bodyRegisterValidator } = require('../middlewares/validatorManager');
const router = Router();


router.post("/register",
    bodyRegisterValidator,
    register
);

router.post("/login",
    bodyLoginValidator,
    login
);

router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);



module.exports = router;