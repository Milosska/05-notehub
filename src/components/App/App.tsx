import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

// services
import { fetchNotes } from "@services/noteService";

// styles
import css from "./App.module.css";

// components
import SearchBox from "@components/SearchBox";
import Loader from "@components/Loader";
import NoteList from "@components/NoteList";
import Pagination from "@components/Pagination";

function App() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes(page),
    placeholderData: keepPreviousData,
  });

  const { notes, totalPages } = data || { notes: [], totalPages: 0 };

  useEffect(() => {
    if (isSuccess && notes.length && totalPages === 0) {
      toast.error(`No notes found for current request.`);
    }
  }, [notes.length, totalPages, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(`${error}`);
    }
  }, [isError, error]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        )}
        {/* Кнопка створення нотатки */}
      </header>
      {isLoading && <Loader />}
      {!isError && notes.length > 0 && <NoteList notes={notes} />}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
