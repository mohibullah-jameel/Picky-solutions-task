import { useEffect, useState } from "react";
import { clearFilter } from "../../globalState/filtersSlice/FilterSlice";
import { useDispatch } from "react-redux";

const SearchBox = ({
  onInputUpdate,
}: {
  onInputUpdate: (text: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const onCLearSearchText = () => {
    setSearchValue("");
    dispatch(clearFilter({ type: "textInput" }));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onInputUpdate(searchValue);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <form className="max-w-7xl mx-auto flex justify-between items-center px-8 border-y">
      <input
        className="w-full h-14 rounded-sm placeholder-gray-500 text-gray-500 flex-1 outline-none bg-transparent "
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Search Products"
      />
      <button
        disabled={!searchValue}
        className="text-orange-500 disabled:text-gray-400"
        onClick={onCLearSearchText}
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBox;
