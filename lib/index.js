'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePicker = exports.DatePicker = undefined;

var _datePicker = require('./date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _timePicker = require('./time-picker');

var _timePicker2 = _interopRequireDefault(_timePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var components = [_datePicker2['default'], _timePicker2['default']];

var install = function install(Vue) {
  components.map(function (component) {
    Vue.use(component);
  });
};

exports.DatePicker = _datePicker2['default'];
exports.TimePicker = _timePicker2['default'];
exports['default'] = {
  install: install
};