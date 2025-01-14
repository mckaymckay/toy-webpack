/**
 * 将ou-sass-loader处理后的css结果转换为字符串
 */
module.exports = function (source) {
  // console.log(2, source);
  // 可以看到ou-sass-loader处理后的结果
  // 这里source应该是一个buffer对象，但是Node.js内部会自动调用toString(),所以打印处理成了字符串

  return JSON.stringify(source)
}