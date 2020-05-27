import React, { Component } from "react";
// import { videoTagString, VideoTag } from 'react-video-tag'

import Mobile from "../components/navbar_mb";

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
        <div className="lecture py-5">
          <div className="d-flex justify-content-center">
            <iframe title="vidoe" width="800px" height="350px" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
          </div>

          <div className="theory row mt-5">
            <div className="col-md-10 mx-auto content p-3">
              <h4>Title </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, nam quasi est distinctio consequuntur hic explicabo
                ducimus natus cumque, repellendus cum fuga modi minima iure
                quaerat suscipit, obcaecati dolores amet? Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Quidem, nam quasi est
                distinctio consequuntur hic explicabo ducimus natus cumque,
                repellendus cum fuga modi minima iure quaerat suscipit,
                obcaecati dolores amet? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Quidem, nam quasi est distinctio consequuntur
                hic explicabo ducimus natus cumque, repellendus cum fuga modi
                minima iure quaerat suscipit, obcaecati dolores amet? Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Quidem, nam
                quasi est distinctio consequuntur hic explicabo ducimus natus
                cumque, repellendus cum fuga modi minima iure quaerat suscipit,
                obcaecati dolores amet? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Quidem, nam quasi est distinctio consequuntur
                hic explicabo ducimus natus cumque, repellendus cum fuga modi
                minima iure quaerat suscipit, obcaecati dolores amet?end
                minima iure quaerat suscipit, obcaecati dolores amet? Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Quidem, nam
                quasi est distinctio consequuntur hic explicabo ducimus natus
                cumque, repellendus cum fuga modi minima iure quaerat suscipit,
                obcaecati dolores amet? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Quidem, nam quasi est distinctio consequuntur
                hic explicabo ducimus natus cumque, repellendus cum fuga modi
                minima iure quaerat suscipit, obcaecati dolores amet?end
                minima iure quaerat suscipit, obcaecati dolores amet? Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Quidem, nam
                quasi est distinctio consequuntur hic explicabo ducimus natus
                cumque, repellendus cum fuga modi minima iure quaerat suscipit,
                obcaecati dolores amet? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Quidem, nam quasi est distinctio consequuntur
                hic explicabo ducimus natus cumque, repellendus cum fuga modi
                minima iure quaerat suscipit, obcaecati dolores amet?end
              </p>
            </div>
          </div>
        </div>
        <Mobile />
      </div>
    );
  }
}
