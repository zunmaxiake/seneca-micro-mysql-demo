const path = require("path");
const fs = require("fs");
const config = require("./config/dev").config;
const seneca = require("seneca")(config.defult);

//seneca.use(util)

const apiPath = path.resolve("api");
try {
  fs.readdirSync(apiPath)
    .filter(file => {
      return (file.indexOf(".") < 0);
    })
    .forEach(file => {
      seneca.use(path.resolve(apiPath, file));
      console.log("Micro Service Is loaded:", file)
    })
}
catch (err) {
  console.log("err:", err);
}

seneca.listen(config.url);

seneca.ready(() => {
  console.log(`micro server start on host:${config.url.host} and port:${config.url.port}`);
})

