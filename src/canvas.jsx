import React from 'react'
import MersenneTwister from 'mersenne-twister'
import { myReactor, getters } from './reactor'
import { Tree } from './tree'

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
    const mt = new MersenneTwister(state.seed);
    const getRand = function(min, max) {
      return this.random_incl()*(max-min) + min
    }.bind(mt)
    return (
      <svg style={style} viewBox="0 0 100 100">
        <Tree
          x={50-state.initialWidth/2} y={100}
          length={state.initialLength} strokeWidth={state.initialWidth}
          depth={0} dy={-1} dx={0}
          rand={getRand} currentAngle={state.initialAngle}
        />
      </svg>
    )
  }
})

export { Canvas }
