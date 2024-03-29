import React from 'react';
import { TrayWidget } from './tray_widget'
import { TrayItemWidget } from './tray_item_widget'
import { DiagramWidget, DiagramModel } from 'storm-react-diagrams'
import { DiamondNodeModel } from './../diamond/DiamondNodeModel'
import { ICNodeModel } from '../ic/ICNodeModel';
import { Button, Modal } from 'react-bootstrap'
import html2canvas from 'html2canvas';

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

  handleSaveSVG = () => {
    const divToSave = document.querySelector('.srd-demo-canvas');
    html2canvas(divToSave)
      .then((canvas) => {
        // Create a link to download the canvas as an image
        const link = document.createElement('a');
        link.download = 'system-image.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
      })
      .catch(err => {
        console.error('Error capturing canvas:', err);
      });
      fathom.trackEvent('Saved JPEG of 2nd Edition Matrix System - GM'); // eslint-disable-line
  };

  handleSaveProject = (event) => {
    //Serialize the Diagram, then offload it to the user!
    let systemJSON =JSON.stringify(this.props.app.diagramEngine.diagramModel.serializeDiagram());
    const blob = new Blob([systemJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'matrixProject.json';
    link.click();
  
    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
    fathom.trackEvent('Saved 2nd Edition Matrix System - GM'); // eslint-disable-line
  }

  handleSavePlayerMap= (event) => {
    let systemJSON =this.props.app.diagramEngine.diagramModel.serializeDiagram();
    console.log(systemJSON);
    //Now remove IC so the player will be in the dark!
    let cleanNodes = [];
    systemJSON.nodes.forEach(function(node){
      if (node.type === 'ic'){ return; }      
      cleanNodes.push(node);
    });

    systemJSON.nodes = cleanNodes;
    systemJSON = JSON.stringify(systemJSON);
    const blob = new Blob([systemJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'matrixProjectPlayer.json';
    link.click();
  
    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
    fathom.trackEvent('Saved 2nd Edition Matrix System - Player'); // eslint-disable-line
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
      fathom.trackEvent('Loaded 2nd Edition Matrix System'); // eslint-disable-line
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
              <Button className='dashboardButton' onClick={this.handleSaveProject} >Save Project</Button>              
              <Button className='dashboardButton' onClick={this.handleModalOpen} >Load Project</Button><br></br>
              <Button className='dashboardButton' onClick={this.handleSavePlayerMap}>Save Player Map</Button>
              <Button className='dashboardButton' onClick={this.handleSaveSVG}>Save JPEG</Button>
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
              model={{ type: 'ic', name:'Access IC', color:"White", subType:'Access', systemType:'IC', securityRating:1  }}
              name="Access IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Barrier IC', color:"White", subType:'Barrier', systemType:'IC', securityRating:1  }}
              name="Barrier IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Scramble IC', color:"White", subType:'Scramble', systemType:'IC', securityRating:1  }}
              name="Scramble IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Blaster IC', color:"Gray", subType:'Blaster', systemType:'IC', securityRating:1  }}
              name="Blaster IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Killer IC', color:"Gray", subType:'Killer', systemType:'IC', securityRating:1  }}
              name="Killer IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Tar Baby IC', color:"Gray", subType:'Tar_Baby', systemType:'IC', securityRating:1  }}
              name="Tar Baby IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Tar Pit IC', color:"Gray", subType:'Tar_Pit', systemType:'IC', securityRating:1  }}
              name="Tar Pit IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Trace IC', color:"Gray", subType:'Trace', systemType:'IC', securityRating:1  }}
              name="Trace IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Trace And Report IC', color:"Gray", subType:'TraceReport', systemType:'IC', securityRating:1  }}
              name="Trace And Report IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Trace And Dump IC', color:"Gray", subType:'TraceDump', systemType:'IC', securityRating:1  }}
              name="Trace And Dump IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Trace And Burn IC', color:"Gray", subType:'TraceBurn', systemType:'IC', securityRating:1  }}
              name="Trace And Burn IC"
              color="rgb(255,255,255)"
            />
            <TrayItemWidget
              model={{ type: 'ic', name:'Black IC',  color:"Black", subType:'', systemType:'IC', securityRating:1  }}
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
              let node = null;
              
              if(data.type === 'ic'){
                node = new ICNodeModel(
                  data.name,
                  128,
                  81,
                  data.type,
                  data.color,
                  data.subType,
                  data.securityRating,
                  data.systemType
                )
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
