const log4js = require('log4js');
// Logger configuración
log4js.configure({
  appenders: {
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['console'], level: 'TRACE' },
  },
});
const log4jsLogger = log4js.getLogger();

const Level = {
  TRACE: { priority: 0, outputString: 'TRACE' },
  DEBUG: { priority: 100, outputString: 'DEBUG' },
  INFO: { priority: 200, outputString: 'INFO' },
  WARN: { priority: 300, outputString: 'WARN' },
  ERROR: { priority: 400, outputString: 'ERROR' },
  FATAL: { priority: 500, outputString: 'FATAL' },
  OFF: { priority: 1000, outputString: 'OFF' },
};

let logLevel = Level.INFO;

/**
 * Permite cambiar el log level
 * a un nuevo valor
 * @param {Level} newLevel - the new log Level
 */
const setLogLevel = (newLevel) => {
  logLevel = newLevel;
};

const setLogLevelByName = (newLevel) => {
  switch (newLevel) {
    case 'TRACE':
      setLogLevel(Level.TRACE);
      break;
    case 'DEBUG':
      setLogLevel(Level.DEBUG);
      break;
    case 'WARN':
      setLogLevel(Level.WARN);
      break;
    case 'ERROR':
      setLogLevel(Level.ERROR);
      break;
    case 'FATAL':
      setLogLevel(Level.FATAL);
      break;
    case 'OFF':
      setLogLevel(Level.OFF);
      break;
    case 'INFO':
    default:
      setLogLevel(Level.INFO);
  }
};

setLogLevelByName(process.env.LOG_LEVEL);

const log = (messageLogLevel, message, source, logFunction) => {
  let computedMessage = null;
  if (messageLogLevel.priority >= logLevel.priority) {

    computedMessage = ((source) ? '[ ' + source + ' ] -- ' : '[na] -- ') + ((typeof message === 'object' && message !== null) ? JSON.stringify(message) : message);
    (logFunction)
      ? logFunction(computedMessage, messageLogLevel)
      : logMessage(computedMessage, messageLogLevel);
  }
  return computedMessage;


};

const logMessage = (computedMessage, messageLogLevel) => {
  switch (messageLogLevel) {
    case Level.TRACE:
      log4jsLogger.trace(computedMessage);
      break;
    case Level.DEBUG:
      log4jsLogger.debug(computedMessage);
      break;
    case Level.WARN:
      log4jsLogger.warn(computedMessage);
      break;
    case Level.ERROR:
      log4jsLogger.error(computedMessage);
      break;
    case Level.FATAL:
      log4jsLogger.fatal(computedMessage);
      break;
    case Level.INFO:
    default:
      log4jsLogger.info(computedMessage);
  }
};

const trace = (message, source, logFunction) => {
  return log(Level.TRACE, message, source, logFunction);
};

const debug = (message, source, logFunction) => {
  return log(Level.DEBUG, message, source, logFunction);
};

const info = (message, source, logFunction) => {
  return log(Level.INFO, message, source, logFunction);
};

const warn = (message, source, logFunction) => {
  return log(Level.WARN, message, source, logFunction);
};

const error = (message, source, logFunction) => {
  return log(Level.ERROR, message, source, logFunction);
};

const fatal = (message, source, logFunction) => {
  return log(Level.FATAL, message, source, logFunction);
};

const is = (level) => {
  return level.priority >= logLevel.priority;
};

const isTrace = () => { return is(Level.TRACE); };
const isDebug = () => { return is(Level.DEBUG); };
const isInfo = () => { return is(Level.INFO); };
const isWarn = () => { return is(Level.WARN); };
const isError = () => { return is(Level.ERROR); };
const isFatal = () => { return is(Level.FATAL); };
const isOff = () => { return is(Level.OFF); };

const logCatch = (_errObject, _source) => {

  if (_errObject.message) {
    error(_errObject.message, _source);
  } else {
    error(_errObject, _source);
  }

  if (_errObject.stack) {
    debug(_errObject.stack, _source);
  }

};

module.exports = {
  Level,
  setLogLevelByName,
  setLogLevel,
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
  log,
  isTrace,
  isDebug,
  isInfo,
  isWarn,
  isError,
  isFatal,
  isOff,
  logCatch,
};
