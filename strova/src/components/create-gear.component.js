import React, { Component } from 'react';
import axios from 'axios';


export default class CreateGear extends Component {
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

    onChangeGearName(e) {
        this.setState({ 
          gearName: e.target.value
        })
    }

    onChangeGearType(e) {
      this.setState({ 
          gearType: e.target.value
      })
    }

    onSubmit(e) {
      e.preventDefault();
  
  
      const gear = {
        gearName: this.state.gearName,
        gearType: this.state.gearType
      }
  
  
      console.log(gear);
  
  
      axios.post('http://localhost:5000/gear/add/', gear)
        .then(res => console.log(res.data));
      
        this.setState({
          gearName: '',
          gearType: ''
      });
      alert("Gear Added");
      window.location = '/gear-list';
    }

    render() {
        return (
          <div>
            <h3>Create New Gear</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Gear Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.gearName}
                    onChange={this.onChangeGearName}
                    />
              </div>
              <div className="form-group"> 
                <label>Gear Type: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.gearType}
                    onChange={this.onChangeGearType}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Create Gear" className="btn btn-primary" />
              </div>
            </form>
          </div>
    )
  }
}