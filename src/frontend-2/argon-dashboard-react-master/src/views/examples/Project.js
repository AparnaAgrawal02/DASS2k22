import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
        project: {}
    };
}
      
render() {

    return (
        <div className="Projects">
        <h1>
           {this.state.project.ProjectName}
        </h1>
        <h1>
           {this.state.project.ProjectDetails}
        </h1>
      </div>
       );
   }
}
export default Project;