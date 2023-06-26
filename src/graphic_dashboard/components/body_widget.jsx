import * as React from 'react'
import * as _ from 'lodash'
import { TrayWidget } from './tray_widget'
import { TrayItemWidget } from './tray_item_widget'
import { DefaultNodeModel, DiagramWidget } from 'storm-react-diagrams'
import { DiamondNodeModel } from './../diamond/DiamondNodeModel'

export class BodyWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  handleSaveProject = (event) => {
    console.log(this.props.app.diagramEngine.diagramModel);
  }

  render() {
    return (
      <div className="body">
        <div className="header">
          <div className="title">Drag and Drop Components to link them</div>
        </div>
        <div className="content">
          <TrayWidget>
            <h4 style={{color:'white'}}>Project Settings</h4>
            <div>
              <button onClick={this.handleSaveProject} style={{'width':'100%'}}>Save Project</button>
              <button style={{'width':'100%'}}>Load Project</button>
            </div>
            <h4 style={{color:'white'}}>System Nodes</h4>
            <TrayItemWidget
              model={{ type: 'diamond', name:'CPU', color:"green", systemType:'CPU',securityRating:1  }}
              name="CPU"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:"SPU", color:"green", systemType:'SPU', securityRating:1 }}
              name="SPU"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:'SN', color:"green", systemType:'SN',securityRating:1  }}
              name="SN"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:'SAN', color:"green", systemType:'SAN',securityRating:1  }}
              name="SAN"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:'IO', color:"green", systemType:'IO',securityRating:1  }}
              name="IO"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:'DS', color:"green", systemType:'DS',securityRating:1  }}
              name="DS"
              color="rgb(255,255,255)"
            />
            <h4 style={{color:'white'}}>IC</h4>
            <TrayItemWidget
              model={{ type: 'out', name:'White IC', color:"white", subType:'', systemType:'IC', securityRating:1  }}
              name="White IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'out', name:'IC', color:"gray", subType:'', systemType:'IC', securityRating:1  }}
              name="Gray IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'out', name:'Black IC', subType:'', color:"black", systemType:'IC', securityRating:1  }}
              name="Black IC"
              color="rgb(255,255,255)"
            />
           
          </TrayWidget>
          <div
            className="diagram-layer"
            onDrop={event => {
              const data = JSON.parse(
                event.dataTransfer.getData('storm-diagram-node'),
              )
              const nodesCount = _.keys(
                this.props.app
                  .getDiagramEngine()
                  .getDiagramModel()
                  .getNodes(),
              ).length

              let node = null;
              
              if(data.type == 'out'){
                node = new DefaultNodeModel(
                  data.name,
                  'rgb(0,192,255)',
                )
                node.addInPort('In')
                node.addOutPort('Out')
              }else{
                  node = new DiamondNodeModel(
                  data.name,
                  256,
                  162,
                  data.name,
                  data.color,
                  data.securityRating,
                  data.systemType
                )
              }
              
              
             
              var points = this.props.app
                .getDiagramEngine()
                .getRelativeMousePoint(event)
              node.x = points.x
              node.y = points.y
              this.props.app
                .getDiagramEngine()
                .getDiagramModel()
                .addNode(node)
              this.forceUpdate()
            }}
            onDragOver={event => {
              event.preventDefault()
            }}
          >
            <DiagramWidget
              className="srd-demo-canvas"
              diagramEngine={this.props.app.getDiagramEngine()}
            />
          </div>
        </div>
      </div>
    )
  }
}
