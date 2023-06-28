import React from 'react';
import * as _ from 'lodash'
import { TrayWidget } from './tray_widget'
import { TrayItemWidget } from './tray_item_widget'
import { DefaultNodeModel, DiagramWidget, DiagramModel } from 'storm-react-diagrams'
import { DiamondNodeModel } from './../diamond/DiamondNodeModel'
import { Button, Modal } from 'react-bootstrap'

export class BodyWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      projectData: null
    }
  }

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleModalOpen = () => {
    this.setState({ showModal: true });
  };


  handleSaveProject = (event) => {
    //Serialize the Diagram, then offload it to the user!
    let systemJSON =JSON.stringify(this.props.app.diagramEngine.diagramModel.serializeDiagram());
    const blob = new Blob([systemJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'project.json';
    link.click();
  
    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  }

  handleLoadProject = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      var newModal = new DiagramModel();
      newModal.deSerializeDiagram(JSON.parse(fileData), this.props.app.diagramEngine);
      this.props.app.getDiagramEngine().setDiagramModel(newModal);
      this.forceUpdate()
    }    
    reader.readAsText(file); 
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
              <Button onClick={this.handleSaveProject} >Save Project</Button>              
              <Button onClick={this.handleModalOpen} >Load Project</Button><br></br>
              <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Upload Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input type="file" accept=".json" onChange={this.handleLoadProject} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleModalClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.handleModalClose}>
                    Upload
                  </Button>
                </Modal.Footer>
              </Modal>
             
            </div>
            <h4 style={{color:'white'}}>System Nodes</h4>
            <TrayItemWidget
              model={{ type: 'diamond', name:'CPU', color:"Blue", systemType:'CPU',securityRating:1  }}
              name="CPU"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:"SPU", color:"Blue", systemType:'SPU', securityRating:1 }}
              name="SPU"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:'SN', color:"Blue", systemType:'SN',securityRating:1  }}
              name="SN"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:'SAN', color:"Blue", systemType:'SAN',securityRating:1  }}
              name="SAN"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:'IO', color:"Blue", systemType:'IO',securityRating:1  }}
              name="IO"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'diamond', name:'DS', color:"Blue", systemType:'DS',securityRating:1  }}
              name="DS"
              color="rgb(255,255,255)"
            />
            <h4 style={{color:'white'}}>IC</h4>
            <TrayItemWidget
              model={{ type: 'out', name:'White IC', color:"White", subType:'', systemType:'IC', securityRating:1  }}
              name="White IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'out', name:'Gray IC', color:"Gray", subType:'', systemType:'IC', securityRating:1  }}
              name="Gray IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'out', name:'Black IC',  color:"Black", subType:'', systemType:'IC', securityRating:1  }}
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
              
              if(data.type === 'out'){
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
