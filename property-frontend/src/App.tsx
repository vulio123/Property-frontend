import React, { useEffect, useState } from 'react';
import PropertyList from './components/PropertyList';
import CompareBox from './components/CompareBox';
import { Property } from './types';
import AddPropertyModal from './components/AddPropertyModal';
import UpdatePropertyModal from './components/UpdatePropertyModal';
import './styles/App.css';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [compareProperties, setCompareProperties] = useState<(Property | null)[]>([null, null]);

  const fetchProperties = async () => {
    try {
      const res = await fetch('http://localhost:8080/properties');
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/properties/${id}`, {
        method: 'DELETE',
      });
      setProperties((prev) => prev.filter((property) => property.id !== id));
    } catch (err) {
      console.error('Failed to delete property:', err);
    }
  };

  const handleUpdateClick = (property: Property) => {
    setEditingProperty(property);
  };

  const handleAddProperty = (newProperty: Property) => {
    setProperties((prev) => [...prev, newProperty]);
    setIsAddModalOpen(false);
  };

  const handleUpdateSubmit = async (updated: Property) => {
    try {
      const response = await fetch(`http://localhost:8080/properties/${updated.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      });

      if (!response.ok) throw new Error('Failed to update property');

      const updatedProperty = await response.json();

      setProperties((prev) =>
        prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
      );

      setEditingProperty(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCompare = (property: Property) => {
    setCompareProperties((prev) => {
      if (prev[0]?.id === property.id || prev[1]?.id === property.id) {
        return prev.map((p) => (p?.id === property.id ? null : p));
      }
      if (!prev[0]) return [property, prev[1]];
      if (!prev[1]) return [prev[0], property];
      return [property, null]; // Replace the first one if both filled
    });
  };

  const clearComparison = () => {
    setCompareProperties([null, null]);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Property Listings</h1>
        <button className="add-button" onClick={() => setIsAddModalOpen(true)}>
          Add Property
        </button>
      </div>

      <CompareBox properties={compareProperties} onRemove={clearComparison} />

      <PropertyList
        properties={properties}
        onDelete={handleDelete}
        onUpdate={handleUpdateClick}
        onCompare={handleCompare}
        selected={compareProperties}
      />

      {isAddModalOpen && (
        <AddPropertyModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddProperty}
        />
      )}

      {editingProperty && (
        <UpdatePropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onUpdate={handleUpdateSubmit}
        />
      )}
    </div>
  );
};

export default App;
