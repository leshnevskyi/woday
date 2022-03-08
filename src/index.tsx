import React from 'react'
import ReactDOM from 'react-dom'

import Canvas from 'visualization/components'

import renderer from 'visualization/renderer'

ReactDOM.render(
  <React.StrictMode>
    <Canvas renderer={renderer}/>
  </React.StrictMode>,
  document.getElementById('root')
)
