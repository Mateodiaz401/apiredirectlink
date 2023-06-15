
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/auth.route');
const linkRouter = require('./routes/link.route');
const redirectRouter = require('./routes/redirect.route');

const app = express();
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                "Error de CORS origin: " + origin + " No autorizado!"
            );
        }
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", redirectRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/links", linkRouter);

// app.use(express.static("public"))

module.exports = app;