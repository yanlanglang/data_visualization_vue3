//@param dateTime:yyyy-MM-ddxxxxx
//@return yyyy-MM-dd
const getHandleDate = (dateTime) => {
  var dateee = new Date(dateTime).toJSON();
  var date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");

  //[start，end)
  return date.substring(0, 10);
};

//return 'hh-mm-ss'
const getCurrentTime = () => {
  var date = new Date();
  var hour = repair(date.getHours()); //时
  var minute = repair(date.getMinutes()); //分
  var second = repair(date.getSeconds()); //秒
  return hour + ":" + minute + ":" + second;
};

//补0
function repair(i) {
  if (i >= 0 && i <= 9) {
    return "0" + i;
  } else {
    return i;
  }
}
