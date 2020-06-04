import React, { Component } from "react";
import Login from "../components/login";
import banner_img from '../styles/images/fullscreen_mode.png'

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      title: "Välkommen till kunskapspaketet ",
    };
  }

  render() {
    return (
      <div className="container-fluid main-container">
        <div className="banner">
          <div className="banner-content">
            <h5>{this.state.title}</h5>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto est voluptas distinctio cum.
            </p>
          </div>
          <div className="banner-image">
              <img src={banner_img} alt=""/>
          </div>
        </div>
        

          <Login />

      </div>
    );
  }
}
