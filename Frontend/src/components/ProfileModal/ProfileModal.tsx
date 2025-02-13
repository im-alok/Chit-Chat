import { Link } from 'react-router-dom'
import {useRef} from "react"


const ProfileLinks = [
    {
        title:"Profile",
        to:'/profile'
    },
    {
        title:"Settings",
        to:'/settings'
    },
    {
        title:'Chat Page',
        to:'/convo'
    },
    {
        title:"Say, Hi to Alok!",
        to:'/convo'
    }
]

const ProfileModal = ({openModal}:any) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    function closeModalHandler(e:any){
        if(e.target === modalRef?.current)
            openModal(false)
    }       

    return (

        <div 
        ref={modalRef} onClick={(e:any)=>closeModalHandler(e)}
        className='w-screen inset-0 absolute'
        >
            <div className="absolute bg-[url('assets/bg-blue-gray.webp')] z-[100] w-[200px] h-[230px] right-1/20 top-1/5 border-2 shadow-[0px_5px_1000px_-5px] shadow-gray-700 backdrop-opacity-100">
                <div className='bg-gradient-to-r  from-black via-transparent to-black absolute inset-0 opacity-80'></div>
                <div className='z-[1000] text-white backdrop-opacity-100 flex items-col gap-3 justify-center items-center flex-col '>
                    <div className='flex flex-col gap-3 text-center font-dm-sans p-5 border-b-2 border-b-gray-400'>
                        {
                            ProfileLinks?.map((link)=>(
                                <Link to={link.to}>
                                    {link.title}
                                </Link>
                            ))
                        }
                    </div>
                    
                    <button className='bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 shadow-[0px_0px_5px_1px] shadow-amber-400 text-black text-sm font-doto font-extrabold px-2 py-1 animate-pulse transition-all duration-1000'>
                        Login
                    </button>

                    {/* //logout button */}

                </div>
            </div>
        
        </div>
    )
}

export default ProfileModal
