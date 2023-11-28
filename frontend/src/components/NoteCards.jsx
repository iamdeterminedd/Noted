import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import apiClient from '../services/api-client';
import NoteModalDetails from './NoteModalDetails';

const NoteCards = ({ notes, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteNote = (id) => {
    apiClient
      .delete(`/notes/${id}`)
      .then(() => {
        enqueueSnackbar('Note deleted', { variant: 'success' });
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
              {/* <div className="date-container"> */}
              <span className="date-label">
                {new Date(item.updatedAt).toLocaleDateString('en-US')}
              </span>
              {/* </div> */}
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
          onUpdate={onUpdate}
          id={selectedNoteId}
        />
      )}
    </>
  );
};

export default NoteCards;
