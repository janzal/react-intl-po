'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-console */


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _flowRight = require('lodash/flowRight');

var _flowRight2 = _interopRequireDefault(_flowRight);

var _readAllMessageAsObjectSync = require('./readAllMessageAsObjectSync');

var _readAllMessageAsObjectSync2 = _interopRequireDefault(_readAllMessageAsObjectSync);

var _potFormater = require('./potFormater');

var _potFormater2 = _interopRequireDefault(_potFormater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CUSTOM_KEY_MAPPER = function CUSTOM_KEY_MAPPER(message, messageKey, filename) {
  return _defineProperty({}, message[messageKey], [_extends({}, message, { filename: filename })]);
};

var defaultMapperFactory = function defaultMapperFactory() {
  var messageKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'defaultMessage';
  return function (message, filename) {
    return CUSTOM_KEY_MAPPER(message, messageKey, filename);
  };
};

function extractAndWritePOTFromMessagesSync(srcPatterns, _ref2) {
  var messageKey = _ref2.messageKey;
  var output = _ref2.output;

  var mapper = messageKey ? defaultMapperFactory(messageKey) : undefined;

  var result = (0, _flowRight2.default)(_potFormater2.default, // 2. return formated string
  _readAllMessageAsObjectSync2.default)(srcPatterns, mapper);

  _fs2.default.writeFileSync(output, result);
  console.log(_chalk2.default.green('> [react-intl-po] write file -> ' + output + ' \u2714\uFE0F\n'));
}

exports.default = extractAndWritePOTFromMessagesSync;
module.exports = exports['default'];