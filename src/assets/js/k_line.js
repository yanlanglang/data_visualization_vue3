// K线图

//调用该方法，得到option对象
var optionMethod = (data, upColor, downColor) => {
  return {
    animation: false,
    legend: {
      bottom: 10,
      left: "center",
      data: ["Dow-Jones index", "MA5", "MA10", "MA20", "MA30"],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      textStyle: {
        color: "#000",
      },
      position: function (pos, params, el, elRect, size) {
        const obj = {
          top: 10,
        };
        obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      // extraCssText: 'width: 170px'
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: "all",
        },
      ],
      label: {
        backgroundColor: "#777",
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
        brush: {
          type: ["lineX", "clear"],
        },
      },
    },
    brush: {
      xAxisIndex: "all",
      brushLink: "all",
      outOfBrush: {
        colorAlpha: 0.1,
      },
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: upColor,
        },
        {
          value: -1,
          color: downColor,
        },
      ],
    },
    grid: [
      {
        left: "10%",
        right: "8%",
        height: "50%",
      },
      {
        left: "10%",
        right: "8%",
        top: "63%",
        height: "16%",
      },
    ],
    xAxis: [
      {
        type: "category",
        data: data.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100,
        },
      },
      {
        type: "category",
        gridIndex: 1,
        data: data.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 98,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: "slider",
        top: "85%",
        start: 98,
        end: 100,
      },
    ],
    //历史信息相关
    series: [
      {
        name: "Dow-Jones index",
        type: "candlestick",
        data: data.values,
        itemStyle: {
          color: downColor,
          color0: upColor,
          borderColor: undefined,
          borderColor0: undefined,
        },
        tooltip: {
          formatter: function (param) {
            param = param[0];
            return [
              "Date: " + param.name + '<hr size=1 style="margin: 3px 0">',
              "Open: " + param.data[0] + "<br/>",
              "Close: " + param.data[1] + "<br/>",
              "Lowest: " + param.data[2] + "<br/>",
              "Highest: " + param.data[3] + "<br/>",
            ].join("");
          },
        },
      },
      {
        name: "MA5",
        type: "line",
        data: calculateMAMethod(5, data),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA10",
        type: "line",
        data: calculateMAMethod(10, data),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA20",
        type: "line",
        data: calculateMAMethod(20, data),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA30",
        type: "line",
        data: calculateMAMethod(30, data),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "Volume",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes,
      },
    ],
  };
};

//得到dispatchAction对象
var dispatchAction = {
  type: "brush",
  areas: [
    {
      brushType: "lineX",
      coordRange: ["2022-9-02", "2022-11-27"],
      xAxisIndex: 0,
    },
  ],
};

// 计算Ma
var calculateMAMethod = (dayCount, data) => {
  var result = [];
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
};

/**
[
    [
        "2004-01-02",
        10452.74,
        10409.85,
        10367.41,
        10554.96,
        168890000
    ],
    ...
]
 */
//处理历史数据open、close、lowest、highest、volume
var splitDataMethod = (rawData) => {
  //每个元素代表日期
  let categoryData = [];
  //每个元素包含：open、close、lowest、highest、volume
  let values = [];
  //每个元素包含：索引、成交量、涨跌(1/-1)
  let volumes = [];
  for (let i = 0; i < rawData.length; i++) {
    //rawData[i]中含O/C/L/H/V
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
  }
  //console.log(categoryData);
  //console.log(values);
  //console.log(volumes);
  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes,
  };
};

export { optionMethod, dispatchAction, splitDataMethod };
