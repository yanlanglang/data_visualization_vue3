const formatPercent = (val) => {
  return val + "%";
};

const formatPrice = (val) => {
  return val + "元";
};

const formatBigDecimal = (num) => {
  if (!num || isNaN(num)) {
    return "请传入数值格式的数据";
  }
  // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
  num = Number(num);

  var hundredMillion = 100000000;
  var tenThousand = 10000;

  if (Math.abs(num) > hundredMillion) {
    return (num / hundredMillion).toFixed(2) + "亿";
  } else if (Math.abs(num) > tenThousand) {
    return (num / tenThousand).toFixed(2) + "万";
  } else {
    return num.toFixed(2);
  }
};

export { formatPercent, formatPrice, formatBigDecimal };
