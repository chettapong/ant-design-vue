import moment from 'moment';
import PropTypes from 'ant-design-vue/es/_util/vue-types';
import BaseMixin from 'ant-design-vue/es/_util/BaseMixin';
import KeyCode from 'ant-design-vue/es/_util/KeyCode';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from 'ant-design-vue/es/vc-calendar/src/calendar/CalendarFooter';
import CalendarMixin from 'ant-design-vue/es/vc-calendar/src/mixin/CalendarMixin';
import CommonMixin from 'ant-design-vue/es/vc-calendar/src/mixin/CommonMixin';
import enUs from 'ant-design-vue/es/vc-calendar/src/locale/en_US';
var MonthCalendar = {
  name: 'MonthCalendar',
  props: {
    locale: PropTypes.object.def(enUs),
    format: PropTypes.string,
    visible: PropTypes.bool.def(true),
    prefixCls: PropTypes.string.def('rc-calendar'),
    monthCellRender: PropTypes.func,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    selectedValue: PropTypes.object,
    defaultSelectedValue: PropTypes.object,
    disabledDate: PropTypes.func,
    monthCellContentRender: PropTypes.func,
    renderFooter: PropTypes.func.def(function () {
      return null;
    }),
    renderSidebar: PropTypes.func.def(function () {
      return null;
    })
  },
  mixins: [BaseMixin, CommonMixin, CalendarMixin],

  data: function data() {
    var props = this.$props;
    return {
      mode: 'month',
      sValue: props.value || props.defaultValue || moment(),
      sSelectedValue: props.selectedValue || props.defaultSelectedValue
    };
  },

  methods: {
    onKeyDown: function onKeyDown(event) {
      var keyCode = event.keyCode;
      var ctrlKey = event.ctrlKey || event.metaKey;
      var stateValue = this.sValue;
      var disabledDate = this.disabledDate;

      var value = stateValue;
      switch (keyCode) {
        case KeyCode.DOWN:
          value = stateValue.clone();
          value.add(3, 'months');
          break;
        case KeyCode.UP:
          value = stateValue.clone();
          value.add(-3, 'months');
          break;
        case KeyCode.LEFT:
          value = stateValue.clone();
          if (ctrlKey) {
            value.add(-1, 'years');
          } else {
            value.add(-1, 'months');
          }
          break;
        case KeyCode.RIGHT:
          value = stateValue.clone();
          if (ctrlKey) {
            value.add(1, 'years');
          } else {
            value.add(1, 'months');
          }
          break;
        case KeyCode.ENTER:
          if (!disabledDate || !disabledDate(stateValue)) {
            this.onSelect(stateValue);
          }
          event.preventDefault();
          return 1;
        default:
          return undefined;
      }
      if (value !== stateValue) {
        this.setValue(value);
        event.preventDefault();
        return 1;
      }
    },
    handlePanelChange: function handlePanelChange(_, mode) {
      if (mode !== 'date') {
        this.setState({ mode: mode });
      }
    }
  },

  render: function render() {
    var h = arguments[0];
    var mode = this.mode,
        value = this.sValue,
        props = this.$props,
        $scopedSlots = this.$scopedSlots;
    var prefixCls = props.prefixCls,
        locale = props.locale,
        disabledDate = props.disabledDate;

    var monthCellRender = this.monthCellRender || $scopedSlots.monthCellRender;
    var monthCellContentRender = this.monthCellContentRender || $scopedSlots.monthCellContentRender;
    var renderFooter = this.renderFooter || $scopedSlots.renderFooter;
    var children = h(
      'div',
      { 'class': prefixCls + '-month-calendar-content' },
      [h(
        'div',
        { 'class': prefixCls + '-month-header-wrap' },
        [h(CalendarHeader, {
          attrs: {
            prefixCls: prefixCls,
            mode: mode,
            value: value,
            locale: locale,
            disabledMonth: disabledDate,
            monthCellRender: monthCellRender,
            monthCellContentRender: monthCellContentRender
          },
          on: {
            'monthSelect': this.onSelect,
            'valueChange': this.setValue,
            'panelChange': this.handlePanelChange
          }
        })]
      ), h(CalendarFooter, {
        attrs: { prefixCls: prefixCls, renderFooter: renderFooter }
      })]
    );
    return this.renderRoot({
      'class': props.prefixCls + '-month-calendar',
      children: children
    });
  }
};

export default MonthCalendar;