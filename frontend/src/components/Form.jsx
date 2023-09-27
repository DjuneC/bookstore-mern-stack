import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const Form = ({ typeForm, book, setBook, loading, handleSubmit}) => {
  return (
    <div className="p-4">
    <BackButton />
    <h1 className="text-3xl my-4">{typeForm} Book</h1>
    {/* {loading ? <Spinner/> : ""} */}
    <form className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto" onSubmit={handleSubmit}>
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Title</label>
        <input
          type="text"
          value={book.title}
          onChange={(e) => setBook({...book, title: e.target.value})}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Author</label>
        <input
          type="text"
          value={book.author}
          onChange={(e) => setBook({...book, author: e.target.value})}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Publish Year</label>
        <input
          type="number"
          value={book.publishYear}
          onChange={(e) => setBook({...book, publishYear: e.target.value})}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <button type="submit" disabled={loading} className="p-2 bg-sky-300 m-8">
        {loading ? `${typeForm}...` : typeForm}
      </button>
    </form>
  </div>
  )
}

export default Form