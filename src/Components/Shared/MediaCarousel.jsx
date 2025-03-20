import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Image } from "lucide-react";
import { api } from "../../Services/ApiService";
import { APIEndPoints } from "../../Services/UrlConstants";

const MediaCarousel = ({ media, setMedia, maxLimit, setHaveFiles, setCanceledMedia }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  if (!media || media.length === 0) return null;

  //Circular carousel
  //   const nextSlide = () => {
  //     setCurrentIndex((prev) => (prev + 1) % media.length);
  //   };

  //   const prevSlide = () => {
  //     setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  //   };

  //   const removeMedia = (index) => {
  //     const updatedMedia = media.filter((_, i) => i !== index);
  //     setMedia(updatedMedia);
  //     if (currentIndex >= updatedMedia.length) {
  //       setCurrentIndex(Math.max(0, updatedMedia.length - 1));
  //     }
  //   };

  //   For strict slider
  const nextSlide = () => {
    if (currentIndex < media.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const removeMedia = (index) => {
    console.log("Available Media",media);
    const updatedMedia = media.filter((_, i) => i !== index);
    console.log("After removing media",updatedMedia);
    const removedFile = media[index];
    setCanceledMedia((prev) => [...prev,removedFile])
    setMedia(updatedMedia);
    if (updatedMedia.length === 0) {
      setHaveFiles(updatedMedia.length > 0)
    } else if (currentIndex >= updatedMedia.length && updatedMedia.length > 0) {
      setCurrentIndex(updatedMedia.length - 1);
    }
  };

  const handleAddMedia = async (event) => {
    const files = Array.from(event.target.files);
    console.log(files);
    
    if (files.length + media.length > maxLimit) {
      alert(`You can upload up to ${maxLimit} files only.`);
      return;
    }
    // if (files.length > 0) {
    //   setIsUploaded(true);
    // }
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    // const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    const uploadedMedia = [];

    try {
      if (imageFiles.length > 0) {
        const imageFormData = new FormData();
        if(imageFiles.length === 1){
          console.log(imageFiles);
          
          imageFormData.append("file",imageFiles[0]);
          console.log("FormData",imageFormData);
          
        }
        else{
          imageFiles.forEach((file) =>
            imageFormData.append("files", file)
          );
        }
        

        const imageResponse = await api.post(
          imageFiles.length > 1
            ? APIEndPoints.uploadMultipleImages
            : APIEndPoints.uploadSingleProfilePic,
          imageFormData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(imageResponse);

        if (imageResponse.data.success) {
          const multipleFiles = Array.isArray(imageResponse.data.file);

          if (!multipleFiles) {
            let file = imageResponse.data.file;
            uploadedMedia.push({
              url: file.path,
              publicId: file.filename,
              type: file.mimetype,
            });
          } else {
            imageResponse.data.file.forEach((file, index) => {
              uploadedMedia.push({
                url: imageResponse.data.url[index],
                publicId: file.filename,
                type: file.mimetype,
              });
            });
          }
        }
      }

      // if (videoFiles.length > 0) {
      //   const videoFormData = new FormData();
      //   videoFiles.forEach((file) =>
      //     videoFormData.append(videoFiles.length > 1 ? "files" : "file", file)
      //   );

      //   const videoResponse = await api.post(
      //     videoFiles.length > 1
      //       ? APIEndPoints.uploadMultipleVideos
      //       : APIEndPoints.uploadSingleVideo,
      //     videoFormData,
      //     {
      //       withCredentials: true,
      //       headers: { "Content-Type": "multipart/form-data" },
      //     }
      //   );

      //   if (videoResponse.data.success) {
      //     const multipleFiles = videoResponse.data.file.length === 1 ? false : true;

      //     if (!multipleFiles) {
      //       let file = videoResponse.data.file;
      //       uploadedMedia.push({
      //         url: file.path,
      //         publicId: file.filename,
      //         type: file.mimetype,
      //       });
      //     } else {
      //       videoResponse.data.file.forEach((file, index) => {
      //         uploadedMedia.push({
      //           url: videoResponse.data.url[index],
      //           publicId: file.filename,
      //           type: file.mimetype,
      //         });
      //       });
      //     }
      //   }
      // }

      if (uploadedMedia.length > 0) {
        setMedia((prev) => [...prev, ...uploadedMedia]);
        // setErrors((prev) => ({ ...prev, media: false }));
      }
      // else {
      //   setIsUploaded(false);
      // }
    } catch (error) {
      console.error("Upload error:", error);
      // setIsUploaded(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full flex justify-center items-center">
        {/* {media.length > 1 && ( -----For circular slider */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 p-1 bg-gray-800/50 rounded-full text-white"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="w-full h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {media[currentIndex].type.startsWith("image/") ? (
            <img
              src={media[currentIndex].url}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={media[currentIndex].url}
              controls
              className="w-full h-full"
            />
          )}
        </div>

        {/* {media.length > 1 && ( ----For circular slider*/}
        {currentIndex < media.length - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-2 p-1 bg-gray-800/50 rounded-full text-white"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {media.length > 1 && (
        <div className="absolute bottom-8 flex space-x-1">
          {media.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {media.length > 0 && (
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="mt-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300"
        >
          <Image size={18} />
          <span>{showPreview ? "Hide" : "Edit"}</span>
        </button>
      )}

      {showPreview && (
        <div className="w-full flex overflow-x-auto gap-2 p-2 mt-2 bg-gray-200 dark:bg-gray-700 rounded-md">
          {media.map((file, index) => (
            <div key={index} className="relative flex-shrink-0">
              {file.type.startsWith("image/") ? (
                <img
                  src={file.url}
                  alt="Thumbnail"
                  className="h-16 w-16 object-cover rounded-md"
                />
              ) : (
                <video src={file.url} className="h-16 w-16 rounded-md" />
              )}

              <button
                onClick={() => removeMedia(index)}
                className="absolute top-0 right-0 bg-black/50 p-1 rounded-full"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}

          {media.length < maxLimit && (
            <label className="flex-shrink-0 cursor-pointer">
              <div className="h-16 w-16 flex items-center justify-center bg-gray-300 dark:bg-gray-500 rounded-md">
                <Plus size={20} className="text-gray-600 dark:text-white" />
              </div>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleAddMedia}
                className="hidden"
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
