import { NodeModel } from 'storm-react-diagrams'

export class ICNodeModel extends NodeModel {
  constructor(
    name = 'defaultIC',
    width = 128,
    height = 81,
    type,
    color,
    subType,
    securityRating=1,
    systemType,
  ) {
    super('ic')
    this.extras.width = width
    this.extras.height = height
    this.extras.name = name
    this.extras.color = color
    this.extras.type = type
    this.extras.subType = subType
    this.extras.text = systemType
    this.extras.securityRating = securityRating
    this.extras.systemType = systemType
  }
}
