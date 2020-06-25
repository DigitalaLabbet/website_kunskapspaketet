import React, { Component } from 'react';
import '../styles/css/logo.css'
import img_kronoberg from '../styles/images/kronoberg.jpg';
import img_etabl from '../styles/images/etablering.jpg';
import img_euro from '../styles/images/euroFlag.jpg';

class Logo extends Component {

render(){
    return (
          <div className="logo">
              <div className="logo-images">
                  <img className="p-1" src={img_kronoberg} alt=""/>
                  <img className="p-1" src={img_euro} alt="" />
                  <img className="p-1" src={img_etabl} alt="" />
              </div>
          </div>
    );
  }
}

export default Logo;
