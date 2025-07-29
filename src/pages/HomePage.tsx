import cvCard from '../assets/cvCard.png';

const HomePage = () => {
    return (
        <div className="h-[100%] w-[90%] mx-auto flex items-center justify-center px-4 py-8">
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-10 w-full max-w-6xl flex flex-row items-center gap-30">
                <div className="absolute inset-0 border border-gray-300 opacity-20 rounded-2xl pointer-events-none"></div>

                <div className="flex-shrink-0 z-10">
                    <img
                        src={cvCard}
                        alt="CV Card"
                        className="h-[400px] w-auto drop-shadow-lg"
                    />
                </div>

                <div className="z-10 max-w-xl text-left">
                    <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
                        Create Your CV <span className="text-blue-600">Effortlessly</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Reflect your professional journey with our intuitive CV builder.
                        Fill out your experience, preview your layout in real time, and download a clean, modern resume.
                    </p>
                    <a
                        href="/builder"
                        className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-300"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
