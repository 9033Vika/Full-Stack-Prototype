import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../axios/user";
import { useNavigate } from "react-router-dom";
import { server } from "../constants/MISC";
import CoursesCard from "../components/CoursesCard";
import Loader from "../components/Loader";
import "../styles/courses.css";
import "../styles/history.css";
import { getPayment } from "../axios/cart";
import TableBody from "../components/TableBody";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, authLoader } = useSelector((state) => state.auth);
  const { payment, paymentLoader } = useSelector((state) => state.payment);

  useEffect(() => {
    getPayment(dispatch, `${server}cart/getPayment`);
    getProfile(dispatch, `${server}user/profile`);
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return authLoader || paymentLoader ? (
    <Loader />
  ) : (
    <>
      <div className="CoursesParent">
        <h1 className="courcesHeader">My Courses</h1>
        <div className="courcesCards">
          <div className="coursesCard">
            {user?.cource?.map(({ _id, subjectName }, i) => (
              <CoursesCard
                key={i}
                name={subjectName}
                user={user}
                id={_id}
                type={"subject"}
                status={true}
              />
            ))}
          </div>
        </div>
        <section className="history">
          <h1>Fixed Table header</h1>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Transaction ID</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                {payment?.map(({ paymentId, cart, createdAt }) => (
                  <TableBody
                    key={paymentId}
                    id={paymentId}
                    cart={cart}
                    date={createdAt}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
