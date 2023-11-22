import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NoteCards from './NoteCards';
import NoteModal from './NoteModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/notes')
      .then((res) => {
        setNotes(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h1>Noted</h1>
      <div>
        <FontAwesomeIcon
          icon={faPlus}
          className="plusIcon"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="container">
        <NoteCards notes={notes} />
      </div>
      {showModal && <NoteModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Home;
