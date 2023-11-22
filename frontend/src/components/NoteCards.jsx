import React from 'react';

const NoteCards = ({ notes }) => {
  return (
    <div>
      {notes.map((item) => (
        <div className="card" key={item._id}>
          <div className="card-content">
            <p className="note-title">{item.title}</p>
            <p className="note-content">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteCards;
