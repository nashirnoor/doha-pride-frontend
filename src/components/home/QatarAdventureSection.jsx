import { FaCity, FaCar, FaCampground, FaMountainSun } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
const QatarAdventuresSection = () => {
  const adventures = [
    { title: 'City Tour', icon: FaCity, description: 'Explore the vibrant streets and modern marvels of Qatar\'s cities.' },
    { title: 'Transfer', icon: FaCar, description: 'Enjoy comfortable and reliable transportation throughout your stay.' },
    { title: 'Desert Safari', icon: FaMountainSun, description: 'Experience the thrill of Qatar\'s majestic desert landscapes.' },
    { title: 'Camping', icon: FaCampground, description: 'Immerse yourself in nature with our premium camping experiences.' },
  ];
  return (
    <section className="relative bg-white py-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#1c667e]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1c667e]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-5/12">
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-maroon/10 text-maroon px-4 py-2 rounded-full 
                text-sm font-medium mb-6 hover:bg-maroon/20 transition-colors cursor-pointer">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-maroon"></span>
                </span>
                DISCOVER QATAR
              </div>

              <h2 className="text-5xl font-serif leading-tight mb-8">
                Experience the Magic of
                <span className="block mt-2 text-[#1c667e]">Qatar's Wonders</span>
              </h2>

              <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm mb-8 
                hover:border-maroon/20 transition-all duration-300">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Welcome to Doha Pride Tourism! We provide exceptional services for visitors in Qatar. 
                  Whether you want to explore the city on a private guided tour, enjoy a thrilling desert safari, 
                  or take a layover tour, we have the perfect experience waiting for you.
                </p>
              </div>
              <Link to='/tours-activities'>
              <button className="group inline-flex items-center justify-center w-full 
                bg-[#1c667e] hover:bg-maroon text-white px-8 py-4 rounded-xl 
                text-lg font-medium transition-all duration-300">
                <span className="flex items-center gap-3">
                  Start Your Journey
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              </Link>
            </div>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:w-7/12">
            <div className="grid sm:grid-cols-2 gap-6">
              {adventures.map((adventure, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 transition-all duration-300
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100
                    hover:border-maroon/20 hover:-translate-y-1"
                >
                  <div className="relative flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14
                        bg-[#1c667e] group-hover:bg-maroon rounded-xl shadow-md 
                        group-hover:scale-110 transition-all duration-300">
                        <adventure.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-[#1c667e] group-hover:text-maroon mb-3 transition-colors">
                      {adventure.title}
                    </h3>

                    <p className="text-gray-600 mb-6 flex-grow">
                      {adventure.description}
                    </p>

                    <div className="flex items-center">
                      <Link to='/tours-activities'>
                      <a href="#" className="inline-flex items-center text-[#1c667e] font-medium
                        group-hover:text-maroon transition-colors">
                        <span className="mr-2">Explore Now</span>
                        <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QatarAdventuresSection;