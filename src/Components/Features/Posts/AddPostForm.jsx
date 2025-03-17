import React, { useState, useEffect } from "react";
import { Upload, ArrowRight, ArrowLeft, XCircle, Send } from "lucide-react";
import { useCheckAuth } from "../../../Hooks/useCheckAuth";
import CustomTextArea from "../../Shared/CustomTextArea";
import CustomToggleSwitch from "../../Shared/CustomToggleSwitch";
import MediaCarousel from "../../Shared/MediaCarousel";

const AddPostForm = () => {
  const { user } = useCheckAuth();
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privacy: "public",
    tags: [],
  });
  const [errors, setErrors] = useState({
    media: false,
    title: false,
    description: false,
  });

  const [tagInput, setTagInput] = useState("");
  const maxFileUpload = 10;

  useEffect(() => {
    const isValid =
      mediaFiles.length > 0 &&
      formData.title.trim().length >= 3 &&
      formData.description.trim().length >= 10;

    setIsFormValid(isValid);
  }, [mediaFiles, formData.title, formData.description]);

  const setMediaFilesWithCheck = (updatedMedia) => {
    setMediaFiles(updatedMedia);
    if (updatedMedia.length === 0) {
      setIsUploaded(false);
    }
  };

  const validate = () => {
    const newErrors = {
      media: mediaFiles.length === 0,
      title: formData.title.trim().length < 3,
      description: formData.description.trim().length < 10,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).includes(true);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + mediaFiles.length <= maxFileUpload) {
      setMediaFiles([...mediaFiles, ...files]);
      setErrors((prev) => ({ ...prev, media: false }));
    } else {
      alert(`You can upload up to ${maxFileUpload} files only.`);
    }
    if (files.length > 0) {
      setIsUploaded(true);
    }
  };

  const handleBackClick = () => {
    setIsUploaded(false);
    setMediaFiles([]);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // Handle key press for tags
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Remove a tag
  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handlePost = () => {
    if (!validate()) return; // Stop if validation fails

    console.log("Submitting Post:", {
      mediaFiles,
      title: formData.title,
      description: formData.description,
      privacy: formData.privacy,
      tags: formData.tags,
    });
  };

  return (
    <div className=" bg-gray-200 dark:bg-gray-800 flex items-center justify-center p-6">
      <div className="max-w-lg w-100 bg-white dark:bg-gray-700 shadow-md rounded-lg">
        <div className="relative p-2 border-b-1 flex flex-row items-center justify-center border-gray-300 dark:border-gray-500">
          {isUploaded && (
            <ArrowLeft
              className="ml-2 absolute left-0 h-5 w-5"
              onClick={handleBackClick}
            />
          )}
          <h1 className="text-center text-black dark:text-white font-semibold">
            Create new post
          </h1>
        </div>
        {isUploaded ? (
          <MediaCarousel
            media={mediaFiles}
            setMedia={setMediaFilesWithCheck}
            maxLimit={maxFileUpload}
          />
        ) : (
          <div
            className={`h-50 w-full flex flex-col justify-center items-center gap-2`}
          >
            <h2 className="text-center text-black dark:text-white">
              Add your phots and videos here
            </h2>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center justify-center cursor-pointer"
            >
              Upload Files
            </label>
            {errors.media && (
              <p className="text-red-500 text-sm mt-1">
                At least one media file is required.
              </p>
            )}
          </div>
        )}
        <div className="p-3 flex flex-col gap-2 border-t-1 border-t-gray-300 mt-2">
          <div className="flex flex-row gap-2">
            <img
              src={user?.data?.profilePic || "assets/default_profile.webp"}
              alt={user?.username}
              className="w-6 h-6 object-cover rounded-full bg-gray-200 dark:bg-gray-500"
            />
            <p className="text-sm sm:text-base dark:text-gray-100 font-semibold text-center text-black">
              {user?.data?.username}
            </p>
          </div>
          <div className="border-b-1 border-gray-300">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                setErrors((prev) => ({ ...prev, title: false })); // Clear error
              }}
              className={`outline-0 w-full p-1 text-sm sm:text-base ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                Title must be at least 3 characters.
              </p>
            )}
          </div>
          <div className="border-b-1 border-gray-300">
            <CustomTextArea
              placeholder={"Description"}
              charCount={1000}
              value={formData.description}
              onChange={(desc) => {
                setFormData((prev) => ({ ...prev, description: desc }));
                setErrors((prev) => ({ ...prev, description: false })); // Clear error
              }}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description must be at least 10 characters.
              </p>
            )}
          </div>
          <div className="">
            <CustomToggleSwitch
              onChange={(newPrivacy) =>
                setFormData((prev) => ({ ...prev, privacy: newPrivacy }))
              }
              content={"Post Visibilty to public"}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-sm sm:text-base w-full p-2 outline-0 border-b-1 border-gray-300 rounded"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}{" "}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-1 text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between p-2">
          <button className="flex flex-row items-center justify-center w-30 bg-red-400 text-white py-2 rounded-md disabled:bg-gray-400">
            Cancel
          </button>
          <button
            disabled={!isFormValid}
            onClick={handlePost}
            className={`flex flex-row items-center justify-center w-30 py-2 rounded-md 
    ${
      isFormValid ? "bg-blue-500 text-white" : "bg-gray-400 cursor-not-allowed"
    }`}
          >
            Post
          </button>

          {/* <Send size={20} className="text-blue-500" /> */}
        </div>
      </div>
    </div>
  );
};

export default AddPostForm;
