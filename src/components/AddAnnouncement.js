import React from "react";
import { Modal, Button } from "react-bootstrap";
import { createAnnouncement, getAllAnnouncement } from "../server/requests";
import "./style.css";

class AddAnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      title: "",
      description: "",
      id: 0,
      date: "",
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleModalSave = this.handleModalSave.bind(this);
  }
  componentDidMount = () => {
    this.getDate();
    this.setState({ id: this.uuidv4() });
  }

  handleModalShowHide = () => {
    this.setState({ showHide: !this.state.showHide });
  };

  getDate = () => {
    var date = new Date();
    var dateStr =
      ("00" + date.getDate()).slice(-2) +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    this.setState({ date: dateStr });
    console.log(dateStr)
    console.log(date.getTime())
  };

  handleModalSave = () => {
    this.setState({ showHide: !this.state.showHide });
    let announcement = {
      title: this.state.title,
      description: this.state.description,
      id: this.state.id,
      date: this.state.date,
    };
    const url = `http://localhost:3004/listOfAnnouncement`;
    createAnnouncement(url, announcement);
    getAllAnnouncement(url).then((response) => {
      this.props.handleToUpdate(response);
    });

    this.setState({
      title: "",
      description: "",
      id: 0,
      date: "",
    });
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  render() {
    return (
      <div>
        <Button variant="secondary" className="addButton" onClick={() => this.handleModalShowHide()}>
          Add new post
        </Button>
        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Add new post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label for="title">Title</label>
              <input
                className="modalInput"
                id="title"
                type="text"
                placeholder="Enter your title"
                value={this.state.title}
                onChange={this.handleChangeTitle}
              />
              <label>Description</label>
              <input
                className="modalInput"
                id="description"
                type="text"
                placeholder="Enter your body"
                value={this.state.description}
                onChange={this.handleChangeDescription}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => this.handleModalShowHide()}
            >
              Сlose
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => this.handleModalSave()}
            >
              Save сhanges
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddAnouncement;
