import { useEffect, useState } from "react";
import Dropdown from "../dropDown/Dropdown";
import SearchBox from "../searchBox/Searchbox";
import {
  clearFilter,
  updateFilter,
} from "../../globalState/filtersSlice/FilterSlice";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../globalState/store";

const Filters = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories } = useAppSelector((state: RootState) => state?.product);
  const dispatch = useDispatch();
  const onSearchTextUpdate = (text: string) => {
    dispatch(updateFilter({ type: "textInput", payload: text }));
  };

  useEffect(() => {
    dispatch(updateFilter({ type: "category", payload: selectedCategory }));
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(updateFilter({ type: "category", payload: selectedCategory }));
  }, [selectedCategory]);

  const onCLearFilter = () => {
    setSelectedCategory("");
    dispatch(clearFilter({ type: "category" }));
  };

  return (
    <div className="w-full">
      <SearchBox onInputUpdate={onSearchTextUpdate} />
      <div className="flex justify-end items-center gap-6">
        <button onClick={onCLearFilter} className="">
          Clear Filters
        </button>
        <Dropdown
          label="Categories"
          options={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default Filters;
