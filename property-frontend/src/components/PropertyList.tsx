import React from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../types';
import '../styles/PropertyList.css';

interface PropertyListProps {
  properties: Property[];
  onDelete: (id: number) => void;
  onUpdate: (property: Property) => void;
  onCompare: (property: Property) => void;
  selected: (Property | null)[];
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onDelete,
  onUpdate,
  onCompare,
  selected,
}) => {
  const isSelected = (id: number) => selected.some((p) => p?.id === id);

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div
          key={property.id}
          className={`property-card-wrapper ${isSelected(property.id) ? 'selected' : ''}`}
        >
          <PropertyCard
            property={property}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onCompare={onCompare}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
