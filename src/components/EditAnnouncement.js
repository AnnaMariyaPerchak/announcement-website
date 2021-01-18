import React from "react";
import { Modal, Button } from "react-bootstrap";
import { editAnnouncement, getAllAnnouncement } from "../server/requests";
import "./style.css";

class EditAnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      title: this.props.announcement.title,
      description: this.props.announcement.description,
      id: this.props.announcement.id,
      date: this.props.announcement.date,
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleModalSave = this.handleModalSave.bind(this);
  }

  componentDidMount = () => {
    var date = new Date();
    var dateStr =
      ("00" + (date.getMonth()+1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    this.setState({ date: dateStr });
  };

  handleModalShowHide = () => {
    this.setState({ showHide: !this.state.showHide });
  };

  handleModalSave = (id) => {
    this.setState({ showHide: !this.state.showHide });
    let announcement = {
      title: this.state.title,
      description: this.state.description,
      id: id,
      date: this.state.date,
    };
    const url = `http://localhost:3004/listOfAnnouncement/${id}`;
    editAnnouncement(url, announcement);

    const urlForAll = "http://localhost:3004/listOfAnnouncement";
    getAllAnnouncement(urlForAll).then((response) => {
      this.props.handleToUpdate(response);
    });
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    return (
      <div>
        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
          Edit announcement
        </Button>
        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Edit announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label for="title">Title</label>
              <input
                className="modalInput"
                id="title"
                type="text"
                value={this.state.title}
                onChange={this.handleChangeTitle}
              />
              <label>Description</label>
              <input
                className="modalInput"
                id="description"
                type="text"
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
              onClick={() => this.handleModalSave(this.state.id)}
            >
              Save сhanges
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditAnouncement;
