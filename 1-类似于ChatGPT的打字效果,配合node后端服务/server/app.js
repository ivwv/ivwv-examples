const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  let text =
    "EventSource 的方法 close() 用于关闭当前的连接，如果调用了此方法，则会将EventSource.readyState (en-US)这个属性值设置为 2 (closed)";
  let i = 0;
  let intervalId = setInterval(() => {
    if (i >= text.length) {
      clearInterval(intervalId);
      console.log("EventStream server closed");
      // 规定一个关闭的标志
      res.write(`data:close\n\n`);
    }

    res.write(`data:${text[i]}\n\n`);
    i++;
  }, 100);
});

app.listen(3000, () => {
  console.log("EventStream server listening on port 3000");
});
