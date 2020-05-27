import React, { Component } from "react";
import Mobile from "../components/navbar_mb";

export default class Categories_list extends Component {
  constructor() {
    super();
    this.state = {
      user: "Petter ",
    };
  }

  render() {
    return (
      <div className="container-fluid public-container">
        <div className="lecture_list">
          <ul>
            <li>förläsning 1</li>
            <li>förläsning 2</li>
            <li>förläsning 3</li>
            <li>förläsning 4</li>
            <li>förläsning 5</li>
            <li>förläsning 6</li>
            <li>förläsning 7</li>
            <li>förläsning 8</li>
            <li>förläsning 9</li>
            <li>förläsning 1</li>
            <li>förläsning 2</li>
            <li>förläsning 3</li>
            <li>förläsning 4</li>
            <li>förläsning 5</li>
            <li>förläsning 6</li>
            <li>förläsning 7</li>
            <li>förläsning 8</li>
            <li>förläsning 9</li>
          </ul>
        </div>
        <Mobile />
      </div>
    );
  }
}
