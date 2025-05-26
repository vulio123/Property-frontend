import React, { useState } from 'react';
import { Property } from '../types';
import '../styles/PropertyGrid.css';

interface PropertyCardProps {
  property: Property;
  onDelete: (id: number) => void;
  onUpdate: (property: Property) => void;
  onCompare: (property: Property) => void;
}

const PropertyGrid: React.FC<PropertyCardProps> = ({
  property,
  onDelete,
  onUpdate,
  onCompare,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(property.photoUrls[0]);

  const handlePhotoClick = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
  };

  return (
    <div className="property-card">
      <h3>{property.title}</h3>
      <img src={selectedPhoto} alt={property.title} className="property-photo" />
      <p>{property.address}</p>
      <p>Price: ${property.price}</p>
      <p>Type: {property.type}</p>
      <p>Rooms: {property.numberOfRooms}</p>
      <p>Capacity: {property.peopleCapacity}</p>
      <p>Size: {property.size} sqft</p>

      <div className="property-photos">
        {property.photoUrls.map((photoUrl: string, index: number) => (
          <img
            key={index}
            src={photoUrl}
            alt={`Property photo ${index + 1}`}
            className="thumbnail"
            onClick={() => handlePhotoClick(photoUrl)}
          />
        ))}
      </div>

      <div className="property-actions">
        <button onClick={() => onDelete(property.id)} className="delete-button">Delete</button>
        <button onClick={() => onUpdate(property)} className="update-button">Update</button>
        <button onClick={() => onCompare(property)} className="compare-button">Compare</button>
      </div>
    </div>
  );
};

export default PropertyGrid;
