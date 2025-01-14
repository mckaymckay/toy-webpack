/**
 * 打包后生成一个txt文件，里面会打印每个bundle的大小
 */
module.exports = class MyPlugin {
  apply (compiler) {
    // 输出asset资源到output目录之前的钩子：emit
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      let str = ''
      for (let fileName in compilation.assets) {
        // 获取文件名称和文件大小
        str += `${fileName} -> ${compilation.assets[fileName]['size']() / 1000}KB\n`
      }

      // 生成一个txt文件，里面会打印每个bundle的大小
      compilation.assets['fileSize.txt'] = {
        source: function () {
          return str
        }
      }
    })
  }
}