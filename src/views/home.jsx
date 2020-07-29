import React, { Component } from 'react';

import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Categories from '../components/categories';
import Navbar from '../components/navbar';
import { withTranslation } from 'react-i18next';
import i18n from '../i18next';
import Logo from '../components/logo';

class Home extends Component {
  render() {
    let selectedLanguage = this.props.i18n.language;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
      selectedLanguage = lng;
    };

    const { lectures, profile, languages, t } = this.props;

    if (languages?.length > 0) {
      languages.forEach(language => {
        this.props.i18n.addResourceBundle(language.name, 'translation', language.keys);
      });
    }

    return (
      <div>
        <div className="container-fluid public-container">
          <div className="welcome">
            <h6 className="text-white text-center py-3">Välkommen {profile.name ? profile.name : profile.email}</h6>
          </div>
          {lectures && lectures.length > 0 && <Categories lectures={lectures} />}

          <Logo />
          <div className="row m-0 px-2 py-3">
            <div className="translate_bt col-12 col-lg-9 mx-auto my-3 d-flex flex-column">
              <select
                className="form-control"
                style={{ maxWidth: '340px' }}
                value={selectedLanguage}
                onChange={e => changeLanguage(e.target.value)}>
                {languages?.map(lang => (
                  <option key={lang.id} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-lg-9 mx-auto pb-5 ">
              <h5>{t('welcomeTitle')}</h5>
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
    },
    {
      collection: 'i18n'
    }
  ]),
  connect(state => ({
    profile: state.firebase.profile,
    lectures: state.firestore.ordered.lectures,
    languages: state.firestore.ordered.i18n
  }))
);

export default enhance(withTranslation()(Home));
