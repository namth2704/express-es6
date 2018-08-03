"use strict";

import path from 'path';
import fs from 'fs';
import Log from 'log';
import config from 'exp-config';

const getLoggerStream = () => {
  switch (config.log) {
    case "file":
      return fs.createWriteStream(path.join(__dirname, "..", "logs", `${config.envName}.log`));
    case "stdout":
      return process.stdout;
    default:
      throw new Error(`Invalid logger: ${config.log}`);
  }
}

module.exports = new Log(config.logLevel || "info", getLoggerStream());
