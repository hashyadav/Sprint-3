// src/Components/Home/MiddlePart/TwitCard/ReplyModal.jsx
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTweetReply, findTwitsById } from "../../../../Store/Tweet/Action";
import { uploadToCloudinary } from "../../../../Utils/UploadToCloudinary";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Avatar, Box, Button, Modal, TextField } from "@mui/material";
import * as Yup from "yup";
import BackdropComponent from "../../../Backdrop/Backdrop";
import { formatTweetTimeDetailed, formatTweetTime } from "../../../../Utils/TimeUtils";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Reply text is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
  outline: "none",
  maxHeight: "80vh",
  overflowY: "auto",
};

const ReplyModal = ({ handleClose, twitData, open }) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  // ensure initialValues update when twitData changes
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId: twitData?.id || null,
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      if (!values.content || !values.content.trim()) {
        actions.setSubmitting(false);
        return;
      }

      actions.setSubmitting(true);
      try {
        // create reply on server
        await dispatch(createTweetReply({
          twitId: values.twitId,
          content: values.content.trim(),
          image: values.image || null,
        }));

        // re-fetch the twit (so reply list comes fresh from backend)
        if (values.twitId) {
          await dispatch(findTwitsById(values.twitId));
        }

        // reset UI
        actions.resetForm();
        setSelectedImage("");
        handleClose();
      } catch (err) {
        console.error("Reply error:", err);
        // optionally show a toast here
      } finally {
        actions.setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    // When modal opens/selected twit changes, sync twitId into formik
    formik.setFieldValue("twitId", twitData?.id || null);
  }, [twitData?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectImage = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const imgUrl = await uploadToCloudinary(file, "image");
      formik.setFieldValue("image", imgUrl);
      setSelectedImage(imgUrl);
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="reply-modal">
      <Box sx={style}>
        <div className="flex space-x-5">
          <Avatar alt="Avatar" src={twitData?.user?.image || ""} />
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div>
                <p className="flex items-center space-x-2">
                  <span className="font-semibold">
                    {twitData?.user?.fullName || "Unknown User"}
                  </span>
                  <span className="text-gray-600 text-sm">
                    @{twitData?.user?.fullName ? twitData.user.fullName.toLowerCase().split(" ").join("_") : "user"}
                    {" · "}
                    <span title={formatTweetTimeDetailed(twitData?.createdAt)}>
                      {formatTweetTime(twitData?.createdAt)}
                    </span>
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-2">
              <p className="mb-2 text-sm text-gray-700">{twitData?.content || ""}</p>
            </div>
          </div>
        </div>

        <section className="py-6">
          <div className="flex space-x-5">
            <Avatar alt="Avatar" src={auth?.user?.image || ""} />
            <div className="w-full">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <TextField
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Write your reply"
                    multiline
                    rows={4}
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 1000 }}
                  />
                  {formik.touched.content && formik.errors.content && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.content}</div>
                  )}
                </div>

                {selectedImage && !uploadingImage && (
                  <div className="mt-3">
                    <img className="w-full max-h-60 object-contain rounded" src={selectedImage} alt="selected" />
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center cursor-pointer">
                      <ImageIcon style={{ color: "#1d9bf0" }} />
                      <input type="file" accept="image/*" className="hidden" onChange={handleSelectImage} />
                    </label>
                    <FmdGoodIcon style={{ color: "#1d9bf0" }} />
                    <TagFacesIcon style={{ color: "#1d9bf0" }} />
                  </div>

                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={uploadingImage || formik.isSubmitting || !formik.values.content.trim()}
                      sx={{ bgcolor: "#1d9bf0", borderRadius: "20px", color: "white" }}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section>
          <BackdropComponent open={uploadingImage || formik.isSubmitting} />
        </section>
      </Box>
    </Modal>
  );
};

export default ReplyModal;
