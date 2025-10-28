import "./App.css";
import index from "./index.css";
import NoteForm from "./components/NotesForm";
import NotesList from "./components/NoteList";

function App() {
  return (
    <>
      <NoteForm />
      <NotesList />
    </>
  );
}

export default App;
