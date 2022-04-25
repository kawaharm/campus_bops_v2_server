import axios from "axios";

// Change url between dev and production
const url = process.env.REACT_APP_SERVER_URL
  ? `${process.env.REACT_APP_SERVER_URL}/api/v1/songs`
  : "/api/v1/songs";

export default axios.create({
  baseURL: url,
});
