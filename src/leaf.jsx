import React from 'react';
import { myReactor, getters } from './reactor'

const Leaf = React.createClass({
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
    const prune=this.prune
    const angleDeg = params.angle * 180/Math.PI
    const scale = 0.01 * (params.scale/params.initialLength)
    if (this.state.pruned) {
      return (<g></g>)
    } else {
      return (
        <path
          d="m 208.17,62.3085 c -11.0397,1.4675 -23.1634,5.8429 -36.3146,13.3231 -10.889,6.7181 -21.9065,13.3661 -33.0527,19.9419 -46.5963,25.3763 -83.7493,30.4063 -111.142,15.433 C 2.3346,97.1628 0.92598605,66.701404 12.779886,43.173704 68.46127,82.806296 41.08399,95.440104 157.35525,56.516323 68.644915,76.204595 36.643949,30.670586 13.1202,43.0447 13.5604,39.7842 14.7973,36.2918 16.6916,32.8264 28.3377,11.5206 48.6427,0.7795 77.6018,0.6054 101.6927,0.4382 125.302,6.6746 148.4304,19.317 164.3235,28.0045 184.3,42.4247 208.1696,62.3085 Z"
          strokeWidth={1}
          stroke="black"
          fill="black"
          transform={`translate(${params.cx}, ${params.cy}),scale(${scale}),rotate(${angleDeg})`}
          onClick={prune}
        />
      )
    }
  }
})

export { Leaf }
