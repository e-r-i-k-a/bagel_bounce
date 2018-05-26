import React from 'react'
import { render } from 'react-dom'
import Canvas from './components/Canvas'
import Menu from './components/Menu'

render(
    <main className='app'>
    <Menu />
    <Canvas />
    </main>,
  document.getElementById('root')
)
