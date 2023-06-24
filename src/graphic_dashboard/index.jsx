import React, { Component } from 'react'

import { BodyWidget } from './components/body_widget'
import { Application } from './app'

import './styles/styles.css'

export default class DndApp extends Component {
  render() {
    const app = new Application()
    return <BodyWidget app={app} />
  }
}
