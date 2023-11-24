import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import NoteCards from './NoteCards';
import NoteModal from './NoteModal';
import apiClient from '../services/api-client';
import Barloader from './Barloader';

const Home = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const { data: notes, loading, error } = useFetch(update);

  const handleModal = () => {
    {
      loading || error ? setShowModal(false) : setShowModal(true);
    }
  };
  return (
    <>
      <h1>Noted</h1>
      <div>
        <FontAwesomeIcon
          icon={faPlus}
          className="plusIcon"
          onClick={handleModal}
        />
      </div>
      <div className="container">
        {error ? <p>{error}</p> : null}
        {loading ? (
          <Barloader />
        ) : (
          <NoteCards
            notes={notes}
            onUpdate={() => setUpdate((prev) => !prev)}
          />
        )}
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
