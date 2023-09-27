import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";


const DeleteBook = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleDeleteBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
    .delete(`http://127.0.0.1:5555/api/v1/book/remove/${id}`)
    .then(() => {
      navigate('/');
    })
    .catch(() => {
      alert("An error has been throw while deleting this book");
    })
    .finally(() => {
      setLoading(false)
    })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}

      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h2 className="text-2xl">Are you sure you want to delete this book ?</h2>
        <button 
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
          disabled={loading}
        >
          Yes, delete it !
        </button>
      </div>
    </div>
  )
}

export default DeleteBook