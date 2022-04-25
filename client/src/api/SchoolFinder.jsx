import axios from "axios";

// Change url between dev and production
const url = process.env.REACT_APP_SERVER_URL
  ? `${process.env.REACT_APP_SERVER_URL}/api/v1/schools`
  : "/api/v1/schools";

export default axios.create({
  baseURL: url,
});
