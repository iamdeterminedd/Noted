import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import NoteModalDetails from './NoteModalDetails';

const NoteCards = ({ notes, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        enqueueSnackbar('Note deleted', { variant: 'success' });
        onUpdate();
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleEditNote = (id) => {
    const data = {
      title,
      text,
    };

    axios
      .put(`http://localhost:5000/notes/${id}`, data)
      .then(() => {
        enqueueSnackbar('Note edited', { variant: 'success' });
        onUpdate();
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleNoteClicked = (id) => {
    setSelectedNoteId(id);
    setShowModal(true);
  };

  return (
    <>
      <div className="notecards-container">
        {notes?.map((item) => (
          <div className="card" key={item._id}>
            <div className="divXmark">
              <FontAwesomeIcon
                onClick={() => handleDeleteNote(item._id)}
                className="xmark-icon"
                icon={faXmark}
              />
            </div>
            <div
              className="card-content"
              onClick={() => handleNoteClicked(item._id)}
            >
              <div>
                <p className="note-title">{item.title}</p>
                <p className="note-content">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <NoteModalDetails
          onClose={() => setShowModal(false)}
          onUpdate={() => setUpdate((prev) => !prev)}
          id={selectedNoteId}
        />
      )}
    </>
  );
};

export default NoteCards;
