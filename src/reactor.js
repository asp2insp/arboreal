import { Reactor, Store, toImmutable } from 'nuclear-js'

const myReactor = new Reactor({ debug: true })

myReactor.registerStores({
  treeParams: Store({
    getInitialState() {
      return toImmutable({
        // 'branchingFactor': 2,
        'trunkLength': 25,
        'branchDepth': 6,
        'twigDepth': 6,
        'initialAngle': -0.331,
        'seed': 1,
        'numLeaves': 0,
        // 'branchAngleVar': 0.1*Math.PI,
        // 'branchLengthVar': 0.1,
        // 'branchWidthVar': 0.1,
        'initialLength': 5,
        'initialWidth': 2,
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
