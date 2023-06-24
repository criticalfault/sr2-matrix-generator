import React from 'react';
import { useState, createRef } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import GraphicDashboard from './graphic_dashboard'
import 'storm-react-diagrams/dist/style.min.css'
const handleSaveProject = () => {
// Save project data as a file
};

const handleFileUpload = (event) => {
// Load project data from the uploaded file
};



function ProjectHolder () {
  

return (
    <Container>
        <Row>
            <h1>Shadowrun Matrix Generator</h1>
        </Row>
        <GraphicDashboard/>
      </Container>
    ) 
}

export default ProjectHolder;
