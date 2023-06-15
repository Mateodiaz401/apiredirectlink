const { validationResult, body, param } = require("express-validator");
const axios = require('axios');

const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


const paramLinkValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

const bodyLinkValidator = [
    body("longLink", "formato link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            try {
                if (!value.startsWith("https://")) {
                    value = "https://" + value;
                }
                await axios.get(value);
                return value;
            } catch (error) {
                // console.log(error);
                throw new Error("not found longlink 404");
            }
        }),
    validationResultExpress,
];


const bodyRegisterValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail({
            gmail_remove_dots: false,
            outlookdotcom_remove_dots: false,
            yahoo_remove_dots: false,
            icloud_remove_dots: false,
            all_lowercase: true
        }),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecta").custom(
        (value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las contraseñas");
            }
            return value;
        }
    ),
    validationResultExpress,
];

const bodyLoginValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail({
            gmail_remove_dots: true,
            outlookdotcom_remove_dots: false,
            yahoo_remove_dots: false,
            icloud_remove_dots: false,
            all_lowercase: true
        }),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    validationResultExpress,
];


module.exports = {
    bodyLoginValidator,
    bodyRegisterValidator,
    bodyLinkValidator,
    paramLinkValidator
}