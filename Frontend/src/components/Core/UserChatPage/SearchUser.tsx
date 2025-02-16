import React, { useRef, useState } from "react";
import { FaSearchengin } from "react-icons/fa6";

const SearchUser = () => {
  const [searchValue, setSearchValue] = useState<String>("");
  let debouncetimer = useRef<number | null>(null);

  const changeHandler = (e: any) => {
    if (debouncetimer?.current !== null) clearTimeout(debouncetimer?.current);
    const value = e.target.value;
    debouncetimer.current = setTimeout(() => {
      console.log(value);
    }, 1000);
    setSearchValue(value);
  };

  const submitHandler = () => {};

  return (
    <div className="w-full p-5">
      <form className="flex w-full gap-2 text-lime-100">
        <input
          className="font-ibm w-full rounded-lg bg-lime-100 px-2 text-black focus:outline-0"
          // @ts-ignore
          value={searchValue}
          name="searchbar"
          id="searchbar"
          type="text"
          onChange={(e: any) => changeHandler(e)}
          placeholder="search new friends"
        />

        <button
          type="button"
          className="font-ibm cursor-pointer rounded-sm bg-orange-600 px-2 py-1 text-xl transition-all duration-300 hover:bg-orange-800 active:scale-95"
        >
          search
        </button>
      </form>
    </div>
  );
};

export default SearchUser;
