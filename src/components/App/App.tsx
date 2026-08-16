import { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

// services
import { fetchNotes, createNote, deleteNote } from "@services/noteService";

// styles
import css from "./App.module.css";

// components
import SearchBox from "@components/SearchBox";
import Loader from "@components/Loader";
import NoteList from "@components/NoteList";
import Pagination from "@components/Pagination";
import Modal from "@components/Modal";
import NoteForm from "@components/NoteForm";

// types
import type { CreateNoteData } from "@shared-types/note";
import type { FormikState } from "formik";

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const queryClient = useQueryClient();

  type CreateNoteMutationVariables = {
    noteData: CreateNoteData;
    formResetCallback: (
      nextState?: Partial<FormikState<CreateNoteData>>,
    ) => void;
  };

  const { mutate: handleNoteCreate, isPending: isNoteCreatePending } =
    useMutation({
      mutationFn: ({ noteData }: CreateNoteMutationVariables) =>
        createNote(noteData),
      onSuccess: (_, { formResetCallback }) => {
        formResetCallback();
        setIsModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
      onError: (error) => {
        toast.error(`Failed to create note. ${error}`);
      },
    });

  const {
    mutate: handleNoteDelete,
    isPending: isNoteDeletePending,
    variables: removeNoteId,
  } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      toast.error(`Failed to remove note. ${error}`);
    },
  });

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
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {!isError && notes.length > 0 && (
        <NoteList
          notes={notes}
          onNoteDelete={handleNoteDelete}
          isPending={isNoteDeletePending}
          removeNoteId={removeNoteId}
        />
      )}
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <NoteForm
            setIsModalOpen={setIsModalOpen}
            handleNoteCreate={handleNoteCreate}
            isNoteCreatePending={isNoteCreatePending}
          />
        </Modal>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
