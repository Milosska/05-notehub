import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

// styles
import css from "./App.module.css";

// hooks
import { useFetchNotes } from "@hooks/useFetchNotes";

// components
import SearchBox from "@components/SearchBox";
import Loader from "@components/Loader";
import NoteList from "@components/NoteList";
import Pagination from "@components/Pagination";
import Modal from "@components/Modal";
import NoteForm from "@components/NoteForm";

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isError, notes, totalPages } = useFetchNotes({
    page,
    query,
  });

  const handleSearchQueryChange = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearchQueryChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {!isError && notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <NoteForm setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
