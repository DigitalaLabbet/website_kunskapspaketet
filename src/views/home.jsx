import React, { Component } from 'react';

import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Categories from '../components/categories';
import Navbar from '../components/navbar';
import { withTranslation } from 'react-i18next';
import i18n from '../i18next';

class Home extends Component {
  render() {
    const possibleLanguages = [
      { short: 'ar', long: 'Arabiska' },
      { short: 'en', long: 'Engelska' },
      { short: 'sv', long: 'Svenska' },
      { short: 'so', long: 'Somaliska' },
      { short: 'ur', long: 'Urdu' }
    ];
    let selectedLanguage = this.props.i18n.language;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
      selectedLanguage = lng;
    };

    const { lectures, profile, t } = this.props;

    return (
      <div>
        <div className="container-fluid public-container">
          <div className="welcome">
            <h6 className="text-white text-center py-3">Välkommen {profile.name ? profile.name : profile.email}</h6>
          </div>
          {lectures && lectures.length > 0 && <Categories lectures={lectures} />}
          <div className="row m-0 my-4 px-2 py-3">

            <div className="translate_bt col-md-10 mx-auto my-5 d-flex flex-column">
              <label style={{fontSize: '18px', fontWeight: "600"}}>Översätta : </label>
              <select
                className="custom-select w-25"
                value={selectedLanguage}
                onChange={e => changeLanguage(e.target.value)}>
                {possibleLanguages.map(lang => (
                  <option key={lang.short} value={lang.short}>
                    {lang.long}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-10 mx-auto pb-5 ">
              <h5>{t('title')}</h5>
              <hr className="my-2" />
              <p>{t('description')}</p>
            </div>
          </div>
        </div>
        <Navbar role={profile.role} />
      </div>
    );
  }
}
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

export default enhance(withTranslation()(Home));
