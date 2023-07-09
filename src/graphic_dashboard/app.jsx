import * as SRD from 'storm-react-diagrams'

import { DiamondNodeFactory } from './diamond/DiamondNodeFactory'
import { ICNodeFactory } from './ic/ICNodeFactory'
import { SimplePortFactory } from './diamond/SimplePortFactory'
import { DiamondPortModel } from './diamond/DiamondPortModel'
import { ICPortModel } from './ic/ICPortModel'


export class Application {
  constructor() {
    this.diagramEngine = new SRD.DiagramEngine()
    this.diagramEngine.installDefaultFactories()

    this.diagramEngine.registerPortFactory(
      new SimplePortFactory('diamond', config => new DiamondPortModel()),
      new SimplePortFactory('ic', config => new ICPortModel()),
    )

    this.diagramEngine.registerNodeFactory(
      new DiamondNodeFactory({ width: 256, height: 162 })
    )
    
    this.diagramEngine.registerNodeFactory(
      new ICNodeFactory({ width: 128, height: 81 })
    )

    this.activeModel = new SRD.DiagramModel()
    this.activeModel.setGridSize(25)
    this.diagramEngine.setDiagramModel(this.activeModel)
  }

  getActiveDiagram(){
    return this.activeModel
  }

  getDiagramEngine(){
    return this.diagramEngine
  }
}
