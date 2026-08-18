import { useFormik } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { NOTE_TAGS } from "@shared-types/note";

// hooks
import { useNotesMutations } from "@hooks/useNotesMutations";

// components
import ErrorMessage from "@components/ErrorMessage";

// types
import type { NewNote } from "@shared-types/note";
interface NoteFormProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const NoteForm = ({ setIsModalOpen }: NoteFormProps) => {
  const {
    noteCreateMutation: {
      mutate: handleNoteCreate,
      isPending: isNoteCreatePending,
    },
  } = useNotesMutations({
    setModalClose: () => setIsModalOpen(false),
  });

  const initialFormValues: NewNote = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const noteFormValidationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title should be 3 symbols or longer.")
      .max(50, "Title should not exceed 50 symbols.")
      .required("Title is required"),
    content: Yup.string().max(500, "Content should not exceed 500 symbols."),
    tag: Yup.string().oneOf(NOTE_TAGS).required("Tag is required"),
  });

  const { values, handleChange, handleSubmit, errors, touched, resetForm } =
    useFormik({
      initialValues: initialFormValues,
      validationSchema: noteFormValidationSchema,
      onSubmit: (values) => {
        handleNoteCreate({ noteData: values, formResetCallback: resetForm });
      },
    });

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={values.title}
          onChange={handleChange}
        />
        {errors.title && touched.title ? (
          <ErrorMessage error={errors.title} />
        ) : null}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={values.content}
          onChange={handleChange}
        />
        {errors.content && touched.content ? (
          <ErrorMessage error={errors.content} />
        ) : null}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={values.tag}
          onChange={handleChange}
        >
          {NOTE_TAGS.map((tag) => (
            <option value={tag}>{tag}</option>
          ))}
        </select>
        {errors.tag && touched.tag ? <ErrorMessage error={errors.tag} /> : null}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isNoteCreatePending}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
