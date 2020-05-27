import React from 'react';

const RegisterForm = (props) => {
  return (
    <div>
      <div className="modal fade" id="adduser" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="adduser">
                lägg till ny användare
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* content will be here */}
              <form action="">
                <div className="form-group">
                  <label> Namn </label>
                  <input type="text" className="form-control" placeholder="Namn" />
                </div>
                <div className="form-group">
                  <label> E-post </label>
                  <input type="email" className="form-control" placeholder="E-post" />
                </div>
                <div className="form-group">
                  <label> Lösenord </label>
                  <input type="password" className="form-control" placeholder="lösenord" />
                </div>
                <div className="form-group">
                  <label> Roll </label>
                  <select className="form-control form-control-sm">
                    <option>elev</option>
                    <option>Lärare</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Stäng
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Spara
                  </button>
                </div>
              </form>
              {/* content end here */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="lecture" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="adduser">
                lägg till ny föreläsning
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* content will be here */}
              <div className="form-group">
                <label> kategori </label>
                <select className="form-control form-control-sm">
                  <option>Hälsa</option>
                  <option>Svenska</option>
                  <option>Arbetsfråga</option>
                  <option>SO</option>
                  <option>Utbildning</option>
                  <option>Annat</option>
                </select>
              </div>

              <form action="">
                <div className="form-group">
                  <label> video url </label>
                  <input type="text" className="form-control" placeholder="url" />
                </div>
                <div className="form-group">
                  <label>Mer info</label>
                  <textarea className="form-control" name="" id="" cols="30" rows="10"></textarea>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Stäng
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Spara
                  </button>
                </div>
              </form>
              {/* content end here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
