import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'

export class DiamonNodeWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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
      case 'SM':
        return 'Slave Module';
      case 'SAN':
        return 'System Access Node';
      case 'IO':
        return 'Input/Output';
      case 'DS':
        return 'Datastore';
      default:
        return 'Unknown';
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
        return ['Cancel Alert', 'Display Map', 'Shutdown'];
      case 'SPU':
        return ['Cancel Alert', 'Display Map', 'Shutdown'];
      case 'SM':
        return ['Control', 'Sensor Readout'];
      case 'SAN':
        return ['Lockout'];
      case 'I/O':
        return ['Display Messages', 'Lockout'];
      case 'DS':
        return ['Erase File', 'Edit File', 'Read File', 'Transfer File'];
      default:
        return [];
    }
  };

  getNodeIcon = (type,nodeID) => {
    switch(type){
      case "CPU":
        return (<polygon stroke="#979797"
        id={nodeID}
        fillRule="nonzero"
        fill='red' 
        points="227.19397662556435,
                117.1341716182545 200.1341716182545,
                144.19397662556435 161.8658283817455,
                144.19397662556435 134.80602337443565,
                117.1341716182545 134.80602337443565,
                78.86582838174552 161.86582838174547,
                51.80602337443568 200.1341716182545,
                51.80602337443567 227.19397662556432,
                78.86582838174547" />);
      case "SPU":
        //Pentagron

      break;

      case "SAN":
        //Reactangle
        return (<rect
          id={nodeID}
          stroke="#979797"
          fillRule="nonzero"
          fill='blue'
          x="130"
          y="87"
          width="100"
          height="25"
        />)
      break;

      case "SN":
        //Circle
      return ( <circle
                  id={nodeID}
                  stroke="#979797"
                  fillRule="nonzero"
                  fill='blue'
                  cx="180" 
                  cy="100" 
                  r="40"
              />)
      break;
      
      case "IO":
        //Triangle
        return (<polygon id={nodeID}
          stroke="#979797"
          fillRule="nonzero"
          fill='blue'
          width="25"
          height="25"
          points="190,90 50,500 300,200" class="triangle" />
          )
      break;
      
      case "DS":
        return (<rect
          id={nodeID}
          stroke="#979797"
          fillRule="nonzero"
          fill='blue'
          x="144"
          y="75"
          width="50"
          height="50"
        />)
      break;

      default:
        return (<rect
          id={nodeID}
          stroke="#979797"
          fillRule="nonzero"
          fill='blue'
          x="144"
          y="75"
          width="50"
          height="50"
        />)
    }
  }

  getSVGInnerHTML = (text, color, type, id) => {
    let nodeID ='node-color-'+id;   

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
              {this.getNodeIcon(type,nodeID)}
               
              <path
                d="M1.5,43.5 L254.5,43.5"
                id="Line"
                stroke="#4A4A4A"
                strokeWidth="3"
                strokeLinecap="square"
                fillRule="nonzero"
              />
              <text
                id="Placeholder"
                fontFamily="SanFranciscoDisplay-Regular, San Francisco Display"
                fontSize="12"
                fontWeight="normal"
                fill="#000000"
              >
                <tspan x="7" y="104">
                  {this.getTypeLabel(text)}
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </React.Fragment>
    )
  }

  handleColorChange = (event) => {
    console.log(event.target.value);
    document.getElementById('node-color-'+this.props.node.id).style.fill = event.target.value;
  }

  render() {
    let randomRating = this.getSystemRating(this.props.node.color);

    return (
      <div
        style={{
          position: 'relative',
          width: this.props.node.width,
          height: this.props.node.height,
        }}
      >
        <div style={{position: "relative",top:"35px"}}>
          <select onChange={this.handleColorChange}>
            <option value='blue'>Blue</option>
            <option value='green'>Green</option>
            <option value='orange'>Orange</option>
            <option value='red'>Red</option>
          </select>
          <select>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option value='13'>13</option>
            <option value='14'>14</option>
          </select>
        </div>
        <svg width={this.props.node.width} height={this.props.node.height}>
          {this.getSVGInnerHTML(this.props.node.text, this.props.node.color, this.props.node.systemType, this.props.node.id)}
        </svg>

        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.node.width / 2 - 8,
            top: 15,
          }}
        >
          <PortWidget name="top" node={this.props.node} />
        </div>

        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.node.width - 8,
            top: this.props.node.height / 2 + 20,
          }}
        >
          <PortWidget name="right" node={this.props.node} />
        </div>

        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.node.width / 2 - 8,
            top: this.props.node.height + 20,
          }}
        >
          <PortWidget name="bottom" node={this.props.node} />
        </div>

        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: this.props.node.height / 2 + 20,
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
