(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('echarts/lib/echarts'), require('echarts/lib/component/tooltip'), require('echarts/lib/component/legend'), require('numerify/lib/index.es'), require('echarts/lib/chart/gauge')) :
  typeof define === 'function' && define.amd ? define(['echarts/lib/echarts', 'echarts/lib/component/tooltip', 'echarts/lib/component/legend', 'numerify/lib/index.es', 'echarts/lib/chart/gauge'], factory) :
  (global.VeGauge = factory(global.echarts,null,null,global.numerify));
}(this, (function (echarts,tooltip,legend,numerify) { 'use strict';

  echarts = echarts && echarts.hasOwnProperty('default') ? echarts['default'] : echarts;
  numerify = numerify && numerify.hasOwnProperty('default') ? numerify['default'] : numerify;

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

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var self = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(self, args);
      }, delay);
    };
  }

  function getType(v) {
    return Object.prototype.toString.call(v);
  }

  function isObject(v) {
    return getType(v) === '[object Object]';
  }

  function isArray(v) {
    return getType(v) === '[object Array]';
  }

  function isFunction(v) {
    return getType(v) === '[object Function]';
  }

  function camelToKebab(s) {
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  var getFormated = function getFormated(val, type, digit) {
    var defaultVal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '-';

    if (isNaN(val)) return defaultVal;
    if (!type) return val;
    if (isFunction(type)) return type(val, numerify);

    digit = isNaN(digit) ? 0 : ++digit;
    var digitStr = '.[' + new Array(digit).join(0) + ']';
    var formatter = type;
    switch (type) {
      case 'KMB':
        formatter = digit ? '0,0' + digitStr + 'a' : '0,0a';
        break;
      case 'normal':
        formatter = digit ? '0,0' + digitStr : '0,0';
        break;
      case 'percent':
        formatter = digit ? '0,0' + digitStr + '%' : '0,0.[00]%';
        break;
    }
    return numerify(val, formatter);
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

  function getTooltip(args) {
    var tooltipFormatter = args.tooltipFormatter,
        dataType = args.dataType,
        digit = args.digit;

    return {
      formatter: function formatter(options) {
        var seriesName = options.seriesName,
            _options$data = options.data,
            value = _options$data.value,
            name = _options$data.name;

        if (tooltipFormatter) {
          return tooltipFormatter.apply(null, arguments);
        }
        var tpl = [];
        tpl.push(seriesName + ': ');
        tpl.push(getFormated(value, dataType[seriesName], digit) + ' ' + name);
        return tpl.join('');
      }
    };
  }

  function getSeries(args) {
    var rows = args.rows,
        dimension = args.dimension,
        metrics = args.metrics,
        digit = args.digit,
        dataType = args.dataType,
        labelMap = args.labelMap,
        seriesMap = args.seriesMap,
        dataName = args.dataName;


    var series = rows.map(function (row) {
      var label = row[dimension];
      var seriesItem = seriesMap[label];
      var result = {
        type: 'gauge',
        name: labelMap[label] != null ? labelMap[label] : label,
        data: [{
          name: dataName[label] || '',
          value: row[metrics]
        }],
        detail: {
          formatter: function formatter(v) {
            return getFormated(v, dataType[label], digit);
          }
        },
        axisLabel: {
          formatter: function formatter(v) {
            return getFormated(v, dataType[label], digit);
          }
        }
      };

      if (seriesItem) {
        Object.keys(seriesItem).forEach(function (key) {
          if (isObject(result[key])) {
            _extends(result[key], seriesItem[key]);
          } else {
            result[key] = seriesItem[key];
          }
        });
      }

      return result;
    });

    return series;
  }

  var gauge$1 = function gauge$$1(columns, rows, settings, extra) {
    var _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? {} : _settings$dataType,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        _settings$seriesMap = settings.seriesMap,
        seriesMap = _settings$seriesMap === undefined ? {} : _settings$seriesMap,
        _settings$dataName = settings.dataName,
        dataName = _settings$dataName === undefined ? {} : _settings$dataName;
    var tooltipFormatter = extra.tooltipFormatter,
        tooltipVisible = extra.tooltipVisible;


    var tooltip$$1 = tooltipVisible && getTooltip({
      tooltipFormatter: tooltipFormatter,
      dataType: dataType
    });

    var series = getSeries({
      rows: rows,
      dimension: dimension,
      metrics: metrics,
      digit: digit,
      dataType: dataType,
      labelMap: labelMap,
      seriesMap: seriesMap,
      dataName: dataName
    });
    return { tooltip: tooltip$$1, series: series };
  };

  var Loading = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-component-loading" }, [_c('div', { staticClass: "loader" }, [_c('div', { staticClass: "loading-spinner" }, [_c('svg', { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c('circle', { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })])])])]);
    }, staticRenderFns: []
  };

  var DataEmpty = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-data-empty" }, [_vm._v(" 暂无数据 ")]);
    }, staticRenderFns: []
  };

  var STATIC_PROPS = ['initOptions', 'loading', 'dataEmpty', 'judgeWidth', 'widthChangeDelay'];

  var Core = {
    render: function render(h) {
      return h('div', {
        class: [camelToKebab(this.$options.name || this.$options._componentTag)],
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
      title: [Object, Array],
      legend: [Object, Array],
      xAxis: [Object, Array],
      yAxis: [Object, Array],
      radar: Object,
      tooltip: Object,
      axisPointer: [Object, Array],
      brush: [Object, Array],
      geo: [Object, Array],
      timeline: [Object, Array],
      graphic: [Object, Array],
      series: [Object, Array],
      backgroundColor: [Object, String],
      textStyle: [Object, Array],
      animation: Object,
      theme: Object,
      themeName: String,
      loading: Boolean,
      dataEmpty: Boolean,
      extend: Object,
      judgeWidth: { type: Boolean, default: false },
      widthChangeDelay: { type: Number, default: 300 },
      tooltipFormatter: { type: Function },
      resizeable: { type: Boolean, default: true },
      resizeDelay: { type: Number, default: 200 },
      changeDelay: { type: Number, default: 0 },
      setOptionOpts: { type: [Boolean, Object], default: true }
    },

    watch: {
      data: {
        deep: true,
        handler: function handler(v) {
          if (v) {
            this.changeHandler();
          }
        }
      },

      settings: {
        deep: true,
        handler: function handler(v) {
          if (v.type && this.chartLib) this.chartHandler = this.chartLib[v.type];
          this.changeHandler();
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
      dataHandler: function dataHandler() {
        if (!this.chartHandler) return;
        var data = this.data;
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
          tooltipFormatter: this.tooltipFormatter,
          _once: this._once
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
        this.echarts.setOption(options, this.setOptionOpts);
        this.$emit('ready', this.echarts);
        if (!this._once['ready-once']) {
          this._once['ready-once'] = true;
          this.$emit('ready-once', this.echarts);
        }
        if (this.judgeWidth) this.judgeWidthHandler(options);
        if (this.afterSetOption) this.afterSetOption(this.echarts);
        if (this.afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
          this._once['afterSetOptionOnce'] = true;
          this.afterSetOptionOnce(this.echarts);
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
        if (this.data) this.changeHandler();
        this.createEventProxy();
        if (this.resizeable) window.addEventListener('resize', this.resizeHandler);
      },
      addWatchToProps: function addWatchToProps() {
        var _this3 = this;

        var watchedVariable = this._watchers.map(function (watcher) {
          return watcher.expression;
        });
        Object.keys(this.$props).forEach(function (prop) {
          if (!~watchedVariable.indexOf(prop) && !~STATIC_PROPS.indexOf(prop)) {
            var opts = {};
            if (~['[object Object]', '[object Array]'].indexOf(getType(_this3.$props[prop]))) {
              opts.deep = true;
            }
            _this3.$watch(prop, function () {
              _this3.changeHandler();
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
        if (this.resizeable) window.removeEventListener('resize', this.resizeHandler);
        this.echarts.dispose();
      }
    },

    created: function created() {
      var _this5 = this;

      this.echarts = null;
      this.registeredEvents = [];
      this._once = {};
      this.resizeHandler = debounce(function (_) {
        _this5.echarts && _this5.echarts.resize();
      }, this.resizeDelay);
      this.changeHandler = debounce(function (_) {
        _this5.dataHandler();
      }, this.changeDelay);
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
    name: 'VeGauge',
    mixins: [Core],
    created: function created() {
      this.chartHandler = gauge$1;
      this.echartsLib = echarts;
    }
  };

  return index;

})));
