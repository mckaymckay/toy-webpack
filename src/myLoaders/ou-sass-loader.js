/**
 * sass编译涉及文件读写，是IO操作
 * 是一个异步过程
 */
const sass = require('sass');


module.exports = function (source) {
  // 获取callback函数
  const callback = this.async()
  try {
    sass.render({
      data: source // sass源码
    }, (err, result) => {
      // console.log(1, result);
      // result.css是一个buffer对象，我们需要去解析他，但这是ou-css-loader的事情，ou-sass-loader只需要把对象中的css返回出去
      if (err) {
        callback(err)
        return
      }
      // 返回编译后的css
      callback(null, result.css)
    });
  }
  catch (error) {
    callback(error)
  }
}
