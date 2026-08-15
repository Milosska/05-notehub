import css from "./SearchBox.module.css";

const SearchBox = () => {
  return <input className={css.input} type="text" placeholder="Search notes" />;
};

export default SearchBox;
