import * as SRD from 'storm-react-diagrams'
import { ICNodeWidget } from './ICNodeWidget'
import { ICNodeModel } from './ICNodeModel'
import * as React from 'react'

export class ICNodeFactory extends SRD.AbstractNodeFactory {
  constructor(props) {
    super('ic')
  }

  generateReactWidget(diagramEngine, node) {
    return <ICNodeWidget node={node} />
  }

  getNewInstance() {
    return new ICNodeModel()
  }
}
