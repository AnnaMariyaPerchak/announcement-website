import React from "react";
// import SearchBar from "./components/SearchBar";
import { getAllAnnouncement } from "../server/requests";
import { Modal, Button, Table } from "react-bootstrap";

class NewestAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      arrayToShow: [],
      exampleItems: [],
    };
    this.handleModalSave = this.handleModalSave.bind(this);
  }
  componentDidMount() {
    const url = "http://localhost:3004/listOfAnnouncement";
    getAllAnnouncement(url).then((response) => {
      this.setState({ exampleItems: response });
      let arr = [];
      this.state.exampleItems.forEach((i) => {
        let date = parseInt(i.date.split(" ")[0].split("/")[0], 10) * 86400;
        let month = parseInt(i.date.split(" ")[0].split("/")[1], 10) * 2629746;
        let year = parseInt(i.date.split(" ")[0].split("/")[2], 10) * 31536000;
        let hours = parseInt(i.date.split(" ")[1].split(":")[0], 10) * 3600;
        let minutes = parseInt(i.date.split(" ")[1].split(":")[1], 10) * 60;
        let seconds = parseInt(i.date.split(" ")[1].split(":")[2], 10);

        let dateInSec = seconds + minutes + hours + date + month + year;
        let obj = {
          date: dateInSec,
          id: i.id,
        };
        arr.push(obj);
      });
      for (let i = 0; i < this.state.exampleItems.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (arr[j].id === this.state.exampleItems[i].id) {
            this.state.arrayToShow.push(this.state.exampleItems[i]);
          }
        }
      }
    });
  }
  handleModalShowHide = () => {
    this.setState({ showHide: !this.state.showHide });
  };
  handleModalSave = () => {
    this.setState({ showHide: !this.state.showHide });
  };

  renderData = () => {
    return this.state.arrayToShow.map((announcement) => {
      const { id, title, description, date } = announcement;
      return (
        <tr key={id}>
          <td style={{ width: "20%" }}>{title}</td>
          <td>{description}</td>
          <td style={{ width: "15%" }}>{date}</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
          Three latest announcement
        </Button>
        <Modal size="lg" show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Three latest announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date added</th>
                </tr>
              </thead>
              <tbody>{this.renderData()}</tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => this.handleModalShowHide()}
            >
              Сlose
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewestAnnouncement;
