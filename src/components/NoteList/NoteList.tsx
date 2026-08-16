import css from "./NoteList.module.css";
import type { Note } from "@shared-types/note";

interface NoteListProps {
  notes: Note[];
  onNoteDelete: (noteId: string) => void;
  isPending: boolean;
  removeNoteId: string | undefined;
}

const NoteList = ({
  notes,
  onNoteDelete,
  isPending,
  removeNoteId,
}: NoteListProps) => {
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
              onClick={() => onNoteDelete(id)}
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
