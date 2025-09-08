import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import TwitCard from "./TwitCard/TwitCard";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets } from "../../../Store/Tweet/Action";
import BackdropComponent from "../../Backdrop/Backdrop";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import EmojiPicker from "emoji-picker-react";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required("Tweet text is required")
    .min(1, "Tweet cannot be empty")
    .max(280, "Tweet cannot exceed 280 characters"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const dispatch = useDispatch();
  const { twit, auth, theme } = useSelector((store) => store);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [openEmoji, setOpenEmoji] = useState(false);
  const handleOpenEmoji = () => setOpenEmoji(!openEmoji);
  const handleCloseEmoji = () => setOpenEmoji(false);

  const handleSubmit = (values, actions) => {
    console.log("Submitting tweet with values:", values);
    console.log("User authenticated:", !!auth.user);
    console.log("JWT token:", localStorage.getItem("jwt"));
    
    dispatch(createTweet(values));
    actions.resetForm();
    setSelectedImage("");
    setSelectedVideo("");
    handleCloseEmoji();

    // Reset file inputs
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      video: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

 
  const uploadToCloudinary = async (file, fileType = null) => {
    if (!file) {
      throw new Error("No file provided");
    }

    // determine resource type
    let resourceType = fileType || "image";
    if (!fileType) {
      if (file.type?.startsWith("video/")) resourceType = "video";
      else if (!file.type?.startsWith("image/")) resourceType = "raw";
    }

    const cloudName = "dnewcdvgt"; // your cloud name
    const uploadPreset = "twitterapp"; // use the exact unsigned preset name you tested
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", uploadPreset);

    // debug logs (safe to remove later)
    console.log("Uploading to Cloudinary endpoint:", endpoint);
    console.log("Form keys:", Array.from(form.keys())); // should show ["file","upload_preset"]

    const res = await fetch(endpoint, { method: "POST", body: form });

    // always read raw text and try parse JSON so we can surface Cloudinary message
    const rawText = await res.text();
    let body;
    try {
      body = rawText ? JSON.parse(rawText) : null;
    } catch (err) {
      body = rawText;
    }

    console.log("Cloudinary status:", res.status, "body:", body);

    if (!res.ok) {
      const message = (body && body.error && body.error.message) || rawText || `Upload failed with status ${res.status}`;
      const e = new Error(message);
      e.raw = body;
      e.status = res.status;
      throw e;
    }

    // success: prefer secure_url
    const url = (body && (body.secure_url || body.url)) || null;
    if (!url) {
      throw new Error("Upload succeeded but Cloudinary returned no URL");
    }

    return url;
  };

  const handleSelectImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setUploadingImage(true);
    try {
      const imgUrl = await uploadToCloudinary(file, "image");
      formik.setFieldValue("image", imgUrl);
      setSelectedImage(imgUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image: " + (error.message || "Unknown error"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSelectVideo = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file");
      return;
    }

    setUploadingImage(true);
    try {
      const videoUrl = await uploadToCloudinary(file, "video");
      formik.setFieldValue("video", videoUrl);
      setSelectedVideo(videoUrl);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video: " + (error.message || "Unknown error"));
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);

  const handleEmojiClick = (value) => {
    const { emoji } = value;
    formik.setFieldValue("content", formik.values.content + emoji);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>

      <section className={`pb-10 ${theme.currentTheme === "dark" ? " bg-[#151515] p-10 rounded-md mb-10" : ""}`}>
        <div className="flex space-x-5 ">
          <Avatar alt="Avatar" src={auth.user?.image} />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <textarea
                  name="content"
                  placeholder="What is happening?"
                  className={`border-none outline-none text-xl bg-transparent w-full resize-none overflow-hidden`}
                  style={{
                    minHeight: '40px',
                    maxHeight: '200px',
                    height: 'auto'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                  }}
                  {...formik.getFieldProps("content")}
                  rows={1}
                />
                {formik.errors.content && formik.touched.content && (
                  <div className="text-red-500">{formik.errors.content}</div>
                )}
              </div>

              {!uploadingImage && (
                <div>
                  {selectedImage && <img className="w-[28rem]" src={selectedImage} alt="" />}
                  {selectedVideo && (
                    <video controls className="w-[28rem] mt-2" src={selectedVideo} />
                  )}
                </div>
              )}

              {/* Character Counter */}
              <div className="flex justify-end mt-2">
                <span 
                  className={`text-sm ${
                    formik.values.content.length > 260 
                      ? 'text-red-500' 
                      : formik.values.content.length > 240 
                        ? 'text-yellow-500' 
                        : 'text-gray-500'
                  }`}
                >
                  {formik.values.content.length}/280
                </span>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      ref={imageInputRef}
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                      accept="image/*"
                    />
                  </label>

                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <SlideshowIcon className="text-[#1d9bf0]" />
                    <input
                      ref={videoInputRef}
                      type="file"
                      name="videoFile"
                      className="hidden"
                      onChange={handleSelectVideo}
                      accept="video/*"
                    />
                  </label>

                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <div className="relative">
                    <TagFacesIcon onClick={handleOpenEmoji} className="text-[#1d9bf0] cursor-pointer" />
                    {openEmoji && (
                      <div className="absolute top-10 z-50">
                        <EmojiPicker theme={theme.currentTheme} onEmojiClick={handleEmojiClick} lazyLoadEmojis={true} />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#1d9bf0",
                      borderRadius: "20px",
                      paddingY: "8px",
                      paddingX: "20px",
                      color: "white",
                    }}
                    disabled={uploadingImage || twit.loading || formik.values.content.length > 280}
                  >
                    {twit.loading ? "Posting..." : "Tweet"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* twit section */}
      <section className={`${theme.currentTheme === "dark" ? "pt-14" : ""} space-y-5`}>
        {twit.twits?.map((item) => (
          <TwitCard key={item.id} twit={item} />
        ))}
      </section>

      <section>
        <BackdropComponent open={uploadingImage} />
      </section>
    </div>
  );
};

export default HomeSection;
