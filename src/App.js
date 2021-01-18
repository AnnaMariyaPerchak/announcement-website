import React from "react";
import SearchBar from "./components/SearchBar";
import { getAllAnnouncement } from "./server/requests";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exampleItems: [],
    };
  }
  componentDidMount() {
    const url = "http://localhost:3004/listOfAnnouncement";
    getAllAnnouncement(url).then((response) => {
      this.setState({ exampleItems: response });
    });

    
  }

  render() {
    return <SearchBar items={this.state.exampleItems} />
  }
}

export default App;
