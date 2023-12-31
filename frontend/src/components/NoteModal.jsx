import { useSnackbar } from 'notistack';
import { useState } from 'react';
import apiClient from '../services/api-client';

const NoteModal = ({ onClose, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleAddNote = () => {
    const data = {
      title,
      text,
    };

    apiClient
      .post('/notes', data)
      .then(() => {
        enqueueSnackbar('Note Added', { variant: 'success' });
        onUpdate();
        onClose();
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  return (
    <div className="modal-bgscreen" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="divAddTitle">
          <input
            className="modal-input"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="divAddTextContent">
          <textarea
            className="modal-input"
            placeholder="Take a note..."
            type="text"
            value={text}
            rows="8"
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="divAddButton">
          <button className="btn-addNote" onClick={handleAddNote}>
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
