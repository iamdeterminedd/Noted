import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCards from './NoteCards';

const Home = () => {
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
  return <NoteCards notes={notes} />;
};

export default Home;
