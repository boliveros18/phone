import axios from "axios";

const ApiServer = axios.create({
  baseURL: "https://phone-server-production.up.railway.app/api", 
});

export default ApiServer;
