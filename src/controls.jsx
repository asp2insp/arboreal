import React from 'react';
import { myReactor, getters, actions } from './reactor';

const Controls = React.createClass({
  mixins: [myReactor.ReactMixin],

  getDataBindings() {
    return {
      treeParams: getters.treeParams,
    }
  },

  dispatch(ev) {
    actions.setParam(ev.target.id, parseFloat(ev.target.value))
  },

  limits: {
    'branchingFactor': [1, 4, 1],
    'maxDepth': [1, 6, 1],
    'initialAngle': [-0.5*Math.PI, 0.5*Math.PI, 0.01],
    'seed': [0, 100, 1],
    'branchAngleVar': [0, 0.5*Math.PI, 0.001],
    'branchLengthVar': [0, 1, 0.01],
    'branchWidthVar': [0, 1, 0.01],
    'initialLength': [0, 50, 0.5],
    'initialWidth': [0, 10, 0.1],
    'trunkLength': [0, 50, 1],
  },

  render() {
    const style = this.props.style
    const state = this.state.treeParams.toJS()
    const dispatch = this.dispatch
    const controls = []
    const displays = []
    for (var key in state) {
      const def = state[key]
      const limits = this.limits[key]
      controls.push(
        <p key={key}>
          <label for={key}>{key}</label>
          <input type="range" id={key} defaultValue={def}
            min={limits[0]} max={limits[1]} step={limits[2]} onChange={dispatch} />
          <span>{state[key].toFixed(3)}</span>
        </p>
      )
    }
    return (
      <div style={style}>
        <h2>Controls</h2>
        <div>
          {controls}
        </div>
      </div>
    )
  }
})

export { Controls }
