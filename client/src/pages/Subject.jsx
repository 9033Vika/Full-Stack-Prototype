import React, { useEffect, useState } from "react";
import "../styles/courses.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { getNotes } from "../axios/notes";
import NoteCard from "../components/NoteCard";
import { setIsAddFile } from "../redux/reducers/misc";
import addFileImage from "../constants/addFileImage.png";
import InputForm from "../components/InputForm";
import Notes from "../components/Notes";
import ConfirmationBox from "../components/ConfirmationBox";
import { addToCart } from "../axios/cart";
import toast from "react-hot-toast";
import { server } from "../constants/MISC";

const Subject = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [chapterId, setChapterId] = useState(null);
  const [chapterImage, setChapterImage] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const { user, authLoader } = useSelector((state) => state.auth);
  const { notes, notesLoader } = useSelector((state) => state.notes);
  const { isAddFile, isDeleteFile } = useSelector((state) => state.misc);
  const { isShowImage } = useSelector((state) => state.misc);

  const openedChapter = (childId, childImage, childName) => {
    setChapterId(childId);
    setChapterImage(childImage);
    setChapterName(childName);
  };

  const handleAddToCart = async () => {
    const res = await addToCart(`${server}cart/addToCart`, params.id);

    if (res?.success) {
      toast.success(res?.message);
      navigate("/cart");
    } else {
      toast.error(res?.message);
    }
  };

  if (isShowImage) {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

  useEffect(() => {
    user?.cource?.map(({ _id }) => {
      if (_id.toString() === params.id.toString()) {
        setIsOwner(true);
      }
    });
    getNotes(dispatch, `${server}note/getNote/${params.id}`);
  }, [dispatch, isShowImage, user]);

  return authLoader || notesLoader ? (
    <Loader />
  ) : (
    <>
      <div className="CoursesParent">
        <h1 className="courcesHeader">chapters</h1>
        <div className="courcesCards">
          <div className="coursesCard">
            {notes.map(({ _id, chapter, images }, i) => (
              <NoteCard
                user={user}
                key={i}
                name={chapter}
                id={_id}
                images={images}
                openedChapter={openedChapter}
                index={isOwner}
              />
            ))}
            {user && user.isAdmin ? (
              <div
                className="coursesCard-card"
                onClick={() => dispatch(setIsAddFile(true))}
              >
                <div className="coursesCard-card__image-container">
                  <img className="coursesCard-image" src={addFileImage} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {!isOwner && !user?.isAdmin ? (
          <div className="purchaseButtonBox">
            <button className="buyBtn" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        ) : null}
      </div>
      {isAddFile && <InputForm type={"chapter"} id={params.id} />}
      {isShowImage && (
        <Notes
          user={user}
          images={chapterImage}
          id={chapterId}
          name={chapterName}
        />
      )}
      {isDeleteFile?.status ? (
        <ConfirmationBox type={"chapter"} id={params.id} />
      ) : null}
    </>
  );
};

export default Subject;
