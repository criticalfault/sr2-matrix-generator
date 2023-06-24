import * as SRD from 'storm-react-diagrams'

import { DiamondNodeModel } from './diamond/DiamondNodeModel'
import { DiamondNodeFactory } from './diamond/DiamondNodeFactory'
import { SimplePortFactory } from './diamond/SimplePortFactory'
import { DiamondPortModel } from './diamond/DiamondPortModel'

export class Application {
  constructor() {
    this.diagramEngine = new SRD.DiagramEngine()
    this.diagramEngine.installDefaultFactories()

    this.diagramEngine.registerPortFactory(
      new SimplePortFactory('diamond', config => new DiamondPortModel()),
    )
    this.diagramEngine.registerNodeFactory(
      new DiamondNodeFactory({ width: 256, height: 162 }),
    )

    this.activeModel = SRD.DiagramModel

    this.newModel()
  }

  newModel() {
    this.activeModel = new SRD.DiagramModel()
    this.activeModel.setGridSize(25)
    this.diagramEngine.setDiagramModel(this.activeModel)

    //3-A) create a default node
    var node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,191,255)')
    let port1 = node1.addOutPort('Out')
    node1.setPosition(100, 100)

    var node2 = new DiamondNodeModel()
    node2.setPosition(210, 108)

    //3-B) create another default node
    var node3 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)')
    let port3 = node3.addInPort('In')
    node3.setPosition(580, 100)

    // link the ports
    var link1 = port1.link(node2.getPort('left'))
    var link2 = port3.link(node2.getPort('right'))

    // this.activeModel.addAll(node1, node2, node3, link1, link2)
  }

  getActiveDiagram(): SRD.DiagramModel {
    return this.activeModel
  }

  getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine
  }
}
