// Project: https://github.com/vueComponent/ant-design-vue
// Definitions by: akki-jat <https://github.com/akki-jat>
// Definitions: https://github.com/vueComponent/ant-design-vue/types

import Vue from 'vue'

import { DatePicker } from './date-picker/date-picker'
import { TimePicker } from './time-picker'

/**
 * Install all ant-design-vue components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(Antd)` to install.
 */
export function install(vue: typeof Vue): void

export { DatePicker, TimePicker }
