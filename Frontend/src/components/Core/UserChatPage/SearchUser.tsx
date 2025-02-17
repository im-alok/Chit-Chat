import React, { useRef, useState } from "react";
import { FaCross, FaSearchengin } from "react-icons/fa6";
import { searchUser } from "../../../Services/Operations/miscOps";
import Loading from "../../common/Loading";
import UserProfile from "./Search/UserProfile";
import { IoClose } from "react-icons/io5";

const SearchUser = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult,setSearchResult] = useState([]);
  const [showSearchResult,setShowSearchResult] = useState(false);
  const [loading,setLoading] = useState(false);
  let debouncetimer = useRef<number | null>(null);

  const changeHandler = (e: any) => {
    if (debouncetimer?.current !== null) clearTimeout(debouncetimer?.current);
    const value = e.target.value;
    setSearchValue(value);
    if(!value){
      setShowSearchResult(false)
      return
    } 
    debouncetimer.current = setTimeout(async() => {
      setLoading(true)
      const response = await searchUser(value)
      setShowSearchResult(true);
      setSearchResult(response);
      setLoading(false)
    }, 1000);
    
  };

  const submitHandler = async(w:any) => {
    w.preventDefault()
    if(!searchValue){
      console.log("No word")
      return
    }
    
    setShowSearchResult(true);
    setLoading(true)
    const response = await searchUser(searchValue)
      setSearchResult(response);
      setLoading(false)
  };

  return (
    <div className="w-full p-5 ">
      <form className="flex w-full gap-2 text-lime-100"
      onSubmit={(w:any)=>submitHandler(w)}
      >
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
          type="submit"
          className="font-ibm cursor-pointer rounded-sm bg-orange-600 px-2 py-1 text-xl transition-all duration-300 hover:bg-orange-800 active:scale-95"
        >
          search
        </button>
      </form>

      {
        showSearchResult && 
          <div className=" mx-auto w-8/12 h-8/12 absolute inset-0 z-[1200] top-30">
            <div className="bg-richBlack-700 w-7/12 max-h-8/12 min-h-5/12 mx-auto rounded-2xl flex justify-between overflow-scroll border-2 p-2 py-5 scrollbar-hidden">
              {
                loading? (<Loading />) :(
                  searchResult?.length === 0 ? (<p className="font-doto text-lime-200 ">No user found for <span className="italic">{searchValue}</span> userName / email</p>):(
                    <div className="flex flex-col gap-1 overflow-scroll min-h-full max-h-full w-full scrollbar-hidden">
                      {
                        searchResult?.map((data,index)=>(
                          <UserProfile key={index} data={data}/>
                        ))
                      }
                    </div>
                  )
                )
              }

              <div className="text-2xl bg-richBlack-800 w-fit h-fit p-2 rounded-full hover:bg-richBlack-900 text-lime-200 cursor-pointer"
              onClick={()=>{
                setShowSearchResult(false)
                setSearchValue("");
                setSearchResult([]);
              }}
              >
                <IoClose />
              </div>

            </div>
            
          </div>
      }
    </div>
  );
};

export default SearchUser;
