import axios from 'axios';
import URL from "../static/url.json"

const rttfURL = URL.rttfURL;
export function fetchRttf(name){

  const user = {
    searchNN: name
  }
  axios.get(rttfURL, {user})
    .then(res => {
      console.groupCollapsed('rttf')
      console.log(res);
      console.log(res.status);
      console.log(res.data);
      console.groupEnd();
    })
}