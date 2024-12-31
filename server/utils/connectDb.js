import { connect } from "mongoose";

const connection = (uri) => {
  connect(uri)
    .then((data) => {
      console.log("database connected");
    })
    .catch((err) => {
      throw err;
    });
};

export default connection;
