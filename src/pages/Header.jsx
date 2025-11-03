import hinmg from '../assets/h2.jpg'
const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.username;

    return (
        <>
            <div className="relative w-full h-[320px]" id="home">
                <div className="absolute inset-0 opacity-80">
                    <img src={hinmg} alt="Background Image" className="object-cover object-center w-full h-full" />

                </div>
                <div className="absolute inset-9 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <h1 style={{ fontFamily:'"Merriweather", serif'}} className="text-grey-700 sm:text-center font-medium text-4xl md:text-5xl text-left leading-tight mb-2">GRANDA</h1>
                        <p  style={{ fontFamily:'"Merriweather", serif'}} className="font-regular rounded-[20px] text-xl bg-white sm:text-center mb-8 mt-4 mx-0">From essentials to favorites</p>
                        {
                            user ?
                                <a style={{ fontFamily: `"Roboto Serif", serif` }}
                                    className="bg-gradient-to-r from-slate-200 via-[#c8a876] to-sky-500 px-6 py-3 bg-[#c8a876] text-black font-medium rounded-full hover:bg-[#c09858]  transition duration-200">Welcome {userName}</a>

                                :
                                <a href="/login"
                                    className="px-6 py-3 bg-[#c8a876] text-white font-medium rounded-full hover:bg-[#c09858]  transition duration-200">Login to explore</a>

                        }

                    </div>
                </div>
            </div>


        </>
    )
}

export default Header