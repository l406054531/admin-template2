const init = (Vue) => {
  Vue.directive('focus', {
    bind: (el, binding, vnode) => {
      console.log('bind');
    },
    inserted: (el) => {
      console.log('inserted');
    },
    update: () => {
      console.log('update');
    },
    componentUpdated: () => {
      console.log('componentUpdated');
    },
    unbind: () => {
      console.log('unbind');
    }
  })
}
export default init