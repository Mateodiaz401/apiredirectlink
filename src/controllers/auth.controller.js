const User = require("../models/User");
const { generateToken, generateRefreshToken, tokenVerificationErrors, } = require("../utils/tokenManager");


const register = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (user) throw { code: 11000 }
        user = new User({ email, password });
        await user.save();
        //Generar el token JWT
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);
        return res.status(200).json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        // Alternativa por defecto mongoose
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya existe este usuario" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "credenciales incorrectas" });

        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword) return res.status(403).json({ error: "credenciales incorrectas" });
        //Generar el token JWT
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error, "esto es un error");
        return res.status(500).json({ error: "Error de servidor" });
    }
}

const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({ email: user.email, id: user._id });
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" });
    }
}

const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
};

const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
};

module.exports = {
    register,
    login,
    infoUser,
    refreshToken,
    logout
}