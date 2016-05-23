import React from 'react';
import { myReactor, getters, actions } from './reactor'
import { Leaf } from './leaf'

const Tree = React.createClass({
  mixins: [myReactor.ReactMixin],

  getDataBindings() {
    return {
      treeParams: getters.treeParams,
    }
  },

  prune() {
    actions.prune(this.getHash())
  },

  getHash() {
    const p = this.props
    return `${p.depth}|${p.x}|${p.y}|${p.dx}|${p.dy}`
  },

  render() {
    const params = Object.assign({}, this.state.treeParams.toJS(), this.props)
    const children = []
    const length = params.depth == 0 ? params.trunkLength : params.length
    const x2 = params.x + length * params.dx
    const y2 = params.y + length * params.dy
    const strokeWidth = params.pruned[this.getHash()] ? 0 : params.strokeWidth

    if (params.depth >= 4) {
      for (var i = 0; i < params.numLeaves; i++) {
        const angle = Math.atan2(params.dy, params.dx)
        children.push(
          <Leaf key={'d'+params.depth+'leaf'+i}
            cx={x2} cy={y2} angle={angle+params.rand(-Math.PI/4, Math.PI/4)}
            scale={length}
          />
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
          strokeWidth={strokeWidth*params.rand(0.7, 0.9)}
          length={params.length*params.rand(0.95, 1.2)}
          rand={params.rand} currentAngle={params.direction*params.initialAngle}
          direction={params.direction}
        />
      )
      var angle = params.initialAngle+params.rand(-0.01, 0.01)*Math.PI
      dx2 = Math.cos(angle) * params.dx + Math.sin(angle) * params.dy;
      dy2 = -Math.sin(angle) * params.dx + Math.cos(angle) * params.dy;
      children.push(
        <Tree
          key={'d'+(params.depth+1)+'br'}
          depth={params.depth+1}
          x={x2} y={y2}
          dx={dx2} dy={dy2}
          strokeWidth={strokeWidth*params.rand(0.7, 0.9)}
          length={params.length*params.rand(0.95, 1.2)}
          rand={params.rand} currentAngle={params.direction*params.initialAngle}
          direction={params.direction}
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
          strokeWidth={strokeWidth*params.rand(0.7, 0.9)}
          length={params.length*params.rand(0.5, 0.95)}
          rand={params.rand} currentAngle={angle}
          direction={params.direction}
        />
      )
    }
    const prune=this.prune
    return (
      <g>
        <line
          x1={params.x} x2={x2}
          y1={params.y} y2={y2}
          strokeWidth={strokeWidth}
          stroke="black" onClick={prune}
        />
        {children}
      </g>
    )
  }
})

export { Tree }
