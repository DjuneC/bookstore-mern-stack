import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";

const UpdateBook = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: ""
  })
  
  useEffect(()=>{
    const fetchPost = async () => {
      setLoading(true)
      await axios
      .get(`http://127.0.0.1:5555/api/v1/book/show/${id}`)
      .then((response)=>{
        setBook({
          title: response.data.title,
          author: response.data.author,
          publishYear: response.data.publishYear
        });
      })
      .catch((error)=>{
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
    }

    if(id) fetchPost();
  },[id])

  const updateBook = async (e) => {
    e.preventDefault();
    const data = {...book};

    setLoading(true);
    await axios
    .patch(`http://127.0.0.1:5555/api/v1/book/update/${id}`, data)
    .then(() => {
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
      alert("An error has been throw while updating this book")
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <Form
      typeForm="Edit"
      book={book}
      setBook={setBook}
      loading={loading}
      handleSubmit={updateBook}
    />
  )
}

export default UpdateBook