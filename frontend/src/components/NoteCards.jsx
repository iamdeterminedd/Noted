import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

const NoteCards = ({ notes }) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        enqueueSnackbar('Note deleted', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="notecards-container">
      {notes.map((item) => (
        <div className="card" key={item._id}>
          <div className="card-content">
            <div className="divXmark">
              <FontAwesomeIcon
                onClick={() => handleDeleteNote(item._id)}
                className="xmark-icon"
                icon={faXmark}
              />
            </div>
            <p className="note-title">{item.title}</p>
            <p className="note-content">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteCards;
