import React, { Component } from "react";

import Categories from "../components/categories";
import Mobile from "../components/navbar_mb";
import Navbar from "../components/navbar_sc";


export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      user: "Petter ",
    };
  }


  render() {
    return (
      <div className="container-fluid public-container">


        {/*  --------------Navbar------------------- */}

        <Navbar user={this.state.user} />
        <Categories />
        <div className="row instructions">
          <div className="col-md-10 mx-auto content">
            <h5>instruktioner om hur eleverna kan använda kategorierna</h5>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
              recusandae commodi dolorem aperiam quibusdam, itaque temporibus
              nobis, praesentium, corrupti officiis debitis unde voluptate
              quaerat veritatis. Sed officiis nihil ipsum vitae!
            </p>
          </div>
        </div>

        <Mobile />
      </div>
    );
  }
}
