import { Reactor, Store, toImmutable } from 'nuclear-js'

const myReactor = new Reactor({ debug: true })

myReactor.registerStores({
  treeParams: Store({
    getInitialState() {
      return toImmutable({
        // 'branchingFactor': 2,
        'trunkLength': 14,
        'branchDepth': 6,
        'twigDepth': 6,
        'initialAngle': -0.331,
        'seed': 1,
        'numLeaves': 0,
        // 'branchAngleVar': 0.1*Math.PI,
        // 'branchLengthVar': 0.1,
        // 'branchWidthVar': 0.1,
        'initialLength': 3.5,
        'initialWidth': 1.4,
        'pruned': {},
      });
    },

    initialize() {
      this.on('SET_PARAM', (state, {name, value}) => state.set(name, value))
      this.on('LOAD', (state) => toImmutable(JSON.parse(localStorage.getItem('saved'))))
      this.on('SAVE', (state) => {
        localStorage.setItem('saved', JSON.stringify(state.toJS()))
        return state
      })
      this.on('PRUNE', (state, id) => state.updateIn(['pruned'], l => l.set(id, true)))
    }
  }),
})

const getters = {
  treeParams: ['treeParams'],
}

const actions = {
  setParam(name, value) {
    myReactor.dispatch('SET_PARAM', {name, value})
  },
  save() {
    myReactor.dispatch('SAVE')
  },
  load() {
    myReactor.dispatch('LOAD')
  },
  prune(id) {
    myReactor.dispatch('PRUNE', id)
  },
}

export { myReactor, getters, actions }
