import React from 'react'
import MersenneTwister from 'mersenne-twister'
import { myReactor, getters } from './reactor'
import { Tree } from './tree'

const createRand = function(seed) {
  const mt = new MersenneTwister(seed);
  return function(min, max) {
    return this.random_incl()*(max-min) + min
  }.bind(mt)
}

const Canvas = React.createClass({
  mixins: [myReactor.ReactMixin],

  getDataBindings() {
    return {
      treeParams: getters.treeParams,
    }
  },

  render() {
    const style = this.props.style;
    const state = this.state.treeParams.toJS()

    return (
      <svg style={style} viewBox="0 0 100 100">
        <Tree
          x={25-state.initialWidth/2} y={80}
          length={state.initialLength} strokeWidth={state.initialWidth}
          depth={0} dy={-1} dx={0}
          direction={1}
          rand={createRand(state.seed)} currentAngle={state.initialAngle}
          leafRand={createRand(state.seed+1)}
        />

        <Tree
          x={75-state.initialWidth/2} y={80}
          length={state.initialLength} strokeWidth={state.initialWidth}
          depth={0} dy={-1} dx={0}
          direction={-1}
          rand={createRand(state.seed)} currentAngle={state.initialAngle}
          leafRand={createRand(state.seed+3)}
        />
      </svg>
    )
  }
})

export { Canvas }
