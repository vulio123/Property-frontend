import React, { useState } from 'react';
import { Property } from '../types';
import '../styles/PropertyCard.css';

interface PropertyCardProps {
  property: Property;
  onDelete: (id: number) => void;
  onUpdate: (property: Property) => void;
  onCompare: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
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
        {property.photoUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Photo ${idx + 1}`}
            className="thumbnail"
            onClick={() => handlePhotoClick(url)}
          />
        ))}
      </div>

      <div className="property-actions">
        <button className="delete-button" onClick={() => onDelete(property.id)}>Delete</button>
        <button className="compare-button" onClick={() => onUpdate(property)}>Update</button>
        <button className="compare-button" onClick={() => onCompare(property)}>Compare</button>
      </div>
    </div>
  );
};

export default PropertyCard;
