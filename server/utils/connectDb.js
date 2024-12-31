import { connect } from "mongoose";

const connection = (uri) => {
  connect(uri, {
      dbName: "onlineCource",
    })
    .then((data) => {
      console.log("database connected");
    })
    .catch((err) => {
      throw err;
    });
};

export default connection;
