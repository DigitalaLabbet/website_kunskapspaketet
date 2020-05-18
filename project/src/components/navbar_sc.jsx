import React, { Component } from "react";

export default class Navbar_sc extends Component {
  constructor() {
    super();

  }


  render() {
    return (

      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="navbar-brand" >Kunskapspaktet</div>


        <div className="navbar-collapse collapse " id="collapsingNavbarSm">
          <ul className="navbar-nav">
            <li>
              <div className="welcome mx-5">
                <h6 className="mb-0 text-white">Välkommen </h6>
              </div>
            </li>
          </ul>




          <ul className="navbar-nav">
            <li className="nav-item">
              Hem
            </li>
            <li className="nav-item">
              om oss
            </li>
            <li className="nav-item">
              kontakt oss
            </li>
            <li className="nav-item">
              admin sida
            </li>

          </ul>

        </div>

      </nav>



    );
  }
}
