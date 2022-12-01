//柱状图

var optionMethod = (dimensions, source, series) => {
  return {
    legend: {},
    tooltip: {},
    dataset: {
      //属性名param1：
      dimensions: dimensions,
      source: source,
    },
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: series,
  };
};

export { optionMethod };
