import React from 'react';
import { Property } from '../types';
import '../styles/CompareBox.css';

interface CompareBoxProps {
  properties: (Property | null)[];
  onRemove: () => void;
}

const CompareBox: React.FC<CompareBoxProps> = ({ properties, onRemove }) => {
  return (
    <div className="compare-box-wrapper">
      {properties.map((property, index) =>
        property ? (
          <div key={index} className="compare-item">
            <h2 className="compare-title">{property.title}</h2>
            <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
            <p><strong>Rooms:</strong> {property.numberOfRooms}</p>
            <p><strong>Size:</strong> {property.size} sqft</p>
            <div className="compare-additional">
              <p><strong>Info:</strong> {property.additionalInfo?.slice(0, 80)}...</p>
            </div>
          </div>
        ) : (
          <div key={index} className="compare-item placeholder">
            <p>Select Property</p>
          </div>
        )
      )}
      <button className="compare-clear-button" onClick={onRemove}>
        Clear Comparison
      </button>
    </div>
  );
};

export default CompareBox;
