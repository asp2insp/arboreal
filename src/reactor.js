import { Reactor, Store, toImmutable } from 'nuclear-js'

const myReactor = new Reactor({ debug: true })

myReactor.registerStores({
  treeParams: Store({
    getInitialState() {
      return toImmutable({
        'branchingFactor': 2,
        'maxDepth': 6,
        'angle': 0.2 * Math.PI,
        'seed': 1,
        'branchAngleVar': 0.1*Math.PI,
        'branchLengthVar': 0.1,
        'branchWidthVar': 0.1,
        'initialLength': 25,
        'initialWidth': 6,
      });
    },

    initialize() {
      this.on('SET_PARAM', (state, {name, value}) => state.set(name, value))
    }
  }),
})

const getters = {
  treeParams: ['treeParams'],
}

const actions = {
  setParam(name, value) {
    myReactor.dispatch('SET_PARAM', {name, value})
  }
}

export { myReactor, getters, actions }