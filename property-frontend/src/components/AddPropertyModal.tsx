import React, { useState } from 'react';
import { Property } from '../types';
import '../styles/AddPropertyModal.css';

interface Props {
  onClose: () => void;
  onAdd: (property: Property) => void;
}

const AddPropertyModal: React.FC<Props> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<Omit<Property, 'id' | 'isAvailable'>>({
    title: '',
    address: '',
    price: 0,
    photoUrls: [''],
    type: '',
    numberOfRooms: 1,
    peopleCapacity: 1,
    size: 0,
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

  
    if (name === 'photoUrls') {
      setFormData({ ...formData, photoUrls: value.split(',').map(url => url.trim()) });
    } else if (['price', 'numberOfRooms', 'peopleCapacity', 'size'].includes(name)) {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      const newProperty = await response.json();
      onAdd(newProperty);
      onClose();
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Property</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
          <input name="type" placeholder="Type (e.g. House)" onChange={handleChange} required />
          <input name="numberOfRooms" type="number" placeholder="Rooms" onChange={handleChange} required />
          <input name="peopleCapacity" type="number" placeholder="Capacity" onChange={handleChange} required />
          <input name="size" type="number" placeholder="Size in sqft" onChange={handleChange} required />
          <input name="photoUrls" placeholder="Photo URLs (comma separated)" onChange={handleChange} required />
          <textarea name="additionalInfo" placeholder="Additional Info" onChange={handleChange}></textarea>

          <div className="modal-buttons">
            <button type="submit">Add Property</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;
