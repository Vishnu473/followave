import React, { useState, useRef } from "react";
import { Upload, ArrowRight, ArrowLeft, XCircle } from "lucide-react";

const AddPost = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privacy: "public",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setLoading(true);
    const filePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setTimeout(() => {
      setSelectedFiles(filePreviews);
      setLoading(false);
    }, 1000);
  };

  // Open file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Remove a file
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add tags
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

  // Move to next step
  const handleNext = () => {
    if (selectedFiles.length === 0) {
      alert("Please upload at least one media file.");
      return;
    }
    setStep(2);
  };

  // Move back to previous step
  const handleBack = () => {
    setFormData({ title: "", description: "", privacy: "public", tags: [] });
    setStep(1);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting post:", { ...formData, media: selectedFiles });
  };

  // Reset form
  const handleCancel = () => {
    setSelectedFiles([]);
    setFormData({ title: "", description: "", privacy: "public", tags: [] });
    setStep(1);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 bg-opacity-90 dark:bg-gray-800 min-h-screen p-6">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-600 rounded-lg shadow-md p-6">
        {/* Step 1: Upload Media */}
        {step === 1 && (
          <>
            <h1 className="text-xl font-bold text-center mb-4">Upload Media</h1>
            <div className="border border-dashed border-gray-400 p-6 rounded-lg text-center">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleUploadClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center mx-auto"
              >
                <Upload className="w-5 h-5 mr-2" /> Upload Files
              </button>
              {loading && <p className="mt-2 text-gray-500">Uploading...</p>}
            </div>

            {/* Preview Section */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {selectedFiles.map((fileObj, index) => (
                <div key={index} className="relative group">
                  {fileObj.file.type.startsWith("image/") ? (
                    <img src={fileObj.preview} className="w-full h-24 object-cover rounded-lg" />
                  ) : (
                    <video src={fileObj.preview} className="w-full h-24 rounded-lg" controls />
                  )}
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-75 hover:opacity-100 transition"
                    onClick={() => removeFile(index)}
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button onClick={handleNext} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
              Next <ArrowRight className="inline-block ml-2" />
            </button>
          </>
        )}

        {/* Step 2: Enter Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl font-bold text-center">Post Details</h1>

            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>

            <select name="privacy" value={formData.privacy} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            {/* Tags Input */}
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tag}{" "}
                    <button type="button" onClick={() => removeTag(index)} className="ml-1 text-red-500">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input type="text" placeholder="Add a tag and press Enter" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={handleKeyPress} className="w-full p-2 border rounded" />
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                <ArrowLeft className="inline-block mr-2" /> Back
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPost;
