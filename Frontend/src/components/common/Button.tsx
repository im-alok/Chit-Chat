const Button = ({ children, onClick, type, customClasses }: any) => {
    return (
        <div>
            <button
                type={type}
                onClick={() => { onClick() }}
                className={`font-doto animate-pulse cursor-pointer bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 px-2 py-1 text-sm font-extrabold text-black shadow-[0px_0px_5px_1px] shadow-amber-400 transition-all duration-1000 ${customClasses}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Button
