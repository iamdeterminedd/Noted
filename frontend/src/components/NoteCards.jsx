import { faTrash } from '@fortawesome/free-solid-svg-icons';
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

  const contentWithBreaks = (text) => {
    if (text.includes('\n')) {
      const resultWithBreaks = text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));

      return <p className="note-content">{resultWithBreaks}</p>;
    } else {
      return <p className="note-content">{text}</p>;
    }
  };

  return (
    <>
      {notes?.map((item) => (
        <div className="card" key={item._id}>
          <div className="divDate">
            <span className="date-label">
              {new Date(item.updatedAt).toLocaleDateString('en-US')}
            </span>
          </div>
          <div
            className="card-content"
            onClick={() => handleNoteClicked(item._id)}
          >
            <div>
              <p className="note-title">{item.title}</p>
              {contentWithBreaks(item.text)}
            </div>
          </div>
          <div className="divTrash">
            <FontAwesomeIcon
              onClick={() => handleDeleteNote(item._id)}
              className="trash-icon"
              icon={faTrash}
            />
          </div>
        </div>
      ))}
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
