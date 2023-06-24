import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'

export class DiamonNodeWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getNodeIcon = (type,nodeID) => {
    console.log("getting Node Icon "+ type + ' '+nodeID);
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
      case "DS":

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
                <tspan x="97" y="104">
                  {text}
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
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
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
