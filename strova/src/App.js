import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import GearList from "./components/gear-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import CreateGear from './components/create-gear.component';
import EditGear from "./components/edit-gear.component";


function App() {
        return (
                <Router>
                        <div className="container">
                                <Navbar />
                                <br/>
                                <Route path="/" exact component={ExercisesList} />
                                <Route path="/edit/:id" component={EditExercise} />
                                <Route path="/gear-list" exact component={GearList} />
                                <Route path="/create-log" component={CreateExercise} />
                                <Route path="/create-users" component={CreateUser} />
                                <Route path="/create-gear" component={CreateGear} />
                                <Route path="/edit-gear/:id" component={EditGear} />
                        </div>
                </Router>
);
}


export default App;