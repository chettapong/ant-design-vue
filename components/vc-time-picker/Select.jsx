import PropTypes from 'ant-design-vue/lib/_util/vue-types';
import BaseMixin from 'ant-design-vue/lib/_util/BaseMixin';
import classnames from 'classnames';
import raf from 'raf';

function noop() {}
const scrollTo = (element, to, duration) => {
  // jump to target if duration zero
  if (duration <= 0) {
    raf(() => {
      element.scrollTop = to;
    });
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  raf(() => {
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  });
};

const Select = {
  mixins: [BaseMixin],
  props: {
    prefixCls: PropTypes.string,
    options: PropTypes.array,
    selectedIndex: PropTypes.number,
    type: PropTypes.string,
    // onSelect: PropTypes.func,
    // onMouseEnter: PropTypes.func,
    allowNextDay: PropTypes.bool,
  },
  data() {
    return {
      active: false,
    };
  },

  mounted() {
    this.$nextTick(() => {
      // jump to selected option
      this.scrollToSelected(0);
    });
  },
  watch: {
    selectedIndex() {
      this.$nextTick(() => {
        // smooth scroll to selected option
        this.scrollToSelected(120);
      });
    },
  },
  methods: {
    onSelect(value, isNextDay) {
      const { type } = this;
      this.__emit('select', type, value, isNextDay);
    },
    onEsc(e) {
      this.__emit('esc', e);
    },
    getOptions() {
      const { options, selectedIndex, prefixCls } = this;
      return options.map((item, index) => {
        const cls = classnames({
          [`${prefixCls}-select-option-selected`]: selectedIndex === index,
          [`${prefixCls}-select-option-disabled`]: item.disabled,
        });
        const onClick = item.disabled
          ? noop
          : () => {
              this.onSelect(item.value, item.isNextDay);
            };
        const onKeyDown = e => {
          if (e.keyCode === 13) onClick();
          else if (e.keyCode === 27) this.onEsc();
        };
        return (
          <li
            role="button"
            onClick={onClick}
            class={cls}
            key={index}
            disabled={item.disabled}
            tabIndex="0"
            onKeydown={onKeyDown}
          >
            {item.value}
            <span
              style={{
                marginLeft: '4px',
                color: '#7a88b8',
                visibility: item.isNextDay ? 'visible' : 'hidden',
              }}
            >
              (+1)
            </span>
          </li>
        );
      });
    },

    handleMouseEnter(e) {
      this.setState({ active: true });
      this.__emit('mouseenter', e);
    },

    handleMouseLeave() {
      this.setState({ active: false });
    },

    scrollToSelected(duration) {
      // move to selected item
      const select = this.$el;
      const list = this.$refs.list;
      if (!list) {
        return;
      }

      let index = this.selectedIndex;
      if (index < 0) {
        index = 0;
      }
      const topOption = list.children[index];
      const to = topOption.offsetTop;
      scrollTo(select, to, duration);
    },
  },

  render() {
    const { prefixCls, options, active, allowNextDay } = this;
    if (options.length === 0) {
      return null;
    }

    const cls = {
      [`${prefixCls}-select`]: 1,
      [`${prefixCls}-select-active`]: active,
    };

    return (
      <div
        class={cls}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
        style={{ width: allowNextDay ? '80px' : '56px' }}
      >
        <ul ref="list" style={{ width: '100%' }}>
          {this.getOptions()}
        </ul>
      </div>
    );
  },
};

export default Select;
