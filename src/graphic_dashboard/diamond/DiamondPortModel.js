import * as _ from 'lodash'
import {
  PortModel,
  DefaultLinkModel,
} from 'storm-react-diagrams'

export class DiamondPortModel extends PortModel {
  constructor(pos = 'top',systemType = 'CPU') {
    super(pos, 'diamond')
    this.position = pos
    this.systemType = systemType;
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position,
      systemType: this.systemType
    })
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine)
    this.position = data.position
    this.systemType = data.systemType
  }

  createLinkModel() {
    return new DefaultLinkModel()
  }
}
