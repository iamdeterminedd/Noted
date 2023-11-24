import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const NoteModalDetails = ({ onClose, onUpdate, id }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    apiClient
      .get(`/notes/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setText(res.data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditNote = () => {
    const data = {
      title,
      text,
    };

    apiClient
      .put(`/notes/${id}`, data)
      .then(() => {
        enqueueSnackbar('Note edited', { variant: 'success' });
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="divAddTextContent">
          <textarea
            className="modal-input"
            type="text"
            value={text}
            rows="8"
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="divAddButton">
          <button className="btn-addNote" onClick={handleEditNote}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModalDetails;
