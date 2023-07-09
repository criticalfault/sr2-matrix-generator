import * as React from 'react'
//import { Tooltip, OverlayTrigger } from 'react-bootstrap'
export class ICNodeWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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

  render() {

    return (
      <div className='ICNode' style={{  position: 'relative', 
                                        width: this.props.node.width+10, 
                                        height: this.props.node.height, 
                                        backgroundColor:'white',
                                        border: '2px black solid', 
                                        padding:'5px', 
                                        zIndex: 2,
                                        borderRadius:'10px' }}>
        <span style={{"fontSize": "14px"}}>{this.props.node.extras.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <select value={this.props.node.extras.securityRating} onChange={this.handleSecurityChange}>
        {
          [1,2,3,4,5,6,7,8,9,10,11,12].map((item,index) => {   
          return (<option key={index} value={item} checked={this.selectIfRatingEqs(this.props.node.extras.securityRating,item)}>{item}</option>)
          })
        }
        </select>
      </div>)
  }
}

ICNodeWidget.defaultProps = {
  node: {},
}
