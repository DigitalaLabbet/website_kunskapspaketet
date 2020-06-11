import React from 'react';

import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useTranslation } from 'react-i18next';

import Categories from '../components/categories';
import Navbar from '../components/navbar';

const Home = ({ profile, lectures }) => {
  const { t, i18n } = useTranslation();

  function handle_language(lang) {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <div className="container-fluid public-container">
        <div className="welcome">
          <h6 className="text-white text-center py-3">Välkommen {profile.name ? profile.name : profile.email}</h6>
        </div>
        {lectures && lectures.length > 0 && <Categories lectures={lectures} />}
        <div className="row m-0 mt-4 px-2">
          <div className="translate_btn">
            <button className="btn btn-outline-light bt-sm text-muted" onClick={() => handle_language('ar')}>
              ar
            </button>
            <button className="btn btn-outline-light bt-sm text-muted" onClick={() => handle_language('en')}>
              en
            </button>
            <button className="btn btn-outline-light bt-sm text-muted" onClick={() => handle_language('sv')}>
              en
            </button>
          </div>
          <div className="col-md-10 mx-auto px-0 pb-5">
            <h5>{t('title')}</h5>
            <hr className="my-2" />
           
          </div>
        </div>
      </div>
      <Navbar role={profile.role} />
    </div>
  );
};
const enhance = compose(
  firebaseConnect(),
  firestoreConnect(() => [
    {
      collection: 'lectures',
      where: ['isVisible', '==', true]
    }
  ]),
  connect(state => ({
    profile: state.firebase.profile,
    lectures: state.firestore.ordered.lectures
  }))
);

export default enhance(Home);
