import React, { useState } from 'react';
import { Property } from '../types';
import '../styles/AddPropertyModal.css';

interface Props {
  property: Property;
  onClose: () => void;
  onUpdate: (updated: Property) => void;
}

const UpdatePropertyModal: React.FC<Props> = ({ property, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Omit<Property, 'isAvailable'>>({
    id: property.id,
    title: property.title,
    address: property.address,
    price: property.price,
    photoUrls: property.photoUrls || [],
    type: property.type,
    numberOfRooms: property.numberOfRooms,
    peopleCapacity: property.peopleCapacity,
    size: property.size,
    additionalInfo: property.additionalInfo || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'photoUrls') {
      setFormData({ ...formData, photoUrls: value.split(',') });
    } else if (
      name === 'price' ||
      name === 'numberOfRooms' ||
      name === 'peopleCapacity' ||
      name === 'size'
    ) {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/properties/${property.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update property');

      const contentType = response.headers.get('content-type');
      let updated: Property | null = null;

      if (contentType && contentType.includes('application/json')) {
        updated = await response.json();
      }

      if (updated) {
        onUpdate(updated);
      }

      onClose();
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update property');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Property</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={formData.title} onChange={handleChange} required />
          <input name="address" value={formData.address} onChange={handleChange} required />
          <input name="price" type="number" value={formData.price} onChange={handleChange} required />
          <input name="type" value={formData.type} onChange={handleChange} required />
          <input name="numberOfRooms" type="number" value={formData.numberOfRooms} onChange={handleChange} required />
          <input name="peopleCapacity" type="number" value={formData.peopleCapacity} onChange={handleChange} required />
          <input name="size" type="number" value={formData.size} onChange={handleChange} required />
          <input name="photoUrls" value={formData.photoUrls.join(',')} onChange={handleChange} required />
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Additional Info (optional)" />

          <div className="modal-buttons">
            <button type="submit">Update Property</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyModal;
