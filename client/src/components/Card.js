import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Card(p) {
  const [isLiked, setIsLiked] = useState(p.liked);
  const [likes, setLikes] = useState(p.likes);


  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleLike = () => {
    axios
      .post("http://localhost:8080/api/post/like", {
        likedUser: p.mainUser,
        postid: p.postid,
      })
      .then((res) => {
        if (res.data.message) {
          setIsLiked(true);
          setLikes(likes + 1);
        }
      });
  };
  const handleDislike = () => {
    axios
      .post("http://localhost:8080/api/post/dislike", {
        likedUser: p.mainUser,
        postid: p.postid,
      })
      .then((res) => {
        if (res.data.message) {
          setIsLiked(false);
          setLikes(likes - 1);
        }
      });
  };

  return (
    <div className="max-w-md mx-auto h-auto bg-white shadow-xl rounded-lg overflow-hidden m-3 p-1  ">
      {/* <div className="p-4 grid grid-cols-6 gap-4 "> */}
      <h1 className="text-xl font-semibold  col-start-1 col-end-4 m-3 ms-5">
        <Link
          to={"/otherprofile/" + p.username}
          className="font-medium text-black"
        >
          <img
            className="h-8 w-8  rounded-full inline-block mr-2"
            src={p.avtar}
            alt="Profile"
          />
        </Link>
        {p.username}
      </h1>

      <div>
        {isFullScreen ? (
          <div
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black z-50 "
            onClick={toggleFullScreen}
          >
            <img
              src={p.image}
              alt="Profile"
              className="max-h-screen max-w-screen"
            />
          </div>
        ) : (
          <div
            className="ms-6 me-6"
            style={{ width: "330px", height: "330px" }}
          >
            <img
              src={p.image}
              alt="Profile"
              className="cursor-pointer w-full h-full "
              onClick={toggleFullScreen}
            />
          </div>
        )}
      </div>
      <h1 className="ms-7 mt-2 text-xl font-semibold">{p.title}</h1>
      <div className="grid grid-cols-10 p-4 ps-8 gap-1">
        {isLiked ? (
          <>
            <button onClick={handleDislike}>
              <FaHeart className="text-2xl text-red-500" />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLike}>
              <FaHeart className="text-2xl text-gray-500" />
            </button>
          </>
        )}
        <div>{likes}</div>
      </div>
    </div>
  );
}

export { Card };
