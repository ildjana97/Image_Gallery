// src/components/ImageDetails.tsx
import React from 'react';

interface ImageDetailsProps {
  image: {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    upvotes: number;
    downvotes: number;
    score: number;
  };
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ image }) => {
  return (
    <div>
      <img src={image.imageUrl} alt={image.title} />
      <h2>{image.title}</h2>
      <p>{image.description}</p>
      <p>Upvotes: {image.upvotes}</p>
      <p>Downvotes: {image.downvotes}</p>
      <p>Score: {image.score}</p>
    </div>
  );
};

export default ImageDetails;

