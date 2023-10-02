import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

function Uploadpost() {
  const { isLoggedIn } = useAuth();
  const [post, setPost] = useState({
    naturetag: false,
    technologytag: false,
    lifestyletag: false,
    arttag: false,
  });
  const [image, setImage] = useState({});

  const handleImageUpload = (e) => {
    setPost({ ...post, [e.target.name]: e.target.files[0] });
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setImage(imageUrl);
  };

  const handleChange = (e) => {
    if (
      e.target.name === "naturetag" ||
      e.target.name === "technologytag" ||
      e.target.name === "lifestyletag" ||
      e.target.name === "arttag"
    ) {
      if (e.target.checked) {
        setPost({ ...post, [e.target.name]: true });
      } else {
        setPost({ ...post, [e.target.name]: false });
      }
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  const handleUploadButton = async (e) => {
    e.preventDefault();
    const username = await isLoggedIn.username;
    post.username = await username;
    post.avtar = await isLoggedIn.image;
    await axios
      .post("http://localhost:8080/api/post/uploadpost", post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
        } else if (res.data.error) {
          toast.error(res.data.error);
        }
        setPost({
          naturetag: false,
          technologytag: false,
          lifestyletag: false,
          arttag: false,
        });
        setImage({});
      })
      .catch((err) => {
        console.log("Error occured while uploading post");
      });
  };

  return (
    <form className="bg-[#ffffff] pb-10 mt-16" onSubmit={handleUploadButton}>
      <div className="container mx-auto px-4 py-8 ">
        <div className="lg:flex items-center justify-center">
          {/* Left Side: Image Upload */}
          <div className="w-full lg:w-1/2 p-4 lg:mr-4">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="relative border-dashed border-2 border-gray-300 bg-gray-100 p-4 rounded-lg text-center">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-1/2 h-1/2 mx-auto mb-4 object-cover rounded-lg"
                  />
                ) : (
                  <div>
                    <FaCloudUploadAlt className="mx-auto text-gray-400 text-5xl mb-4" />
                    <p className="text-gray-600">Click to upload an image</p>
                  </div>
                )}
              </div>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              name="postimage"
              onChange={handleImageUpload}
            />
          </div>

          {/* Right Side: Tags */}
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">Tags</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#4dc47d]"
                  name="naturetag"
                  onChange={handleChange}
                />
                <span className="ml-2">Nature</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#4dc47d]"
                  name="technologytag"
                  onChange={handleChange}
                />
                <span className="ml-2">Technology</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#4dc47d]"
                  name="lifestyletag"
                  onChange={handleChange}
                />
                <span className="ml-2">Lifestyle</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#4dc47d]"
                  name="arttag"
                  onChange={handleChange}
                />
                <span className="ml-2">Art</span>
              </label>
            </div>
            <div className="grid grid-cols-1 gap-5 mt-10">
              <Input
                size="lg"
                label="Title"
                name="posttitle"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Button Centered at the Bottom */}
      <div className="flex justify-center my-8 ">
        <button
          className="bg-[#31fe92] text-white py-2 px-4 rounded-full"
          type="submit"
        >
          Upload
        </button>
      </div>
    </form>
  );
}

export default Uploadpost;
