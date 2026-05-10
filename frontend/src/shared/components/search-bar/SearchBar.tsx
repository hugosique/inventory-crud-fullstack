import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { Search, X, Loader2 } from "lucide-react";

type SearchBarProps = {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
  isLoading?: boolean;
};

export function SearchBar({
  placeholder,
  onSearch,
  onClear,
  isLoading = false,
}: SearchBarProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!searchText.trim()) return;

    setIsSearching(true);
    onSearch(searchText.trim());
  }

  function handleClearSearch(): void {
    setSearchText("");
    setIsSearching(false);
    onClear();
  }

  useEffect(() => {
    if (!isLoading) setIsSearching(false);
  }, [isLoading]);

  return (
    <section className={styles["search"]}>
      <form className={styles["search-form"]} onSubmit={handleSearchSubmit}>
        <label className={styles["search-label"]} htmlFor="search">
          Buscar
        </label>

        <input
          className={styles["search-input"]}
          id="search"
          placeholder={placeholder}
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {searchText && (
          <button
            className={`${styles["search-btn"]} ${styles["search-btn--clear"]}`}
            type="button"
            aria-label="Limpar busca"
            onClick={handleClearSearch}
          >
            <X aria-hidden="true" size={16} />
          </button>
        )}

        <button
          className={styles["search-btn"]}
          type="submit"
          aria-label="Buscar"
          disabled={isLoading}
        >
          {isSearching && isLoading ? (
            <Loader2
              aria-hidden="true"
              className={styles["spinner"]}
              size={16}
            />
          ) : (
            <Search aria-hidden="true" size={16} />
          )}
        </button>
      </form>
    </section>
  );
}
