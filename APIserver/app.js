require('module-alias/register');
const createError = require('http-errors');
const path = require('path');
const fs = require("fs");
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const rfs = require('rotating-file-stream');

// 導入server監測器
const expressStatusMonitor = require('express-status-monitor');

// 導入統一錯誤處理中間件，之後所有中間件都會被包上一層錯誤處理函數
// https://juejin.cn/post/7114645499696644103
require('express-async-errors');

// 導入api
const feelingRouter = require('@/routes/api/feeling');
const authRouter = require('@/routes/api/auth');
const reportRouter = require("@/routes/api/report");
const commonRouter = require("@/routes/api/common");

// 導入session
const session = require("express-session");
const MongoStore = require("connect-mongo");

// 導入cors
const cors = require('cors');

// 導入配置項
const { DBHOST, DBPORT, DBNAME, FRONTENDHOST, FRONTENDPORT } = require("@config/config");

const app = express();

// 設置server監控器，默認運行於 ${DBHOST}:${DBPORT}/status
app.use(expressStatusMonitor({
  title: 'Mood API Server Performance',
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: false,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true
  },
}));

// 設置session中間件
app.use(session({
  name: "jwt", //設置給瀏覽器的cookie的名字，默認值是connect.sid
  secret: "mood", //參與加密的字符串(又稱簽名) (安全等級加嚴)
  saveUninitialized: false, //是否為每次請求都設置一個cookie來存儲session的id
  resave: true, //是否在每次請求時重新保存session (每次請求都重新設置過期時間)
  store: MongoStore.create({
    mongoUrl: `${DBHOST}:${DBPORT}/${DBNAME}` //設置數據庫的連接位置
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 控制sessionID的過期時間
  }
}));


const corsOptions = {
  origin: [
    // 前端url 套件規定不能是127.0.0.1，故此處改用localhost
    `${FRONTENDHOST}:${FRONTENDPORT}`,
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true
};
// 設置cors中間件
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  size: "2M",
  path: path.join(__dirname, 'log')
});

const logFormat = (tokens, req, res) => {
  return [
    "HTTP status",
    tokens.status(req, res),
    "ResTime",
    tokens['response-time'](req, res),
    'ms',
    tokens.method(req, res),
    tokens.url(req, res)
  ].join(' ');
};

app.use(logger(logFormat, {
  stream: accessLogStream,
  // skip: function (req, res) { return res.statusCode < 400; }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 未來前端打包後，發送html設定
app.get("/", (req, res, next) => {
  const readStream = fs.createReadStream(path.resolve(__dirname, "./public/index.html")).on("error", (error) => {
    next(error);
  });
  readStream.pipe(res);
});
app.use('/users', authRouter);
app.use('/feeling', feelingRouter);
app.use("/report", reportRouter);
app.use("/common", commonRouter);

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
