import React, { useState } from 'react';
import './styles.css';

const UploadImage = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editing !== null) {
      const newImages = [...images];
      newImages[editing] = { ...newImages[editing], image: newImage || newImages[editing].image, description: newDescription };
      setImages(newImages);
      setEditing(null);
    } else {
      const newImageObj = { image: newImage, description: newDescription };
      setImages([...images, newImageObj]);
    }

    setNewImage('');
    setNewDescription('');
  };

  const handleDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleEdit = (index) => {
    setEditing(index);
    setNewImage(images[index].image);
    setNewDescription(images[index].description);
  };

  const handleFileChange = (e) => {
    if (editing === null) {
      setNewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="container">
      <h1>Image Upload App</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description" />
        <button type="submit">{editing !== null ? 'Save' : 'Upload'}</button>
      </form>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-card">
            {editing === index ? (
              <div>
                <input type="file" onChange={handleFileChange} />
                <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description" />
                <button onClick={handleSubmit}>Save</button>
              </div>
            ) : (
              <div>
                <img src={image.image} alt={image.description} />
                <p>{image.description}</p>
                <div className="button-container">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
