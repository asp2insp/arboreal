import React from 'react';
import { myReactor, getters } from './reactor'
import { Leaf } from './leaf'

const Tree = React.createClass({
  mixins: [myReactor.ReactMixin],

  getDataBindings() {
    return {
      treeParams: getters.treeParams,
    }
  },

  prune() {
    this.setState({'pruned': true})
  },

  render() {
    const params = Object.assign({}, this.state.treeParams.toJS(), this.props)
    const children = []
    const length = params.depth == 0 ? params.trunkLength : params.length
    const x2 = params.x + length * params.dx
    const y2 = params.y + length * params.dy

    if (params.depth >= 12) {
      for (var i = 0; i < params.numLeaves; i++) {
        children.push(
          <Leaf key={'d'+params.depth+'leaf'+i}/>
        )
      }
    }

    if (params.depth < params.branchDepth) {
      var angle = -params.initialAngle+params.rand(-0.01, 0.01)*Math.PI
      var dx2 = Math.cos(angle) * params.dx + Math.sin(angle) * params.dy;
      var dy2 = -Math.sin(angle) * params.dx + Math.cos(angle) * params.dy;
      children.push(
        <Tree
          key={'d'+(params.depth+1)+'bl'}
          depth={params.depth+1}
          x={x2} y={y2}
          dx={dx2} dy={dy2}
          strokeWidth={params.strokeWidth*params.rand(0.7, 0.9)}
          length={params.length*params.rand(0.95, 1.2)}
          rand={params.rand} currentAngle={params.initialAngle}
        />
      )
      var angle = params.currentAngle+params.rand(-0.01, 0.01)*Math.PI
      dx2 = Math.cos(angle) * params.dx + Math.sin(angle) * params.dy;
      dy2 = -Math.sin(angle) * params.dx + Math.cos(angle) * params.dy;
      children.push(
        <Tree
          key={'d'+(params.depth+1)+'br'}
          depth={params.depth+1}
          x={x2} y={y2}
          dx={dx2} dy={dy2}
          strokeWidth={params.strokeWidth*params.rand(0.7, 0.9)}
          length={params.length*params.rand(0.95, 1.2)}
          rand={params.rand} currentAngle={params.initialAngle}
        />
      )
    } else if (params.depth < params.branchDepth+params.twigDepth) {
      var angle = params.currentAngle+params.rand(-0.01, 0.01)*Math.PI
      dx2 = Math.cos(angle) * params.dx + Math.sin(angle) * params.dy;
      dy2 = -Math.sin(angle) * params.dx + Math.cos(angle) * params.dy;
      children.push(
        <Tree
          key={'d'+(params.depth+1)+'br'}
          depth={params.depth+1}
          x={x2} y={y2}
          dx={dx2} dy={dy2}
          strokeWidth={params.strokeWidth*params.rand(0.7, 0.9)}
          length={params.length*params.rand(0.5, 0.95)}
          rand={params.rand} currentAngle={angle}
        />
      )
    }
    const prune=this.prune

    if (this.state.pruned) {
      return (<g></g>)
    } else {
      return (
        <g>
          <line
            x1={params.x} x2={x2}
            y1={params.y} y2={y2}
            strokeWidth={params.strokeWidth}
            stroke="black" onClick={prune}
          />
          {children}
        </g>
      )
    }
  }
})

export { Tree }
