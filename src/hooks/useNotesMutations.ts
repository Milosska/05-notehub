import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNote, deleteNote } from "@services/noteService";

// types
import type { NewNote } from "@shared-types/note";
import type { FormikState } from "formik";

interface IUseNotesMutationsType {
  setModalClose?: () => void;
}

export const useNotesMutations = ({
  setModalClose,
}: IUseNotesMutationsType = {}) => {
  const queryClient = useQueryClient();

  type CreateNoteMutationVariables = {
    noteData: NewNote;
    formResetCallback: (nextState?: Partial<FormikState<NewNote>>) => void;
  };

  const noteCreateMutation = useMutation({
    mutationFn: ({ noteData }: CreateNoteMutationVariables) =>
      createNote(noteData),
    onSuccess: (_, { formResetCallback }) => {
      formResetCallback();
      if (setModalClose) setModalClose();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => toast.error(`Failed to create note. ${error}`),
  });

  const noteDeleteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => toast.error(`Failed to remove note. ${error}`),
  });

  return { noteCreateMutation, noteDeleteMutation };
};
