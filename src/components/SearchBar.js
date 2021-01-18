import React from "react";
import { Button, Table } from "react-bootstrap";
import Pagination from "./Pagination";
import EditAnouncement from "./EditAnnouncement";
import AddAnouncement from "./AddAnnouncement";
import NewestAnnouncement from "./NewestAnnouncement";
import { deleteAnnouncement } from "../server/requests";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      pageOfItems: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.handleToUpdate = this.handleToUpdate.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      filtered: this.props.items,
    });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      filtered: nextProps.items,
    });
  };

  handleToUpdate = (data) => {
    this.setState({ filtered: data });
  };

  handleChange = (e) => {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      currentList = this.props.items;
      newList = currentList.filter((item) => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.state.filtered;
    }
    this.setState({
      pageOfItems: newList,
    });
  };

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems: pageOfItems });
  };

  deleteElem = (id, elem) => {
    deleteAnnouncement(
      `http://localhost:3004/listOfAnnouncement/${id}`,
      elem
    ).then(() => {
      const del = this.state.filtered.filter(
        (announcement) => id !== announcement.id
      );
      this.setState({ filtered: del });
    });
  };

  renderData = (page) => {
    return page.map((announcement, index) => {
      const { id, title, description,date } = announcement;
      return (
        <tr key={id}>
          <td style={{ width: "15%" }}>{title}</td>
          <td >
            <p className='tableDescription' style={{    height: '150px',overflow: 'auto'}}>{description}</p>
            </td>
          <td style={{ width: "15%" }}>{date}</td>
          <td style={{ width: "10%" }}>
            <Button
              variant="secondary"
              onClick={() => {
                this.deleteElem(announcement.id, announcement);
              }}
            >
              Delete announcement
            </Button>
          </td>
          <td style={{ width: "10%" }}>
            <EditAnouncement
              announcement={announcement}
              handleToUpdate={this.handleToUpdate}
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="header">
          <AddAnouncement handleToUpdate={this.handleToUpdate} />
          <NewestAnnouncement />
          <input
            type="text"
            className="inputSearchBar"
            onChange={this.handleChange}
            placeholder="Search..."
          />
        </div>

        <Table striped bordered responsive>
          <thead>
            <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date added</th>
            <th></th>
            <th></th>
            </tr>
          </thead>
          <tbody>{this.renderData(this.state.pageOfItems)}</tbody>
        </Table>
        <Pagination
          items={this.state.filtered}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default SearchBar;
