// src/components/ImageGallery.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/types';
import { fetchImages, ImageActionTypes, Image } from '../redux/actions';
import { ThunkDispatch } from 'redux-thunk'; // Import ThunkDispatch type

export const ImageGallery: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, ImageActionTypes> = useDispatch(); // Set the dispatch type
  const { images, loading, error } = useSelector((state: RootState) => state.images);

  useEffect(() => {
    dispatch(fetchImages('hot', true, 'viral', 'day'));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Task</h1>
      {images.map((image: Image) => (
        <div key={image.id}>
          <img src={image.link} alt={image.title} />
          <div>{image.title}</div>
          <div>{image.description}</div>
          <div>Upvotes: {image.ups}</div>
          <div>Downvotes: {image.downs}</div>
          <div>Score: {image.score}</div>
        </div>
      ))}
      <p>End of file</p>
    </div>
  );
};
