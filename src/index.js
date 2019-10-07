import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './index.css'

ReactDOM.render(
  <BrowserRouter key='browserRouter'>
  <App/>
</BrowserRouter>, document.getElementById('root'))
