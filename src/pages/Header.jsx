import hinmg from '../assets/h2.jpg'
const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.username;

    return (
        <>
           <div
  className="relative w-full min-h-[85vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
  id="home"
>
  {/* Background with soft elegant gradient overlay */}
  <div className="absolute inset-0">
    <img
      src={hinmg}
      alt="Hero"
      className="object-cover object-center w-full h-full brightness-95 scale-105 transition-transform duration-[4000ms] hover:scale-110"
    />
    {/* new balanced warm gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#f8e7c7]/90 via-[#f3d5b5]/80 to-[#e7c6a3]/80"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 text-center px-4 sm:px-6 md:px-12 text-gray-800">
    <h1
      style={{ fontFamily: '"Merriweather", serif' }}
      className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-snug md:leading-tight tracking-wide drop-shadow-sm"
    >
      Discover <span className="text-[#a67c52]">GRANDA</span>
    </h1>

    <p
      style={{ fontFamily: '"Merriweather", serif' }}
      className="mt-3 sm:mt-4 text-base sm:text-lg md:text-2xl text-gray-700"
    >
      From essentials to favorites
    </p>

    <div className="mt-8 sm:mt-10">
      {user ? (
        <a
          style={{ fontFamily: `"Roboto Serif", serif` }}
          className="inline-block bg-gradient-to-r from-[#d7b47c] via-[#b9955b] to-[#d9a760] px-8 sm:px-10 py-2.5 sm:py-3 rounded-full text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Welcome {userName}
        </a>
      ) : (
        <a
          href="/login"
          className="inline-block px-8 sm:px-10 py-2.5 sm:py-3 rounded-full bg-[#a67c52] text-white font-semibold shadow-md hover:bg-[#8a663f] hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Login to Explore
        </a>
      )}
    </div>
  </div>
</div>





        </>
    )
}

export default Header