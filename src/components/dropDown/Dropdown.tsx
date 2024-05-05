import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  label,
  setSelected,
  selected,
}) => {
  const [open, setOpen] = useState(false);
  const handleSelection = (option: string) => {
    setSelected(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`#Toggle`) && !target.closest(`#Select`))
        setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <div className="w-full max-w-60 relative cursor-pointer" id={`Select`}>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white p-3 text-base flex items-center justify-between ${
          !selected && "text-[#b1b5bf]"
        }`}
      >
        {selected || label}
        <img
          id={`Toggle`}
          className={`transition-transform ease-out duration-300  ${
            open ? "rotate-180" : "rotate-0"
          }`}
          src="/src/assets/dropdown/dropdown.svg"
          alt="arrow"
        />
      </div>
      <ul
        className={`bg-white z-50  border max-h-60 border-inputBorder rounded mt-2 overflow-y-auto w-full transition absolute top-10 ${
          open ? "block" : "hidden"
        } `}
      >
        {options?.map((option, _) => (
          <li
            key={_}
            className={`p-2 w-full text-sm hover:bg-orange-400 hover:text-white my-1
            ${
              option?.toLowerCase() === selected?.toLowerCase() &&
              "bg-orange-400 text-white"
            }
            `}
            onClick={() => {
              if (option?.toLowerCase() !== selected.toLowerCase()) {
                handleSelection(option);
              }
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
