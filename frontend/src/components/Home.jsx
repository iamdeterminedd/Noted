import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NoteCards from './NoteCards';
import NoteModal from './NoteModal';
import { fetchData } from '../services/api-client.js';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const { data: notes, error } = useFetch(
    'http://localhost:5000/notes',
    update
  );

  console.log(notes);

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
        <NoteCards notes={notes} onUpdate={() => setUpdate((prev) => !prev)} />
      </div>
      {showModal && (
        <NoteModal
          onClose={() => setShowModal(false)}
          onUpdate={() => setUpdate((prev) => !prev)}
        />
      )}
    </>
  );
};

export default Home;
