import React, { useState } from 'react';

const menuItem = [
  {
    name: "Make Up"
  },
  {
    name: "Accesorios"
  }
  
];

const Categorias = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h2>Selecciona una opción:</h2>
      <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
        <option value="">Seleccionar...</option>
        {menuItem.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      {selectedOption && <p>Seleccionaste: {selectedOption}</p>}
    </div>
  );
}

export default Categorias;
