import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class EditExercise extends Component {
  constructor(props) {
    super(props);


    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeGearName = this.onChangeGearName.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      description: '',
      gearName: [],
      duration: 0,
      date: new Date(),
      users: [],
      gear: []
    }
  }


  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          gearName: response.data.gearName,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })


    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/gear/')
      .then(response => {
        this.setState({ gear: response.data.map(gear => gear.gearName) });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }


  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeGearName(e) {
    this.setState({
      gearName: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }


  onChangeDate(date) {
    this.setState({
      date: date
    });
  }


  onSubmit(e) {
    e.preventDefault();


    const exercise = {
      username: this.state.username,
      description: this.state.description,
      gearName: this.state.gearName,
      duration: this.state.duration,
      date: this.state.date,
    };


    console.log(exercise);


    axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }


  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
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
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>


          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}