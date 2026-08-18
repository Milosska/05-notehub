import css from "./NoteList.module.css";

// hooks
import { useNotesMutations } from "@hooks/useNotesMutations";

// types
import type { Note } from "@shared-types/note";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const {
    noteDeleteMutation: {
      mutate: handleNoteDelete,
      isPending,
      variables: removeNoteId,
    },
  } = useNotesMutations();

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button
              className={css.button}
              disabled={isPending && removeNoteId === id}
              onClick={() => handleNoteDelete(id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
