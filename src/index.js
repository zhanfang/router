import * as util from './util.js'

class Router {
  //默认参数
  _options = {
    container: '#container',
    enter: 'enter',
    enterTimeout: 0,
    leave: 'leave',
    leaveTimeout: 0
  }
  _routes = []

  _$container = null

  _default = null

  _index = 1
  
  constructor (options) {
    this._options = Object.assign({}, this._options, options)
    this._$container = document.querySelector(this._options.container)
  }

  push (route) {
    route = Object.assign({}, {
      url: '*',
      className: '',
      render: util.noop,
      bind: util.noop
    }, route)
    this._routes.push(route)
    return this
  }

  /**
    * set default url when no matcher was found
    * @param {String} url
    * @returns {Router}
    */
  setDefault (url) {
    this._default = url
    return this
  }

  init () {
    window.addEventListener('haschange', (event) => {
      const hash = util.getHash(event.newURL)
      const state = history.state || {}

      this.go(hash, state._index <= this._index)
    }, false)

    if(history.state && history.state._index){
      this._index = history.state._index
    }
    this._index--

    const hash = util.getHash(location.href)
    const route = util.getRoute(this._routes, hash)

    this.go(route ? hash : this._default);
  }

  go (url, isBack = false) {
    const route = util.getRoute(this._routes, url)
    if (route) {
      const enter = (hasChildren, html) => {
        let node = document.createElement('div')

        // 添加class name
        if (route.className) {
          node.classList.add(route.className)
        }

        node.innerHTML = html
        this._$container.appendChild(node)
        location.hash = `#${url}`
      }

      // 判断是否有子节点
      const hasChildren = util.hasChildren(this._$container)
      enter(hasChildren, route.render())
    }
  }
}

export default Router;