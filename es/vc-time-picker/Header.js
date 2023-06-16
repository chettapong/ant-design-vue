import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import PropTypes from 'ant-design-vue/es/_util/vue-types';
import BaseMixin from 'ant-design-vue/es/_util/BaseMixin';
import moment from 'moment';

var Header = {
  mixins: [BaseMixin],
  props: {
    format: PropTypes.string,
    prefixCls: PropTypes.string,
    disabledDate: PropTypes.func,
    placeholder: PropTypes.string,
    clearText: PropTypes.string,
    value: PropTypes.object,
    inputReadOnly: PropTypes.bool.def(false),
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    // onChange: PropTypes.func,
    // onClear: PropTypes.func,
    // onEsc: PropTypes.func,
    allowEmpty: PropTypes.bool,
    defaultOpenValue: PropTypes.object,
    currentSelectPanel: PropTypes.string,
    focusOnOpen: PropTypes.bool,
    // onKeyDown: PropTypes.func,
    clearIcon: PropTypes.any
  },
  data: function data() {
    var value = this.value,
        format = this.format;

    return {
      str: value && value.format(format) || '',
      invalid: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.focusOnOpen) {
      // Wait one frame for the panel to be positioned before focusing
      var requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
      requestAnimationFrame(function () {
        _this.$refs.input.focus();
        _this.$refs.input.select();
      });
    }
  },

  watch: {
    value: function value(val) {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.setState({
          str: val && val.format(_this2.format) || '',
          invalid: false
        });
      });
    }
  },

  methods: {
    onInputChange: function onInputChange(e) {
      var _e$target = e.target,
          value = _e$target.value,
          composing = _e$target.composing;
      var _str = this.str,
          oldStr = _str === undefined ? '' : _str;

      var str = value;
      if (e.isComposing || composing || oldStr === str) return;

      var format = this.format,
          hourOptions = this.hourOptions,
          minuteOptions = this.minuteOptions,
          secondOptions = this.secondOptions,
          disabledHours = this.disabledHours,
          disabledMinutes = this.disabledMinutes,
          disabledSeconds = this.disabledSeconds,
          originalValue = this.value;


      if (str.at(-1) !== ':' && format.toLowerCase().indexOf('hh:', str.length - 2) >= 0 && format.indexOf(':', str.length) === str.length) {
        str += ':';
      }

      this.setState({
        str: str
      });

      if (str) {
        var _value = this.getProtoValue().clone();
        var parsed = moment(str, format, true);
        if (!parsed.isValid()) {
          this.setState({
            invalid: true
          });
          return;
        }
        _value.hour(parsed.hour()).minute(parsed.minute()).second(parsed.second());

        // if time value not allowed, response warning.
        if (hourOptions.indexOf(_value.hour()) < 0 || minuteOptions.indexOf(_value.minute()) < 0 || secondOptions.indexOf(_value.second()) < 0) {
          this.setState({
            invalid: true
          });
          return;
        }

        // if time value is disabled, response warning.
        var disabledHourOptions = disabledHours();
        var disabledMinuteOptions = disabledMinutes(_value.hour());
        var disabledSecondOptions = disabledSeconds(_value.hour(), _value.minute());
        if (disabledHourOptions && disabledHourOptions.indexOf(_value.hour()) >= 0 || disabledMinuteOptions && disabledMinuteOptions.indexOf(_value.minute()) >= 0 || disabledSecondOptions && disabledSecondOptions.indexOf(_value.second()) >= 0) {
          this.setState({
            invalid: true
          });
          return;
        }

        if (originalValue) {
          if (originalValue.hour() !== _value.hour() || originalValue.minute() !== _value.minute() || originalValue.second() !== _value.second()) {
            // keep other fields for rc-calendar
            var changedValue = originalValue.clone();
            changedValue.hour(_value.hour());
            changedValue.minute(_value.minute());
            changedValue.second(_value.second());
            this.__emit('change', changedValue);
          }
        } else if (originalValue !== _value) {
          this.__emit('change', _value);
        }
      } else {
        this.__emit('change', null);
      }

      this.setState({
        invalid: false
      });
    },
    onKeyDown: function onKeyDown(e) {
      var str = this.str;


      if (e.keyCode === 27) {
        this.__emit('esc');
      } else if (e.key === 'Backspace' && str.at(-1) === ':') {
        this.setState({
          str: str.slice(0, -2)
        });
        e.preventDefault();
      }
      this.__emit('keydown', e);
    },
    getProtoValue: function getProtoValue() {
      return this.value || this.defaultOpenValue;
    },
    getInput: function getInput() {
      var h = this.$createElement;
      var prefixCls = this.prefixCls,
          placeholder = this.placeholder,
          inputReadOnly = this.inputReadOnly,
          invalid = this.invalid,
          str = this.str;

      var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
      return h('input', _mergeJSXProps([{
        'class': prefixCls + '-input ' + invalidClass,
        ref: 'input',
        on: {
          'keydown': this.onKeyDown,
          'input': this.onInputChange
        },
        domProps: {
          'value': str
        },
        attrs: {
          placeholder: placeholder,

          readOnly: !!inputReadOnly
        }
      }, {
        directives: [{
          name: 'ant-input'
        }]
      }]));
    }
  },

  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls;

    return h(
      'div',
      { 'class': prefixCls + '-input-wrap' },
      [this.getInput()]
    );
  }
};

export default Header;