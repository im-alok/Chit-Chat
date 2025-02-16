import React, { useRef, useState } from 'react'
import { FaSearchengin } from 'react-icons/fa6';

const SearchUser = () => {

    const [searchValue, setSearchValue] = useState<String>("");
    let debouncetimer = useRef<number | null>(null);

    const changeHandler = (e:any)=>{
        if(debouncetimer?.current!==null) clearTimeout(debouncetimer?.current)
        const value = e.target.value;
        debouncetimer.current = setTimeout(()=>{
            console.log(value)
        },1000)
        setSearchValue(value);
    }

    const submitHandler = ()=>{

    }


    return (
        <div className='w-full p-5'>
            <form className='w-full flex  gap-2 text-lime-100'>
                <input
                
                className="focus:outline-0 bg-lime-100 w-full rounded-lg text-black px-2 font-ibm"
                // @ts-ignore
                value={searchValue}
                name='searchbar'
                id='searchbar'
                type='text'
                onChange={(e:any)=>changeHandler(e)}
                placeholder='search new friends'
                />

                <button type="button"
                className='cursor-pointer text-xl font-ibm bg-orange-600 px-2 py-1 rounded-sm active:scale-95 transition-all duration-300 hover:bg-orange-800 '
                >
                    search
                </button>
            </form>
        </div>
    )
}

export default SearchUser
