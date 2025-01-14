/**
 * 
 * @param {*} sources 
 * ou-style-loader的任务是创建一个style标签，将ou-css-loader返回的数据插入到style标签中，并将style标签插入到head中
 */
module.exports = function (sources) {
  // console.log(3, sources);
  // 可以看到ou-css-loader返回的css字符串
  return `
  const tag = document.createElement('style');
  tag.innerHTML = ${sources}
  document.head.appendChild(tag)
  `
}