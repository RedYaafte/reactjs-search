import React from 'react';

const SearchDate = ({ date, text }) => {
  return (
    <div>
      <p>Fecha: {text}</p>
      <p>Servicos durante el día: {date.length}</p>
    </div>
  )
};

export default SearchDate;