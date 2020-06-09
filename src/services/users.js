import axios from 'axios';
import Notify from '../components/notify';

const BASEURL = 'https://europe-west3-kunskapspaketet.cloudfunctions.net/widgets/user';
export function removeUser(uid) {
  return axios.delete(`${BASEURL}/${uid}`);
}

export function createUser(user) {
  return axios.post(`${BASEURL}`, user);
}

export function updateUser(id, updatedValues) {
  return axios.put(`${BASEURL}/${id}`, updatedValues);
}

export function handleError(err) {
  console.log('err: ', err);
  console.log(JSON.stringify(err));
  Notify.error(`Något gick fel: ${err.message}`);
}
