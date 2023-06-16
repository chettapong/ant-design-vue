import { default as DatePicker } from './date-picker';
import { default as TimePicker } from './time-picker';

var components = [DatePicker, TimePicker];

var install = function install(Vue) {
  components.map(function (component) {
    Vue.use(component);
  });
};

export { DatePicker, TimePicker };

export default {
  install: install
};