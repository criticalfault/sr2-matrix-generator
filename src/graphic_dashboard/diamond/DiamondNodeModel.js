import { NodeModel } from 'storm-react-diagrams'
import { DiamondPortModel } from './DiamondPortModel'

export class DiamondNodeModel extends NodeModel {
  constructor(
    name = 'defaultDiamond',
    width = 256,
    height = 162,
    text = 'Placeholder',
    color = 'Blue',
    securityRating=1,
    systemType = 'CPU'
  ) {
    super('diamond')
    this.addPort(new DiamondPortModel('top'))
    this.addPort(new DiamondPortModel('left'))
    this.addPort(new DiamondPortModel('bottom'))
    this.addPort(new DiamondPortModel('right'))
    this.extras.width = width
    this.extras.height = height
    this.extras.name = name
    this.extras.text = text
    this.extras.color = color
    this.extras.securityRating = securityRating
    this.extras.systemType = systemType
  }
}
