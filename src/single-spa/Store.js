import { asyncRouterMap } from '../config/router.config'
// 消息总线
class Store {
  appName = 'app-5';
  appPath = '/app5';
  getAppMenuInfo = () => {
    // 从路由信息中提取菜单信息
    // let routes = config.routes;
    let menus = []
    function getChildren (childRoutes) {
      const children = []
      childRoutes.forEach(item => {
        if (item.name) {
          let path = item.path
          if (!path.startsWith('http')) {
            path = '/app5' + path
            if (path.includes(':')) {
              // 带参数的路由，去掉参数
              // 例如： /list/table-list/:pageNo([1-9]\\d*)? => /list/table-list
              path = path.substr(0, path.indexOf(':') - 1)
            }
          }
          const menu = {
            name: item.meta.title,
            path
          }
          if (item.children) {
            menu.children = getChildren(item.children)
          }
          children.push(menu)
        }
      })
      return children
    }
    asyncRouterMap.forEach(item => {
      if (item.path === '/') {
        menus = getChildren(item.children)
      }
    })
    const promise = new Promise(resolve => {
      resolve(menus)
    })
    return promise
  };
}

export default Store
