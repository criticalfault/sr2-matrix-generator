import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
export class DiamonNodeWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  getSystemRatingRange = (color) => {
    switch (color) {
      case 'Blue':
        return [1,2,3,4,5,6];
      case 'Green':
        return [2,3,4,5,6,7];
      case 'Orange':
        return [3,4,5,6,7,8];
      case 'Red':
        return [2,3,4,5,6,7,8,9,10,11,12];
      default:
        return [1,2,3,4,5,6];
    }
  }

  getSystemRating = (color) => {
    switch (color) {
      case 'Blue':
        return this.getRandomNumberInRange(1, 6);
      case 'Green':
        return this.getRandomNumberInRange(2, 7);
      case 'Orange':
        return this.getRandomNumberInRange(3, 8);
      case 'Red':
        return this.getRandomNumberInRange(2, 12);
      default:
        return 0;
    }
  }

  getTypeLabel = (type) => {
    switch (type) {
      case 'CPU':
        return 'Central Processor';
      case 'SPU':
        return 'Sub-Processor ';
      case 'SN':
        return 'Slave Module';
      case 'SAN':
        return 'System Access Node';
      case 'IO':
        return 'Input/Output';
      case 'DS':
        return 'Datastore';
      default:
        return type;
    }
  };

  getLinkableModules = (type) => {
    switch (type) {
      case 'CPU':
        return ['SPU', 'SM', 'SAN', 'I/O', 'DS'];
      case 'SPU':
        return ['CPU', 'SPU', 'SM', 'SAN', 'I/O', 'DS'];
      case 'SM':
        return ['CPU', 'SPU', 'SM', 'I/O', 'DS'];
      case 'SAN':
        return ['CPU', 'SPU', 'DS'];
      case 'I/O':
        return ['CPU', 'SPU', 'SM', 'DS'];
      case 'DS':
        return ['CPU', 'SPU', 'SM', 'SAN', 'I/O'];
      default:
        return [];
    }
  };

  getAvailableCommands = (type) => {
    switch (type) {
      case 'CPU':
        return (<text 
          id="Placeholder"
          fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
          fontSize="12"
          fontWeight="bold"
          fill="#000000">
          <OverlayTrigger placement="left" overlay={this.tooltip('Cancel Alert')}>
            <tspan x="7" y="90">Cancel Alert</tspan>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={this.tooltip('Change Node')}>
          <tspan x="7" y="105">Change Node</tspan>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={this.tooltip('Display Map')}>
          <tspan x="7" y="120">Display Map</tspan>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={this.tooltip('Shutdown')}>
          <tspan x="7" y="135">Shutdown</tspan>
          </OverlayTrigger>
        </text>);
      case 'SPU':
        return (<text 
          id="Placeholder"
          fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
          fontSize="12"
          fontWeight="bold"
          fill="#000000">
          <tspan x="7" y="90">None</tspan>
          
        </text>);
      case 'SN':
        return (<text 
          id="Placeholder"
          fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
          fontSize="12"
          fontWeight="bold"
          fill="#000000">
          <OverlayTrigger placement="left" overlay={this.tooltip('Control')}>
            <tspan x="7" y="90">Control</tspan>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={this.tooltip('Sensor Readout')}>
            <tspan x="7" y="105">Sensor Readout</tspan>
          </OverlayTrigger>
        </text>);
      case 'SAN':
        return (<text 
          id="Placeholder"
          fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
          fontSize="12"
          fontWeight="bold"
          fill="#000000">
            <OverlayTrigger placement="left" overlay={this.tooltip('Lockout')}>
              <tspan x="7" y="90">Lockout</tspan>
            </OverlayTrigger>
        </text>);
      case 'IO':
        return (<text 
          id="Placeholder"
          fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
          fontSize="12"
          fontWeight="bold"
          fill="#000000">
          <OverlayTrigger placement="left" overlay={this.tooltip('Display Messages')}>
            <tspan x="7" y="90">Display Messages</tspan>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={this.tooltip('Lockout')}>
            <tspan x="7" y="105">Lockout</tspan>
          </OverlayTrigger>
        </text>);
      case 'DS':
        return (<text 
          id="Placeholder"
          fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
          fontSize="12"
          fontWeight="bold"
          fill="#000000">
          <OverlayTrigger placement="left" overlay={this.tooltip('Erase File')}>
            <tspan tspan x="7" y="90">Erase File</tspan>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={this.tooltip('Edit File')}>
            <tspan x="7" y="105">Edit File</tspan>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={this.tooltip('Read File')}>
            <tspan x="7" y="120">Read File</tspan>
          </OverlayTrigger>
          <OverlayTrigger placement="left" overlay={this.tooltip('Transfer File')}>
            <tspan x="7" y="135">Transfer File</tspan>
          </OverlayTrigger>
        </text>);
      default:
        return [];
    }
  };

  tooltip = (operation) => {
    switch(operation){
      case 'Cancel Alert':
        return (<Tooltip id="tooltip">
                <strong>Cancel Alert :</strong> Cancels a passive alert. Active Alerts cannot be canceled.
              </Tooltip>)
      case 'Change Node':
        return (<Tooltip id="tooltip">
                <strong>Change Node :</strong> Teleport to any node connected to the system. This is one way.
              </Tooltip>)
      case 'Control':
        return (<Tooltip id="tooltip">
                <strong>Control :</strong> Controls whatever the node is connected too. (eg. Boiling over a coffee maker, halting a factory line)
              </Tooltip>)
      case 'Sensor Readout':
        return (<Tooltip id="tooltip">
                <strong>Sensor Readout :</strong> Read any sensors or cameras connected. 
              </Tooltip>)
      case 'Shutdown':
        return (<Tooltip id="tooltip">
                <strong>Shutdown :</strong> Crash the system. Dumps everyone connected.
              </Tooltip>)
      case 'Display Map':
        return (<Tooltip id="tooltip">
                <strong>Display Map :</strong>Displays the system map. Security and Color of each node. It does not show IC or Files however.
              </Tooltip>)
      case 'Display Messages':
        return (<Tooltip id="tooltip">
                <strong>Display Messages :</strong>Display a message on the terminal of the I/O Controls
              </Tooltip>)
      case 'Lockout':
        return (<Tooltip id="tooltip">
                <strong>Lockout :</strong> Lock the I/O device. Nothing it controls can contact the computer now. If this is a cyberterminal, it must be crashed in cybercombat first.
              </Tooltip>)
      case 'Erase File':
        return (<Tooltip id="tooltip">
              <strong>Erase File :</strong> Wipe out one file (eg erase a police record)
            </Tooltip>)
      case 'Edit File':
        return (<Tooltip id="tooltip">
              <strong>Edit File :</strong> Change the contents of a file (eg give someone straight A's). Also covers uploading files.
            </Tooltip>)
      case 'Read File':
        return (<Tooltip id="tooltip">
              <strong>Read File :</strong> Read the contents of a file. 
            </Tooltip>)
      case 'Transfer File':
        return (<Tooltip id="tooltip">
            <strong>Transfer File :</strong> Copy data into a cyberdeck storage. The decker downloads MPs equal to their I/O per action. They must stay in until finished or all is lost.
          </Tooltip>)
      default:
        return (<Tooltip id="tooltip"></Tooltip>)
    }
  }

  handleClassChanges = (color) => {
    switch(color){
      case 'Blue':
        return 'node-color-blue'
      case 'Green' :
        return 'node-color-green';
      case 'Orange':
        return 'node-color-orange';
      case 'Red':
        return 'node-color-red';
      default:
        return 'node-color-blue'
    }
  }

  getNodeIcon = (type,nodeID, color) => {
    switch(type){
      case "CPU":
        return (<polygon className={this.handleClassChanges(color)}
        stroke="#979797"
        id={nodeID}
        fillRule="nonzero"
    
        points="227.19397662556435,
                117.1341716182545 200.1341716182545,
                144.19397662556435 161.8658283817455,
                144.19397662556435 134.80602337443565,
                117.1341716182545 134.80602337443565,
                78.86582838174552 161.86582838174547,
                51.80602337443568 200.1341716182545,
                51.80602337443567 227.19397662556432,
                78.86582838174547" />
                );
      case "SPU":
        //Hexagon
        return (<polygon 
          className={this.handleClassChanges(color)}
        stroke="#979797"
        id={nodeID}
        fillRule="nonzero"
      
        points="227.19397662556435,
                117.1341716182545 180.1341716182545,
                144.19397662556435 134.80602337443565,
                117.1341716182545 134.80602337443565,
                78.86582838174552 178.86582838174547,
                51.80602337443567 227.19397662556432,
                78.86582838174547" />);

      case "SAN":
        //Reactangle
        return (<rect
          className={this.handleClassChanges(color)}
          id={nodeID}
          stroke="#979797"
          fillRule="nonzero"
          
          x="130"
          y="87"
          width="100"
          height="25"
        />);

      case "SN":
        //Circle
      return ( <circle
        className={this.handleClassChanges(color)}
                  id={nodeID}
                  stroke="#979797"
                  fillRule="nonzero"
                  cx="180" 
                  cy="100" 
                  r="40"
              />)
      case "IO":
        //Triangle
        return (<polygon 
          className={this.handleClassChanges(color)}
          id={nodeID}
          stroke="#979797"
          fillRule="nonzero"
          points="180 65, 150 140, 210 140"/>
          )
      case "DS":
        return (<rect
          id={nodeID}
          stroke="#979797"
          fillRule="nonzero"
          className={this.handleClassChanges(color)}
          x="144"
          y="75"
          width="50"
          height="50"
        />)
      default:
        return;
    }
  }

  getSVGInnerHTML = (text, color, type, id) => {
    let nodeID ='node-color-'+id;
    let optionsText = '';
    if(type === "CPU" || type === "SPU" || type === "IO" || type === "DS" || type === "SAN" || type === "SN"){
      optionsText = (<text
        id="Placeholder"
        fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
        fontSize="12"
        fontWeight="normal"
        fill="#000000">
        <tspan x="7" y="74">
        Operations:
        </tspan>
      </text>)
    }
    return (
      <React.Fragment>
          <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Artboard" transform="translate(-70.000000, -73.000000)">
            <g id="Group" transform="translate(70.000000, 73.000000)">
              <rect
                id="Rectangle-2"
                stroke="#4A4A4A"
                strokeWidth="3"
                fill="#fff"
                fillRule="nonzero"
                x="1.5"
                y="1.5"
                width="253"
                height="159"
                rx="8"
              />
              {this.getNodeIcon(type,nodeID,color)}
               {/* Divider Lin */}
              <path
                d="M1.5,48.5 L254.5,48.5"
                id="Line"
                stroke="#4A4A4A"
                strokeWidth="3"
                strokeLinecap="square"
                fillRule="nonzero"
              />
              <text
                id="Placeholder"
                fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
                fontSize="16"
                text-align="center"
                alignmentBaseline='middle'
                fontWeight="normal"
                fill="#000000"
              >
                <tspan x="75" y="45">
                  
                </tspan>
              </text>
              {optionsText}
              {this.getAvailableCommands(type)}
            </g>
          </g>
        </g>
      </React.Fragment>
    )
  }

  handleSecurityChange = (event) => {
    this.props.node.extras.securityRating = event.target.value;
  }

  selectIfRatingEqs = (randomRating,checkRating) => {
    if(randomRating === checkRating){
      return true;
    }else{
      return false;
    }
  }

  handleColorChange = (event) => {
    this.props.node.extras.color = event.target.value;
    document.getElementById('node-color-'+this.props.node.id).style.fill = event.target.value;
  }

  render() {
    var header = ''
    if(this.props.node.extras.systemType === "IC"){
      header =(
        <div style={{position: "relative",top:"37px"}}>
          <span style={{"fontSize": "14px"}}>{this.getTypeLabel(this.props.node.extras.text)}</span>
        </div>)
    }else{
      header =(<div style={{position: "relative",top:"37px"}}>
      <span style={{"fontSize": "14px"}}>{this.getTypeLabel(this.props.node.extras.text)}: </span>
      <select value={this.props.node.extras.color} onChange={this.handleColorChange}>
        <option value='Blue'>Blue</option>
        <option value='Green'>Green</option>
        <option value='Orange'>Orange</option>
        <option value='Red'>Red</option>
      </select>
      <select value={this.props.node.extras.securityRating} onChange={this.handleSecurityChange}>
        {
          this.getSystemRatingRange(this.props.node.extras.color).map((item,index) => {   
          return (<option key={index} value={item} checked={this.selectIfRatingEqs(this.props.node.extras.securityRating,item)}>{item}</option>)
          })
        }
      </select>
    </div>)
    }

    return (
        <div
          style={{
            position: 'relative',
            width: this.props.node.width,
            height: this.props.node.height,
          }}>
         {header}
        <svg width={this.props.node.extras.width} height={this.props.node.extras.height}>
          {this.getSVGInnerHTML(this.props.node.extras.text, this.props.node.extras.color, this.props.node.extras.systemType, this.props.node.id)}
        </svg>

        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.node.extras.width / 2 - 8,
            top: 15,
          }}
        >
          <PortWidget name="top" node={this.props.node} />
        </div>

        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.node.extras.width - 8,
            top: this.props.node.extras.height / 2 + 20,
          }}
        >
          <PortWidget name="right" node={this.props.node} />
        </div>

        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.node.extras.width / 2 - 8,
            top: this.props.node.extras.height + 20,
          }}
        >
          <PortWidget name="bottom" node={this.props.node} />
        </div>

        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: this.props.node.extras.height / 2 + 20,
            left: -8,
          }}
        >
          <PortWidget name="left" node={this.props.node} />
        </div>
      </div>
    )
  }
}

DiamonNodeWidget.defaultProps = {
  node: {},
}
