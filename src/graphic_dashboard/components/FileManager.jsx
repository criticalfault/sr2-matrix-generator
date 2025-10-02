import React, { Component } from "react";
import { Button, Form, ListGroup, Row, Col, InputGroup } from "react-bootstrap";

export class FileManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFileName: "",
      newFileSize: "",
      showAddForm: false,
    };
  }

  handleAddFile = () => {
    const { newFileName, newFileSize } = this.state;

    if (
      !newFileName.trim() ||
      !newFileSize ||
      isNaN(newFileSize) ||
      parseInt(newFileSize) < 0
    ) {
      alert("Please enter a valid file name and size (positive integer)");
      return;
    }

    const newFile = {
      name: newFileName.trim(),
      size: parseInt(newFileSize),
    };

    this.props.onAddFile(newFile);
    this.setState({
      newFileName: "",
      newFileSize: "",
      showAddForm: false,
    });
  };

  handleRemoveFile = (index) => {
    this.props.onRemoveFile(index);
  };

  toggleAddForm = () => {
    this.setState((prevState) => ({
      showAddForm: !prevState.showAddForm,
      newFileName: "",
      newFileSize: "",
    }));
  };

  formatFileSize = (size) => {

    return `${(size)} MB`;
  };

  render() {
    const { files } = this.props;
    const { newFileName, newFileSize, showAddForm } = this.state;

    return (
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "4px",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <strong>Files ({files.length})</strong>
          <Button size="sm" variant="primary" onClick={this.toggleAddForm}>
            {showAddForm ? "Cancel" : "Add File"}
          </Button>
        </div>

        {showAddForm && (
          <Form
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "white",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
            }}
          >
            <Row>
              <Col xs={5}>
                <Form.Group>
                  <Form.Label style={{ fontSize: "12px" }}>
                    File Name
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter file name"
                    value={newFileName}
                    onChange={(e) =>
                      this.setState({ newFileName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group>
                  <Form.Label style={{ fontSize: "12px" }}>
                    Size
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder="Size"
                    min="0"
                    value={newFileSize}
                    onChange={(e) =>
                      this.setState({ newFileSize: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={3} style={{ display: "flex", alignItems: "end" }}>
                <Button
                  size="sm"
                  variant="success"
                  onClick={this.handleAddFile}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        {files.length > 0 ? (
          <ListGroup style={{ maxHeight: "150px", overflowY: "auto" }}>
            {files.map((file, index) => (
              <ListGroup.Item
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  fontSize: "12px",
                }}
              >
                <div>
                  <strong>{file.name}</strong>
                  <span style={{ color: "#6c757d", marginLeft: "8px" }}>
                    ({this.formatFileSize(file.size)})
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => this.handleRemoveFile(index)}
                  style={{ fontSize: "10px", padding: "2px 6px" }}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#6c757d",
              fontSize: "12px",
              padding: "20px",
              fontStyle: "italic",
            }}
          >
            No files stored
          </div>
        )}
      </div>
    );
  }
}

FileManager.defaultProps = {
  files: [],
  onAddFile: () => {},
  onRemoveFile: () => {},
};
