import ShowBook from "./pages/ShowBook";
import CreateBook from "./pages/CreateBook";
import Home from "./pages/Home";
import DeleteBook from "./pages/DeleteBook";
import UpdateBook from "./pages/UpdateBook";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/create' element={<CreateBook/>} />
      <Route path='/books/show/:id' element={<ShowBook/>} />
      <Route path='/books/remove/:id' element={<DeleteBook/>} />
      <Route path='/books/update/:id' element={<UpdateBook/>} />
    </Routes>
  )
}

export default App