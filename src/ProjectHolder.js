import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import GraphicDashboard from './graphic_dashboard'
import 'storm-react-diagrams/dist/style.min.css'
function ProjectHolder () {
  
    return (
        <Container>
            <Row>
                <h1>Shadowrun Matrix Generator (2nd)</h1>
            </Row>
            <GraphicDashboard/>
        </Container>
        ) 
}

export default ProjectHolder;
