import React from 'react';
import { myReactor, getters } from './reactor'

const Tree = React.createClass({
  mixins: [myReactor.ReactMixin],

  getDataBindings() {
    return {
      treeParams: getters.treeParams,
    }
  },

  render() {
    const params = Object.assign({}, this.state.treeParams.toJS(), this.props)
    const children = []
    const lengthVar = params.length*params.branchLengthVar*params.rand()
    const x2 = params.x + (params.length+lengthVar) * params.dx
    const y2 = params.y + (params.length+lengthVar) * params.dy
    if (params.depth < params.maxDepth) {
      // const branches = Math.ceil(params.branchingFactor+params.rand())
      for (var i = 0; i < params.branchingFactor; i++) {
        const flip = (i % 2 == 0 ? 1 : -1)
        const angle = flip * params.angle + params.branchAngleVar*params.rand()
        const dx2 = Math.cos(angle) * params.dx + Math.sin(angle) * params.dy;
        const dy2 = -Math.sin(angle) * params.dx + Math.cos(angle) * params.dy;
        const childWidth=0.66+0.3*params.branchWidthVar*params.rand()
        const childLength=0.66+0.3*params.branchLengthVar*params.rand()
        children.push(
          <Tree
            key={'d'+(params.depth+1)+'b'+i}
            depth={params.depth+1}
            x={x2} y={y2}
            dx={dx2} dy={dy2}
            strokeWidth={params.strokeWidth*childWidth}
            length={params.length*childLength}
            rand={params.rand}
          />
        )
      }
    }
    // Retreat the start into the last item
    const x1 = params.x - (params.length*0.1) * params.dx
    const y1 = params.y - (params.length*0.1) * params.dy
    const widthVar = params.strokeWidth*params.branchWidthVar*params.rand()
    return (
      <g>
        <line
          x1={x1} x2={x2}
          y1={y1} y2={y2}
          strokeWidth={params.strokeWidth+widthVar}
          stroke="black"
        />
        {children}
      </g>
    )
  }
})

export { Tree }
