import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GearFunc = props => (
  <tr>
    <td>{props.gear.gearName}</td>
    <td>{props.gear.gearType}</td>
    <td>
        <Link to={"/editgear/"+props.gear._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGear(props.gear._id) }}>delete</a>
    </td>
  </tr>
)

export default class GearList extends Component {
  constructor(props) {
    super(props);

    this.deleteGear = this.deleteGear.bind(this)

    this.state = {gear: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/gear/')
      .then(response => {
        this.setState({ gear: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteGear(id) {
    axios.delete('http://localhost:5000/gear/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      gear: this.state.gear.filter(el => el._id !== id)
    })
  }

  gearList() {
    return this.state.gear.map(currentgear => {
      return <GearFunc gear={currentgear} deleteGear={this.deleteGear} key={currentgear._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Gear List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Gear Name</th>
              <th>Gear Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.gearList() }
          </tbody>
        </table>
      </div>
    )
  }
}