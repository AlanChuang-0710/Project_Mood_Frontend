// 導入配置項
const { FRONTENDHOST, FRONTENDPORT } = require("./config/config");
const createError = require('http-errors');
var express = require('express');
require('express-async-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require("cors");
var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 設置cors中間件
app.use(cors({
    origin: [
        // 前端url
        `${FRONTENDHOST}:${FRONTENDPORT}`,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
}));
app.use('/admin', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.log("全局錯誤中間件攔截", err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        success: false, // 提供前端判斷
        errorMessage: err.message,
        code: 5000, // 通用後端server業務狀態碼
        stackTrace: "",
        data: null
    });
});

module.exports = app;
