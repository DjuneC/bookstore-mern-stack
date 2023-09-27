import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const CreateBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: ""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSaveBook = async (e) => {
    e.preventDefault();
    const data = {
      title: book.title,
      author: book.author,
      publishYear: book.publishYear
    }
    setLoading(true);
    await axios
    .post("http://127.0.0.1:5555/api/v1/book/create", data)
    .then(() => {
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
      alert("An error has been throw while registering this book")
    })
    .finally(() => {
      setLoading(false)
    })
  }
  return (
    <Form
      typeForm="Create"
      book={book}
      setBook={setBook}
      loading={loading}
      handleSubmit={handleSaveBook}
    />
  );
}

export default CreateBook