import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const NoteModalDetails = ({ onClose, onUpdate, id }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/notes/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setText(res.data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleAddNote = () => {
    const data = {
      title,
      text,
    };
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

export default NoteModalDetails;
