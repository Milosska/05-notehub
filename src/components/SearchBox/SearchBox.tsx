import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearchChange: (searchQuery: string) => void;
}

const SearchBox = ({ onSearchChange }: SearchBoxProps) => {
  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearchChange(value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleSearchValue}
    />
  );
};

export default SearchBox;
