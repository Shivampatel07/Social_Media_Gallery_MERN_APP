import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

function Userprofile() {
  const { isLoggedIn } = useAuth();
  const [postData, setPostData] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);
  useEffect(() => {
    axios
      .post("http://localhost:8080/api/post/getpost", {
        username: isLoggedIn.username,
      })
      .then((res) => {
        if (res.data.posts) {
          setPostData(res.data.posts);
        } else {
          setPostData([]);
        }
        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {});
  }, []);

  const deletePost = (id) => {
    axios
      .post("http://localhost:8080/api/post/deletepost", {
        id: id,
      })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          window.location.reload();
        }
        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {});
  };

  const deleteUser = (username) => {
    axios
      .post("http://localhost:8080/api/post/deleteuser", { username })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          setCookie("token", "", { path: "/", maxAge: -1 });
          setCookie("token", "", { path: "/", maxAge: -1 });
          setCookie("token", "", { path: "/", maxAge: -1 });
          window.location.reload();
        } else if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="container mx-auto px-4 py-8 bg-[#ffffff]">
            {/* Profile Photo and Follow Button */}
            <div className="text-center">
              <img
                className="h-32 w-32 rounded-full mx-auto mb-4"
                src={"http://localhost:8080/images/avtar/" + isLoggedIn.image}
                // srcSet="images/alternate.jpg"
                alt="Profile"
              />
              <h1 className="text-2xl font-semibold">{isLoggedIn.username}</h1>
            </div>

            {/* Image Upload Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-10">Uploaded Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Replace with a map function to generate responsive photo cards */}
                {/* Example card */}

                {postData ? (
                  <>
                    {postData.map((data, index) => {
                      return (
                        <div
                          className="bg-white rounded-lg shadow-md overflow-hidden"
                          key={index}
                        >
                          <img
                            src={
                              "http://localhost:8080/images/post/" +
                              data.postimage
                            }
                            alt="Uploaded-Something"
                            className="w-full h-48 object-cover "
                          />{" "}
                          <div className="p-4">
                            <h3 className="text-lg font-semibold ">
                              {data.posttitle}
                            </h3>

                            <p className="text-gray-600">
                              {" "}
                              <b>Tags :</b>
                              {data.arttag && <>Art</>}
                              {"  "}
                              {data.lifestyletag && <>Lifestyle</>}
                              {"  "}
                              {data.naturetag && <>Nature</>}
                              {"  "}
                              {data.technologytag && <>Technology</>}
                              {"  "}
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-1/2"
                              onClick={() => deletePost(data._id)}
                            >
                              Delete Post
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-end me-10">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => deleteUser(isLoggedIn.username)}
                >
                  Delete Account
                </button>
              </div>
              {/* End of example card */}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Userprofile;
