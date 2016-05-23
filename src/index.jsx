import React from 'react'
import ReactDOM from 'react-dom'
import { Controls } from './controls'
import { Canvas } from './canvas'
import { myReactor } from './reactor'
import { Store, toImmutable } from 'nuclear-js'

const Layout = {
  Top: {
    width: '100%',
    height: '100%',
    display:'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'stretch',
  },
  Drawing: {
    flexGrow: 6,
  },
  Controls: {
    flexGrow: 2,
    paddingLeft: '10px',
    borderLeft: '1px solid black',
  },
  Copy: {
    flexGrow: 1,
  }
}

ReactDOM.render(
  (<div style={Layout.Top}>
    <Canvas style={Layout.Drawing} />
    <Controls style={Layout.Controls} />
    <textarea id="copy" style={Layout.Copy}></textarea>
  </div>),
  document.getElementById('content')
)
