'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/funnel');
require('echarts/lib/chart/radar');

var SIGN = '@_@';
var getLabelName = function getLabelName(item) {
  return item.split(SIGN)[0];
}; // TODO: delete
var getLegendName = function getLegendName(item) {
  return item.split(SIGN)[0];
};

var itemPoint = function itemPoint(color) {
  return ['<span style="', 'background-color:' + color + ';', 'display: inline-block;', 'width: 10px;', 'height: 10px;', 'border-radius: 50%;', 'margin-right:2px;', '"></span>'].join('');
};

echarts.registerTheme('ve-chart', {
  color: ['#19d4ae', '#5ab1ef', '#fa6e86', '#ffb980', '#0067a6', '#c4b4e4', '#d87a80', '#9cbbff', '#d9d0c7', '#87a997', '#d49ea2', '#5b4947', '#7ba3a8'],
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

var numberFormat = function numberFormat(val) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (isNaN(+val)) return val;

  var symbolMap = [{ value: 1E18, symbol: 'E' }, { value: 1E15, symbol: 'P' }, { value: 1E12, symbol: 'T' }, { value: 1E9, symbol: 'B' }, { value: 1E6, symbol: 'M' }, { value: 1E3, symbol: 'k' }];

  for (var i = 0; i < symbolMap.length; i++) {
    if (Math.abs(val) >= symbolMap[i].value) {
      return (val / symbolMap[i].value).toFixed(digits) + symbolMap[i].symbol;
    }
  }

  return val.toString();
};

var formatTausends = function formatTausends(num) {
  return String(num).replace(/^(\s+|-)?\d+(?=.?\d*($|\s))/g, function (m) {
    return m.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
  });
};

var getFormated = function getFormated(val, type) {
  switch (type) {
    case 'KMB':
      return numberFormat(val);
    case 'percent':
      return (val * 100).toFixed(2) + '%';
    case 'normal':
      return formatTausends(val);
    default:
      return val;
  }
};

var getStackMap = function getStackMap(stack) {
  var stackMap = {};
  Object.keys(stack).forEach(function (item) {
    stack[item].forEach(function (name) {
      stackMap[name] = item;
    });
  });
  return stackMap;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var dataHandler = {
  getBarLegends: function getBarLegends(_ref) {
    var measures = _ref.measures,
        axisSite = _ref.axisSite,
        meaAxisType = _ref.meaAxisType,
        isColumn = _ref.isColumn;

    var legends = [];

    var formatter = getLabelName;
    var secondAxis = isColumn ? axisSite.right : axisSite.top;
    measures.forEach(function (measure) {
      var legendItem = ~secondAxis.indexOf(measure) ? '' + measure + SIGN + meaAxisType[1] : '' + measure + SIGN + meaAxisType[0];
      legends.push(legendItem);
    });

    return legends.length ? { data: legends, formatter: formatter } : false;
  },
  getBarDimAxis: function getBarDimAxis(_ref2) {
    var rows = _ref2.rows,
        dimAxisName = _ref2.dimAxisName,
        dimensions = _ref2.dimensions;

    return dimensions.map(function (dimension) {
      return {
        type: 'category',
        name: dimAxisName,
        nameLocation: 'middle',
        nameGap: 22,
        data: rows.map(function (row) {
          return row[dimension];
        }),
        axisLabel: {
          formatter: function formatter(v) {
            return String(v);
          }
        }
      };
    });
  },
  getBarMeaAxis: function getBarMeaAxis(_ref3) {
    var columns = _ref3.columns,
        meaAxisName = _ref3.meaAxisName,
        measures = _ref3.measures,
        meaAxisType = _ref3.meaAxisType;

    var meaAxisBase = { type: 'value', axisTick: { show: false } };
    var meaAxis = [];

    var _loop = function _loop(i) {
      if (meaAxisType[i]) {
        meaAxis[i] = Object.assign({}, meaAxisBase, {
          axisLabel: {
            formatter: function formatter(val) {
              return getFormated(val, meaAxisType[i]);
            }
          }
        });
      } else {
        meaAxis[i] = Object.assign({}, meaAxisBase);
      }
      meaAxis[i].name = meaAxisName[i] || '';
    };

    for (var i = 0; i < 2; i++) {
      _loop(i);
    }

    return meaAxis;
  },
  getBarTooltip: function getBarTooltip() {
    return {
      trigger: 'axis',
      formatter: function formatter(items) {
        var tpl = [];
        var title = String(items[0].name).split(SIGN)[0];
        tpl.push(title + '<br>');
        items.forEach(function (item) {
          var _item$seriesName$spli = item.seriesName.split(SIGN),
              _item$seriesName$spli2 = slicedToArray(_item$seriesName$spli, 2),
              name = _item$seriesName$spli2[0],
              type = _item$seriesName$spli2[1];

          tpl.push(itemPoint(item.color));
          tpl.push(name + ': ');
          tpl.push(getFormated(item.value, type));
          tpl.push('<br>');
        });

        return tpl.join('');
      }
    };
  },
  getBarSeries: function getBarSeries(_ref4) {
    var rows = _ref4.rows,
        measures = _ref4.measures,
        stack = _ref4.stack,
        axisSite = _ref4.axisSite,
        meaAxisType = _ref4.meaAxisType,
        isColumn = _ref4.isColumn;

    var series = [];
    var seriesTemp = {};
    var secondAxis = isColumn ? axisSite.right : axisSite.top;
    var secondDimAxisIndex = isColumn ? 'yAxisIndex' : 'xAxisIndex';
    var stackMap = stack && getStackMap(stack);
    measures.forEach(function (measure) {
      seriesTemp[measure] = [];
    });
    rows.forEach(function (row) {
      measures.forEach(function (measure) {
        seriesTemp[measure].push(row[measure]);
      });
    });
    series = Object.keys(seriesTemp).map(function (item) {
      var itemName = ~secondAxis.indexOf(item) ? '' + item + SIGN + meaAxisType[1] : '' + item + SIGN + meaAxisType[0];
      var seriesItem = defineProperty({
        name: itemName,
        type: 'bar',
        data: seriesTemp[item]
      }, secondDimAxisIndex, ~secondAxis.indexOf(item) ? '1' : '0');

      if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

      return seriesItem;
    });

    return series.length ? series : false;
  }
};
var bar = function bar(columns, rows, settings) {
  var _settings$axisSite = settings.axisSite,
      axisSite = _settings$axisSite === undefined ? { top: [] } : _settings$axisSite,
      _settings$dimensions = settings.dimensions,
      dimensions = _settings$dimensions === undefined ? [columns[0]] : _settings$dimensions,
      _settings$stack = settings.stack,
      stack = _settings$stack === undefined ? {} : _settings$stack;

  var measures = columns.slice();
  if (settings.measures) {
    measures = settings.measures;
  } else {
    measures.splice(columns.indexOf(dimensions[0]), 1);
  }
  var meaAxisType = settings.xAxisType || ['normal', 'normal'];
  var meaAxisName = settings.xAxisName || [];
  var dimAxisName = settings.yAxisName || '';
  var isColumn = false;

  var legend = dataHandler.getBarLegends({ measures: measures, axisSite: axisSite, meaAxisType: meaAxisType, isColumn: isColumn });
  var yAxis = dataHandler.getBarDimAxis({ rows: rows, dimAxisName: dimAxisName, dimensions: dimensions });
  var xAxis = dataHandler.getBarMeaAxis({ columns: columns, meaAxisName: meaAxisName, measures: measures, meaAxisType: meaAxisType });
  var series = dataHandler.getBarSeries({ rows: rows, measures: measures, stack: stack, axisSite: axisSite, meaAxisType: meaAxisType, isColumn: isColumn });
  var tooltip = dataHandler.getBarTooltip();
  var options = { legend: legend, yAxis: yAxis, series: series, xAxis: xAxis, tooltip: tooltip };
  return options;
};

var column = function column(columns, rows, settings) {
  var _settings$axisSite2 = settings.axisSite,
      axisSite = _settings$axisSite2 === undefined ? { right: [] } : _settings$axisSite2,
      _settings$dimensions2 = settings.dimensions,
      dimensions = _settings$dimensions2 === undefined ? [columns[0]] : _settings$dimensions2,
      _settings$stack2 = settings.stack,
      stack = _settings$stack2 === undefined ? {} : _settings$stack2;

  var measures = columns.slice();
  if (settings.measures) {
    measures = settings.measures;
  } else {
    measures.splice(columns.indexOf(dimensions[0]), 1);
  }
  var meaAxisType = settings.yAxisType || ['normal', 'normal'];
  var meaAxisName = settings.yAxisName || [];
  var dimAxisName = settings.xAxisName || '';
  var isColumn = true;

  var legend = dataHandler.getBarLegends({ measures: measures, axisSite: axisSite, meaAxisType: meaAxisType, isColumn: isColumn });
  var xAxis = dataHandler.getBarDimAxis({ rows: rows, dimAxisName: dimAxisName, dimensions: dimensions });
  var yAxis = dataHandler.getBarMeaAxis({ columns: columns, meaAxisName: meaAxisName, measures: measures, meaAxisType: meaAxisType });
  var series = dataHandler.getBarSeries({ rows: rows, measures: measures, stack: stack, axisSite: axisSite, meaAxisType: meaAxisType, isColumn: isColumn });
  var tooltip = dataHandler.getBarTooltip();
  var options = { legend: legend, yAxis: yAxis, series: series, xAxis: xAxis, tooltip: tooltip };
  return options;
};

var chartMixin = {
  props: {
    data: { type: [Object, Array], default: null },
    settings: { type: Object, default: function _default() {
        return {};
      }
    },
    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    beforeConfig: { type: Function },
    afterConfig: { type: Function },
    events: { type: Object }
  },

  watch: {
    data: function data(v) {
      var dataKeys = Object.keys(v);
      var dataKeyProp = v.key;
      if (dataKeyProp && Array.isArray(dataKeyProp) && dataKeyProp.length || dataKeys.length) {
        this.dataHandler(v);
      }
    },

    settings: {
      deep: true,
      handler: function handler(v) {
        this.chartHandler = this.chartLib[v.type];
        this.dataHandler(this.data);
      }
    }
  },

  computed: {
    canvasStyle: function canvasStyle() {
      return { width: this.width, height: this.height };
    }
  },

  methods: {
    dataHandler: function dataHandler(data) {
      if (!this.chartHandler) return;
      if (!data || !Array.isArray(data.columns) || !Array.isArray(data.rows)) return false;
      var _data = data,
          columns = _data.columns,
          rows = _data.rows;

      if (this.beforeConfig) data = this.beforeConfig(data);
      var options = this.chartHandler(columns, rows, this.settings);

      if (Array.isArray(this.settings.color)) options.color = this.settings.color;
      if (this.settings.grid) options.grid = this.settings.grid;
      if (this.settings.scaleX) options.xAxis.scale = true;
      if (this.settings.scaleY) options.yAxis.scale = true;

      if (this.afterConfig) options = this.afterConfig(options);
      if (options) this.echarts.setOption(options, true);
    },
    init: function init() {
      if (this.echarts) return;
      this.echarts = this.echartsLib.init(this.$refs.canvas, 've-chart');
      if (this.data) this.dataHandler(this.data);
      if (this.events) this.bindEvents();
    },
    bindEvents: function bindEvents() {
      var _this = this;

      Object.keys(this.events).forEach(function (event) {
        _this.echarts.on(event, _this.events[event]);
      });
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.init();
      window.addEventListener('resize', _this2.echarts.resize);
    });
  },
  beforeDestory: function beforeDestory() {
    window.removeEventListener('resize', this.echarts.resize);
    this.echarts.dispose();
  }
};

var index = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeBar',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = bar;
    this.echartsLib = echarts;
  }
};

var column$1 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeColumn',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = column;
    this.echartsLib = echarts;
  }
};

var dataHandler$1 = {
  getLineLegends: function getLineLegends(_ref) {
    var measures = _ref.measures,
        axisSite = _ref.axisSite,
        yAxisType = _ref.yAxisType;

    var legends = [];

    var formatter = getLegendName;

    measures.forEach(function (measure) {
      var legendItem = ~axisSite.right.indexOf(measure) ? '' + measure + SIGN + yAxisType[1] : '' + measure + SIGN + yAxisType[0];
      legends.push(legendItem);
    });

    return legends.length ? { data: legends, formatter: formatter } : false;
  },
  getLineXAxis: function getLineXAxis(_ref2) {
    var dimensions = _ref2.dimensions,
        rows = _ref2.rows,
        xAxisName = _ref2.xAxisName;

    return dimensions.map(function (dimension, index) {
      return {
        type: 'category',
        nameLocation: 'middle',
        nameGap: 22,
        boundaryGap: false,
        name: xAxisName[index] || '',
        axisTick: { show: true, lineStyle: { color: '#eee' } },
        data: rows.map(function (row) {
          return row[dimension];
        }),
        axisLabel: {
          formatter: function formatter(v) {
            return String(v);
          }
        }
      };
    });
  },
  getLineSeries: function getLineSeries(_ref3) {
    var rows = _ref3.rows,
        axisSite = _ref3.axisSite,
        yAxisType = _ref3.yAxisType,
        dimensions = _ref3.dimensions,
        measures = _ref3.measures,
        area = _ref3.area,
        stack = _ref3.stack;

    var series = [];
    var dataTemp = {};
    var stackMap = stack && getStackMap(stack);
    measures.forEach(function (measure) {
      dataTemp[measure] = [];
    });
    rows.forEach(function (row) {
      measures.forEach(function (measure) {
        dataTemp[measure].push(row[measure] || 0);
      });
    });
    measures.forEach(function (measure) {
      var seriesItem = {
        name: measure,
        type: 'line',
        data: dataTemp[measure]
      };

      if (area) seriesItem.areaStyle = { normal: {} };

      if (~axisSite.right.indexOf(measure)) {
        seriesItem.yAxisIndex = 1;
        seriesItem.name = '' + measure + SIGN + yAxisType[1];
      } else {
        seriesItem.yAxisIndex = 0;
        seriesItem.name = '' + measure + SIGN + yAxisType[0];
      }

      if (stack && stackMap[measure]) seriesItem.stack = stackMap[measure];

      series.push(seriesItem);
    });
    return series.length ? series : false;
  },
  getLineYAxis: function getLineYAxis(_ref4) {
    var yAxisName = _ref4.yAxisName,
        yAxisType = _ref4.yAxisType;

    var yAxisBase = { type: 'value', axisTick: { show: false } };
    var yAxis = [];

    var _loop = function _loop(i) {
      if (yAxisType[i]) {
        yAxis[i] = Object.assign({}, yAxisBase, {
          axisLabel: {
            formatter: function formatter(val) {
              return getFormated(val, yAxisType[i]);
            }
          }
        });
      } else {
        yAxis[i] = Object.assign({}, yAxisBase);
      }
      yAxis[i].name = yAxisName[i] || '';
    };

    for (var i = 0; i < 2; i++) {
      _loop(i);
    }
    return yAxis;
  },
  getLineTooltip: function getLineTooltip() {
    return {
      trigger: 'axis',
      formatter: function formatter(items) {
        var tpl = [];
        tpl.push(items[0].name + '<br>');
        items.forEach(function (item) {
          var showData = void 0;

          var _item$seriesName$spli = item.seriesName.split(SIGN),
              _item$seriesName$spli2 = slicedToArray(_item$seriesName$spli, 2),
              name = _item$seriesName$spli2[0],
              type = _item$seriesName$spli2[1];

          showData = getFormated(item.data, type);
          tpl.push(itemPoint(item.color));
          tpl.push(name + ': ' + showData);
          tpl.push('<br>');
        });
        return tpl.join('');
      }
    };
  }
};

var line = function line(columns, rows, settings) {
  var _settings$axisSite = settings.axisSite,
      axisSite = _settings$axisSite === undefined ? { right: [] } : _settings$axisSite,
      _settings$yAxisType = settings.yAxisType,
      yAxisType = _settings$yAxisType === undefined ? ['normal', 'normal'] : _settings$yAxisType,
      _settings$yAxisName = settings.yAxisName,
      yAxisName = _settings$yAxisName === undefined ? [] : _settings$yAxisName,
      _settings$dimensions = settings.dimensions,
      dimensions = _settings$dimensions === undefined ? [columns[0]] : _settings$dimensions,
      _settings$xAxisName = settings.xAxisName,
      xAxisName = _settings$xAxisName === undefined ? [] : _settings$xAxisName,
      area = settings.area,
      stack = settings.stack;

  var measures = columns.slice();
  if (settings.measures) {
    measures = settings.measures;
  } else {
    measures.splice(columns.indexOf(dimensions[0]), 1);
  }
  var legend = dataHandler$1.getLineLegends({ measures: measures, axisSite: axisSite, yAxisType: yAxisType });
  var tooltip = dataHandler$1.getLineTooltip();
  var xAxis = dataHandler$1.getLineXAxis({ dimensions: dimensions, rows: rows, xAxisName: xAxisName });
  var yAxis = dataHandler$1.getLineYAxis({ yAxisName: yAxisName, yAxisType: yAxisType });
  var series = dataHandler$1.getLineSeries({ rows: rows, stack: stack, axisSite: axisSite, yAxisType: yAxisType, dimensions: dimensions, measures: measures, area: area });
  if (!legend || !xAxis || !series) return false;

  var options = { legend: legend, xAxis: xAxis, series: series, yAxis: yAxis, tooltip: tooltip };
  return options;
};

var index$1 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeLine',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = line;
    this.echartsLib = echarts;
  }
};

var pieRadius = 100;
var ringRadius = [80, 100];
var pieOffsetY = 200;

var dataHandler$2 = {
  getPieSeries: function getPieSeries(args) {
    var rows = args.rows,
        dataType = args.dataType,
        percentShow = args.percentShow,
        dimension = args.dimension,
        measure = args.measure,
        radius = args.radius,
        offsetY = args.offsetY;


    var series = {
      type: 'pie',
      radius: radius,
      data: [],
      center: ['50%', offsetY]
    };
    if (percentShow) {
      series.label = {
        normal: {
          show: true,
          formatter: function formatter(item) {
            var tpl = [];
            tpl.push(item.name + ':');
            tpl.push(getFormated(item.value, dataType));
            tpl.push('(' + item.percent + '%)');
            return tpl.join(' ');
          }
        }
      };
    }
    series.data = rows.map(function (row) {
      return { name: row[dimension], value: row[measure] };
    });

    return series;
  },
  getPieLegend: function getPieLegend(_ref) {
    var rows = _ref.rows,
        dimension = _ref.dimension,
        legendLimit = _ref.legendLimit;

    var legend = rows.map(function (row) {
      return row[dimension];
    });
    return legend.length ? { data: legend, show: legend.length < legendLimit } : false;
  },
  getPieTooltip: function getPieTooltip(dataType) {
    return {
      formatter: function formatter(item) {
        var tpl = [];
        tpl.push(itemPoint(item.color));
        tpl.push(item.name + ':');
        tpl.push(getFormated(item.value, dataType));
        tpl.push('(' + item.percent + '%)');
        return tpl.join(' ');
      }
    };
  }
};

var pie = function pie(columns, rows, settings, isRing) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      percentShow = settings.percentShow,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$measure = settings.measure,
      measure = _settings$measure === undefined ? columns[1] : _settings$measure,
      _settings$radius = settings.radius,
      radius = _settings$radius === undefined ? isRing ? ringRadius : pieRadius : _settings$radius,
      _settings$offsetY = settings.offsetY,
      offsetY = _settings$offsetY === undefined ? pieOffsetY : _settings$offsetY,
      _settings$legendLimit = settings.legendLimit,
      legendLimit = _settings$legendLimit === undefined ? 30 : _settings$legendLimit;


  var series = dataHandler$2.getPieSeries({
    rows: rows, dataType: dataType, percentShow: percentShow, dimension: dimension, measure: measure, radius: radius, offsetY: offsetY
  });
  var legend = dataHandler$2.getPieLegend({ rows: rows, dimension: dimension, legendLimit: legendLimit });
  var tooltip = dataHandler$2.getPieTooltip(dataType);
  if (!legend) return false;
  var options = { series: series, legend: legend, tooltip: tooltip };
  return options;
};

var ring = function ring(columns, rows, settings) {
  return pie(columns, rows, settings, true);
};

var index$2 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VePie',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = pie;
    this.echartsLib = echarts;
  }
};

var ring$1 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeRing',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = ring;
    this.echartsLib = echarts;
  }
};

var dataHandler$3 = {
  getWaterfallTooltip: function getWaterfallTooltip(dataType) {
    return {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function formatter(items) {
        var item = items[1];
        return [item.name + '<br/>' + item.seriesName + ' :', '' + getFormated(item.value, dataType)].join('');
      }
    };
  },
  getWaterfallXAxis: function getWaterfallXAxis(_ref) {
    var dimension = _ref.dimension,
        rows = _ref.rows,
        remainStatus = _ref.remainStatus,
        totalName = _ref.totalName,
        remainName = _ref.remainName,
        xAxisName = _ref.xAxisName;

    var xAxisData = [totalName].concat(rows.map(function (row) {
      return row[dimension];
    }));
    if (remainStatus === 'have-remain') xAxisData = xAxisData.concat([remainName]);

    return {
      type: 'category',
      name: xAxisName,
      splitLine: { show: false },
      data: xAxisData
    };
  },
  getWaterfallYAxis: function getWaterfallYAxis(_ref2) {
    var dataType = _ref2.dataType,
        yAxisName = _ref2.yAxisName;

    return {
      type: 'value',
      name: yAxisName,
      axisTick: { show: false },
      axisLabel: {
        formatter: function formatter(val) {
          return getFormated(val, dataType);
        }
      }
    };
  },
  getWaterfallSeries: function getWaterfallSeries(_ref3) {
    var dataType = _ref3.dataType,
        rows = _ref3.rows,
        dimension = _ref3.dimension,
        measure = _ref3.measure,
        totalNum = _ref3.totalNum,
        remainStatus = _ref3.remainStatus,
        dataSum = _ref3.dataSum;

    var seriesBase = { type: 'bar', stack: '总量' };
    var dataSumTemp = dataSum;
    var totalNumTemp = totalNum;
    var assistData = void 0;
    var mainData = void 0;
    var rowData = rows.map(function (row) {
      return row[measure];
    });

    if (remainStatus === 'have-remain') {
      assistData = [0].concat(rows.map(function (row) {
        totalNumTemp -= row[measure];
        return totalNumTemp;
      })).concat([0]);
      mainData = [totalNum].concat(rowData).concat([totalNum - dataSum]);
    } else {
      assistData = [0].concat(rows.map(function (row) {
        dataSumTemp -= row[measure];
        return dataSumTemp;
      }));
      mainData = [dataSum].concat(rowData);
    }
    var series = [];

    series.push(Object.assign({
      name: '辅助',
      itemStyle: {
        normal: { opacity: 0 },
        emphasis: { opacity: 0 }
      },
      data: assistData
    }, seriesBase));

    series.push(Object.assign({
      name: '数值',
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: function formatter(item) {
            return getFormated(item.value, dataType);
          }
        }
      },
      data: mainData
    }, seriesBase));
    return series;
  },
  getWaterfallRemainStatus: function getWaterfallRemainStatus(_ref4) {
    var dataSum = _ref4.dataSum,
        totalNum = _ref4.totalNum;

    if (!totalNum) return 'not-total';
    return totalNum > dataSum ? 'have-remain' : 'none-remain';
  }
};

var waterfall = function waterfall(columns, rows, settings) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$totalName = settings.totalName,
      totalName = _settings$totalName === undefined ? '总计' : _settings$totalName,
      totalNum = settings.totalNum,
      _settings$remainName = settings.remainName,
      remainName = _settings$remainName === undefined ? '其他' : _settings$remainName,
      _settings$xAxisName = settings.xAxisName,
      xAxisName = _settings$xAxisName === undefined ? dimension : _settings$xAxisName;

  var measureTemp = columns.slice();
  measureTemp.splice(measureTemp.indexOf(dimension), 1);
  var measure = measureTemp[0];
  var yAxisName = measure;
  var tooltip = dataHandler$3.getWaterfallTooltip(dataType);
  var dataSum = rows.reduce(function (pre, cur) {
    return pre + Number(cur[measure]);
  }, 0).toFixed(2);
  var remainStatus = dataHandler$3.getWaterfallRemainStatus({ dataSum: dataSum, dimension: dimension, totalNum: totalNum });
  var xAxis = dataHandler$3.getWaterfallXAxis({ dimension: dimension, rows: rows, remainStatus: remainStatus, totalName: totalName, remainName: remainName, xAxisName: xAxisName });
  var yAxis = dataHandler$3.getWaterfallYAxis({ dataType: dataType, yAxisName: yAxisName });
  var series = dataHandler$3.getWaterfallSeries({ dataType: dataType, rows: rows, dimension: dimension, measure: measure, totalNum: totalNum, remainStatus: remainStatus, dataSum: dataSum });
  var options = { tooltip: tooltip, xAxis: xAxis, yAxis: yAxis, series: series };
  return options;
};

var index$3 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeWaterfall',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = waterfall;
    this.echartsLib = echarts;
  }
};

var dataHandler$4 = {
  getFunnelTooltip: function getFunnelTooltip() {
    return {
      trigger: 'item',
      formatter: function formatter(item) {
        var tpl = [];
        var name = item.name.split(SIGN)[0];
        var type = item.name.split(SIGN)[1];
        tpl.push(itemPoint(item.color));
        tpl.push(name + ': ' + getFormated(item.data.realValue, type));
        return tpl.join('');
      }
    };
  },
  getFunnelLegend: function getFunnelLegend(_ref) {
    var dimension = _ref.dimension,
        measure = _ref.measure,
        rows = _ref.rows,
        sequence = _ref.sequence,
        dataType = _ref.dataType;

    var legendData = sequence.map(function (item) {
      return '' + item + SIGN + dataType;
    });
    var formatter = getLegendName;

    return { data: legendData, formatter: formatter };
  },
  getFunnelSeries: function getFunnelSeries(_ref2) {
    var dimension = _ref2.dimension,
        measure = _ref2.measure,
        rows = _ref2.rows,
        sequence = _ref2.sequence,
        dataType = _ref2.dataType,
        ascending = _ref2.ascending;

    var series = {
      type: 'funnel',
      label: { normal: {
          formatter: function formatter(item) {
            return item.name.split(SIGN)[0];
          }
        } }
    };
    rows.sort(function (a, b) {
      return sequence.indexOf(a[dimension]) - sequence.indexOf(b[dimension]);
    });

    var falseFunnel = false;
    rows.some(function (row, index) {
      if (index && row[measure] > rows[index - 1][measure]) {
        falseFunnel = true;
        return true;
      }
    });

    var step = 100 / rows.length;

    if (falseFunnel) {
      series.data = rows.slice().reverse().map(function (row, index) {
        return {
          name: '' + row[dimension] + SIGN + dataType,
          value: (index + 1) * step,
          realValue: row[measure]
        };
      });
    } else {
      series.data = rows.map(function (row) {
        return {
          name: '' + row[dimension] + SIGN + dataType,
          value: row[measure],
          realValue: row[measure]
        };
      });
    }

    if (ascending) series.sort = 'ascending';
    return series;
  }
};

var funnel = function funnel(columns, rows, settings) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$sequence = settings.sequence,
      sequence = _settings$sequence === undefined ? rows.map(function (row) {
    return row[dimension];
  }) : _settings$sequence,
      ascending = settings.ascending;

  var measure = void 0;
  if (settings.measure) {
    measure = settings.measure;
  } else {
    var measureTemp = columns.slice();
    measureTemp.splice(columns.indexOf(dimension), 1);
    measure = measureTemp[0];
  }

  var tooltip = dataHandler$4.getFunnelTooltip();
  var legend = dataHandler$4.getFunnelLegend({ dimension: dimension, measure: measure, rows: rows, sequence: sequence, dataType: dataType });
  var series = dataHandler$4.getFunnelSeries({ dimension: dimension, measure: measure, rows: rows, sequence: sequence, dataType: dataType, ascending: ascending });
  var options = { tooltip: tooltip, legend: legend, series: series };
  return options;
};

var index$4 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeFunnel',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = funnel;
    this.echartsLib = echarts;
  }
};

var dataHandler$5 = {
  getRadarLegend: function getRadarLegend(_ref) {
    var rows = _ref.rows,
        dimension = _ref.dimension;

    var legendData = rows.map(function (row) {
      return row[dimension];
    });

    return { data: legendData };
  },
  getRadarTooltip: function getRadarTooltip(_ref2) {
    var dataType = _ref2.dataType,
        radar = _ref2.radar;

    var typeTemp = [];
    var nameTemp = [];
    radar.indicator.map(function (item, index) {
      typeTemp[index] = dataType[item.name];
      nameTemp[index] = item.name;
    });
    return {
      formatter: function formatter(item) {
        var tpl = [];
        tpl.push(itemPoint(item.color));
        tpl.push(item.seriesName + '<br />');
        item.data.forEach(function (val, index) {
          tpl.push(nameTemp[index] + ': ');
          tpl.push(getFormated(val, typeTemp[index]) + '<br />');
        });
        return tpl.join('');
      }
    };
  },
  getRadarSetting: function getRadarSetting(_ref3) {
    var rows = _ref3.rows,
        dimension = _ref3.dimension,
        measures = _ref3.measures;

    var settingBase = {
      indicator: [],
      shape: 'circle',
      splitNumber: 5
    };
    var indicatorTemp = {};
    rows.forEach(function (items) {
      measures.forEach(function (measure) {
        if (!indicatorTemp[measure]) {
          indicatorTemp[measure] = [items[measure]];
        } else {
          indicatorTemp[measure].push(items[measure]);
        }
      });
    });
    settingBase.indicator = Object.keys(indicatorTemp).map(function (key) {
      return {
        name: key,
        max: Math.max.apply(null, indicatorTemp[key])
      };
    });
    return settingBase;
  },
  getRadarSeries: function getRadarSeries(_ref4) {
    var rows = _ref4.rows,
        dimension = _ref4.dimension,
        measures = _ref4.measures,
        radar = _ref4.radar;

    var radarIndexObj = {};
    radar.indicator.forEach(function (item, index) {
      radarIndexObj[item.name] = index;
    });

    var series = rows.map(function (row) {
      var seriesBase = {
        name: row[dimension],
        type: 'radar',
        data: []
      };
      var dataArr = [];
      Object.keys(row).forEach(function (key) {
        if (~measures.indexOf(key)) dataArr[radarIndexObj[key]] = row[key];
      });
      seriesBase.data.push(dataArr);
      return seriesBase;
    });
    return series;
  }
};

var radar = function radar(columns, rows, settings) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? {} : _settings$dataType,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension;

  var measures = columns.slice();
  if (settings.measures) {
    measures = settings.measures;
  } else {
    measures.splice(columns.indexOf(dimension), 1);
  }
  var legend = dataHandler$5.getRadarLegend({ rows: rows, dimension: dimension });
  var radar = dataHandler$5.getRadarSetting({ rows: rows, dimension: dimension, measures: measures });
  var tooltip = dataHandler$5.getRadarTooltip({ dataType: dataType, radar: radar });
  var series = dataHandler$5.getRadarSeries({ rows: rows, dimension: dimension, measures: measures, radar: radar });
  var options = { legend: legend, tooltip: tooltip, radar: radar, series: series };
  return options;
};

var index$5 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeRadar',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = radar;
    this.echartsLib = echarts;
  }
};

var index$6 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeChart',
  mixins: [chartMixin],
  created: function created() {
    this.chartLib = { bar: bar, column: column, line: line, pie: pie, ring: ring, funnel: funnel, radar: radar, waterfall: waterfall };
    this.chartHandler = this.chartLib[this.settings.type];
    this.echartsLib = echarts;
  }
};

exports.VeBar = index;
exports.VeColumn = column$1;
exports.VeRing = ring$1;
exports.VeLine = index$1;
exports.VePie = index$2;
exports.VeWaterfall = index$3;
exports.VeFunnel = index$4;
exports.VeRadar = index$5;
exports.VeChart = index$6;
