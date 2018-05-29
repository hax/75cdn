(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('echarts/lib/echarts'), require('echarts/lib/component/tooltip'), require('echarts/lib/component/legend'), require('echarts/extension/bmap/bmap')) :
	typeof define === 'function' && define.amd ? define(['echarts/lib/echarts', 'echarts/lib/component/tooltip', 'echarts/lib/component/legend', 'echarts/extension/bmap/bmap'], factory) :
	(global.VeBmap = factory(global.echarts));
}(this, (function (echarts) { 'use strict';

echarts = 'default' in echarts ? echarts['default'] : echarts;

echarts.registerTheme('ve-chart', {
  categoryAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false }
  },
  valueAxis: {
    axisLine: { show: false }
  },
  line: {
    smooth: true
  },
  grid: {
    containLabel: true,
    left: 10,
    right: 10
  }
});



var color = ['#19d4ae', '#5ab1ef', '#fa6e86', '#ffb980', '#0067a6', '#c4b4e4', '#d87a80', '#9cbbff', '#d9d0c7', '#87a997', '#d49ea2', '#5b4947', '#7ba3a8'];

var bmapPromise = null;
var getBmap = function getBmap(key, v) {
  if (!bmapPromise) {
    bmapPromise = new Promise(function (resolve, reject) {
      var callbackName = 'bmap' + Date.now();
      window[callbackName] = resolve;
      var script = document.createElement('script');
      script.src = ['https://api.map.baidu.com/api?v=' + (v || '2.0'), 'ak=' + key, 'callback=' + callbackName].join('&');

      document.body.appendChild(script);
    });
  }
  return bmapPromise;
};





var getType = function getType(v) {
  return Object.prototype.toString.call(v);
};

var toKebab = function toKebab(v) {
  return v.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

var isArray = function isArray(v) {
  return getType(v) === '[object Array]';
};

var isObject = function isObject(v) {
  return getType(v) === '[object Object]';
};

var bmap = function bmap(_, __, settings) {
  var key = settings.key,
      v = settings.v,
      bmap = settings.bmap;

  if (!key) console.warn('settings.key must be a string.');

  return getBmap(key, v).then(function (_) {
    return { bmap: bmap };
  });
};

var Loading = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-component-loading" }, [_c('div', { staticClass: "loader" }, [_c('div', { staticClass: "loading-spinner" }, [_c('svg', { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c('circle', { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })])])])]);
  }, staticRenderFns: []
};

var DataEmpty = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-data-empty" }, [_vm._v(" 暂无数据 ")]);
  }, staticRenderFns: []
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var Core = {
  render: function render(h) {
    return h('div', {
      class: [toKebab(this.$options.name || this.$options._componentTag)],
      style: this.canvasStyle
    }, [h('div', {
      style: this.canvasStyle,
      ref: 'canvas'
    }), h(Loading, {
      style: { display: this.loading ? '' : 'none' }
    }), h(DataEmpty, {
      style: { display: this.dataEmpty ? '' : 'none' }
    }), this.$slots.default]);
  },


  props: {
    data: { type: [Object, Array], default: function _default() {
        return {};
      }
    },
    settings: { type: Object, default: function _default() {
        return {};
      }
    },
    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    beforeConfig: { type: Function },
    afterConfig: { type: Function },
    afterSetOption: { type: Function },
    afterSetOptionOnce: { type: Function },
    events: { type: Object },
    grid: { type: [Object, Array] },
    colors: { type: Array },
    tooltipVisible: { type: Boolean, default: true },
    legendVisible: { type: Boolean, default: true },
    legendPosition: { type: String },
    markLine: { type: Object },
    markArea: { type: Object },
    markPoint: { type: Object },
    visualMap: { type: [Object, Array] },
    dataZoom: { type: [Object, Array] },
    toolbox: { type: [Object, Array] },
    initOptions: { type: Object, default: function _default() {
        return {};
      }
    },
    title: Object,
    legend: [Object, Array],
    xAxis: [Object, Array],
    yAxis: [Object, Array],
    radar: Object,
    tooltip: Object,
    axisPointer: Object,
    brush: [Object, Array],
    geo: Object,
    timeline: [Object, Array],
    graphic: [Object, Array],
    series: [Object, Array],
    backgroundColor: [Object, String],
    textStyle: Object,
    animation: Object,
    theme: Object,
    themeName: String,
    loading: Boolean,
    dataEmpty: Boolean,
    extend: Object,
    judgeWidth: { type: Boolean, default: true },
    widthChangeDelay: { type: Number, default: 300 },
    tooltipFormatter: { type: Function }
  },

  watch: {
    data: {
      deep: true,
      handler: function handler(v) {
        if (v) {
          this.dataHandler(v);
        }
      }
    },

    settings: {
      deep: true,
      handler: function handler(v) {
        if (v.type && this.chartLib) this.chartHandler = this.chartLib[v.type];
        this.dataHandler(this.data);
      }
    },

    events: {
      deep: true,
      handler: function handler() {
        this.createEventProxy();
      }
    },

    theme: {
      deep: true,
      handler: function handler(v) {
        this.themeChange(v);
      }
    },

    themeName: function themeName(v) {
      this.themeChange(v);
    }
  },

  computed: {
    canvasStyle: function canvasStyle() {
      return {
        width: this.width,
        height: this.height,
        position: 'relative'
      };
    },
    chartColor: function chartColor() {
      return this.colors || this.theme && this.theme.color || color;
    }
  },

  methods: {
    dataHandler: function dataHandler(data) {
      if (!this.chartHandler) return;
      var _data = data,
          _data$columns = _data.columns,
          columns = _data$columns === undefined ? [] : _data$columns,
          _data$rows = _data.rows,
          rows = _data$rows === undefined ? [] : _data$rows;

      var extra = {
        tooltipVisible: this.tooltipVisible,
        legendVisible: this.legendVisible,
        echarts: this.echarts,
        color: this.chartColor,
        tooltipFormatter: this.tooltipFormatter
      };
      if (this.beforeConfig) data = this.beforeConfig(data);

      var options = this.chartHandler(columns, rows, this.settings, extra);
      if (options) {
        if (typeof options.then === 'function') {
          options.then(this.optionsHandler);
        } else {
          this.optionsHandler(options);
        }
      }
    },
    resize: function resize() {
      this.echarts.resize();
    },
    optionsHandler: function optionsHandler(options) {
      var _this = this;

      if (this.legendPosition && options.legend) {
        options.legend[this.legendPosition] = 10;
        if (~['left', 'right'].indexOf(this.legendPosition)) {
          options.legend.top = 'middle';
          options.legend.orient = 'vertical';
        }
      }
      if (!this.themeName) options.color = this.chartColor;
      var echartsSettings = ['grid', 'dataZoom', 'visualMap', 'toolbox', 'title', 'legend', 'xAxis', 'yAxis', 'radar', 'tooltip', 'axisPointer', 'brush', 'geo', 'timeline', 'graphic', 'series', 'backgroundColor', 'textStyle'];
      echartsSettings.forEach(function (setting) {
        if (_this[setting]) options[setting] = _this[setting];
      });
      if (this.animation) {
        Object.keys(this.animation).forEach(function (key) {
          options[key] = _this.animation[key];
        });
      }
      if (this.markArea || this.markLine || this.markPoint) {
        var marks = {
          markArea: this.markArea,
          markLine: this.markLine,
          markPoint: this.markPoint
        };
        var series = options.series;
        if (getType(series) === '[object Array]') {
          series.forEach(function (item) {
            _this.addMark(item, marks);
          });
        } else if (getType(series) === '[object Object]') {
          this.addMark(series, marks);
        }
      }

      // extend sub attribute
      if (this.extend) {
        Object.keys(this.extend).forEach(function (attr) {
          if (typeof _this.extend[attr] === 'function') {
            // get callback value
            options[attr] = _this.extend[attr](options[attr]);
          } else {
            // mixin extend value
            if (isArray(options[attr]) && isObject(options[attr][0])) {
              // eg: [{ xx: 1 }, { xx: 2 }]
              options[attr].forEach(function (option, index) {
                options[attr][index] = _extends({}, option, _this.extend[attr]);
              });
            } else if (isObject(options[attr])) {
              // eg: { xx: 1, yy: 2 }
              options[attr] = _extends({}, options[attr], _this.extend[attr]);
            } else {
              options[attr] = _this.extend[attr];
            }
          }
        });
      }

      if (this.afterConfig) options = this.afterConfig(options);
      this.echarts.setOption(options, true);
      this.$emit('ready', this.echarts);
      if (!this._once['ready-once']) {
        this._once['ready-once'] = true;
        this.$emit('ready-once', this.echarts);
      }
      if (this.judgeWidth) this.judgeWidthHandler(options);
      if (this.afterSetOption) this.afterSetOption(this.echarts);
      if (this.afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
        this._once['afterSetOptionOnce'] = this.afterSetOptionOnce(this.echarts);
      }
    },
    judgeWidthHandler: function judgeWidthHandler(options) {
      var _this2 = this;

      var echarts$$1 = this.echarts,
          widthChangeDelay = this.widthChangeDelay;

      if (this.$el.clientWidth) {
        echarts$$1 && echarts$$1.resize();
      } else {
        this.$nextTick(function (_) {
          if (_this2.$el.clientWidth) {
            echarts$$1 && echarts$$1.resize();
          } else {
            setTimeout(function (_) {
              echarts$$1 && echarts$$1.resize();
              if (!_this2.$el.clientWidth) {
                console.warn(' Can\'t get dom width or height ');
              }
            }, widthChangeDelay);
          }
        });
      }
    },
    addMark: function addMark(seriesItem, marks) {
      Object.keys(marks).forEach(function (key) {
        if (marks[key]) {
          seriesItem[key] = marks[key];
        }
      });
    },
    init: function init() {
      if (this.echarts) return;
      var themeName = this.themeName || this.theme || 've-chart';
      this.echarts = this.echartsLib.init(this.$refs.canvas, themeName, this.initOptions);
      if (this.data) this.dataHandler(this.data);
      this.createEventProxy();
      window.addEventListener('resize', this.echarts.resize);
    },
    addWatchToProps: function addWatchToProps() {
      var _this3 = this;

      var watchedVariable = this._watchers.map(function (watcher) {
        return watcher.expression;
      });
      Object.keys(this.$props).forEach(function (prop) {
        if (!~watchedVariable.indexOf(prop)) {
          var opts = {};
          if (getType(_this3.$props[prop]) === '[object Object]') {
            opts.deep = true;
          }
          _this3.$watch(prop, function () {
            _this3.dataHandler(_this3.data);
          }, opts);
        }
      });
    },
    createEventProxy: function createEventProxy() {
      var _this4 = this;

      // 只要用户使用 on 方法绑定的事件都做一层代理，
      // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
      // 实现 events 的动态响应
      var self = this;
      var keys = Object.keys(this.events || {});
      keys.length && keys.forEach(function (ev) {
        if (_this4.registeredEvents.indexOf(ev) === -1) {
          _this4.registeredEvents.push(ev);
          _this4.echarts.on(ev, function (ev) {
            return function () {
              if (ev in self.events) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                self.events[ev].apply(null, args);
              }
            };
          }(ev));
        }
      });
    },
    themeChange: function themeChange(theme) {
      this.clean();
      this.echarts = null;
      this.init();
    },
    clean: function clean() {
      window.removeEventListener('resize', this.echarts.resize);
      this.echarts.dispose();
    }
  },

  created: function created() {
    this.echarts = null;
    this.registeredEvents = [];
    this._once = {};
    this.addWatchToProps();
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.clean();
  }
};

var index = {
  name: 'VeBmap',
  mixins: [Core],
  created: function created() {
    this.chartHandler = bmap;
    this.echartsLib = echarts;
  }
};

return index;

})));
