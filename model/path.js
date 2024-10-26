import path from 'path'
/**
 * Yunzai根目录：C:/Users/Administrator/Desktop/wuyi/yunzai/Yunzai/plugins/Yog-Sothoth
 * 插件名：Yog-Sothoth
 * 插件根目录：C:/Users/Administrator/Desktop/wuyi/yunzai/Yunzai/plugins/Yog-Sothoth
 * 插件资源目录：C:/Users/Administrator/Desktop/wuyi/yunzai/Yunzai/plugins/Yog-Sothoth/resources
 */
// Yunzai根目录
const _path = process.cwd().replace(/\\/g, '/')
// 插件名
const pluginName = path.basename(path.join(import.meta.url, '../../'))
// 插件根目录
const plugin_ = path.join(_path, `plguins`, pluginName).replace(/\\/g, '/')
// 插件资源目录
const resources = path.join(plugin_, 'resources').replace(/\\/g, '/')
export { _path, pluginName, plugin_, resources}