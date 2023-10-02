import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "axios";
import { useAuth } from "./AuthContext";

function Home() {
  const [allPost, setAllPost] = useState([]);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    axios.get("http://localhost:8080/api/post/getallpost").then((res) => {
      if (res.data.posts) {
        setAllPost(res.data.posts);
      } else {
        setAllPost([]);
      }
    });
  }, []);
  return (
    <div
      className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-16 bg-white p-10"
      style={{ userSelect: "none" }}
    >
      {allPost ? (
        <>
          {allPost.map((data, index) => {
            return (
              <div key={index}>
                <Card
                  username={data.username}
                  image={"http://localhost:8080/images/post/" + data.postimage}
                  likes={data.likes.length}
                  avtar={"http://localhost:8080/images/avtar/" + data.avtar}
                  mainUser={isLoggedIn.username}
                  liked={data.likes.includes(isLoggedIn.username)}
                  postid={data._id}
                  title={data.posttitle}
                />
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;

