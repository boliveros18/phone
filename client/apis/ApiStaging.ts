import axios from "axios";

const ApiStaging = axios.create({
  baseURL: "https://staging.dls-innovation.com",
  headers: {
    'Content-Type': 'application/json',
  },
});


export default ApiStaging;
