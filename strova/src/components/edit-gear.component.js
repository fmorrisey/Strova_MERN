import React, { Component } from 'react';
//import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class EditExercise extends Component {
  constructor(props) {
    super(props);


    this.onChangeGearName = this.onChangeGearName.bind(this);
    this.onChangeGearType = this.onChangeGearType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      gearName: '',
      gearType: '',
      gear: []
    }
  }


  componentDidMount() {
    axios.get('http://localhost:5000/gear/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          gearName: response.data.gearName,
          gearType: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })


    axios.get('http://localhost:5000/gear/')
      .then(response => {
        this.setState({ users: response.data.map(gear => gear.gearName) });
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/gear/')
      .then(response => {
        this.setState({ gear: response.data.map(gear => gear.gearType) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeGearName(e) {
    this.setState({
      gearName: e.target.value
    });
  }

  onChangeGearType(e) {
    this.setState({
      gearType: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();


    const gear = {
      gearName: this.state.gearName,
      gearType: this.state.gearType,
    };


    console.log(gear);


    axios.post('http://localhost:5000/gear/update/'+this.props.match.params.id, gear)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }


  render() {
    return (
      <div>
        <h3>Edit Gear Item</h3>
        <form onSubmit={this.onSubmit}>
          <label>Gear Name: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.gearName}
                onChange={this.onChangeGearName}>
                {
                  this.state.gear.map(function(gear) {
                    return <option 
                      key={gear}
                      value={gear}>{gear}
                      </option>;
                  })
                }
            </select>
          <div>
          <label>Gear Type: </label>
          <select ref="userInput"
              className="form-control"
              value={this.state.gearType}
              onChange={this.onChangeGearType}>
              {
                this.state.gear.map(function(gear) {
                  return <option 
                    key={gear}
                    value={gear}>{gear}
                    </option>;
                })
              }
          </select>
          </div>  
          


          <div className="form-group">
            <input type="submit" value="Edit Gear Item" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}