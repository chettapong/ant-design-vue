import { default as DatePicker } from './date-picker';
import { default as TimePicker } from './time-picker';

const components = [DatePicker, TimePicker];

const install = function(Vue) {
  components.map(component => {
    Vue.use(component);
  });
};

export { DatePicker, TimePicker };

export default {
  install,
};
