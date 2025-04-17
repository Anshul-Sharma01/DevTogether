const Loader = () => {
    return (
        <section className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900">
            <div className="relative flex items-center justify-center">
                {/* Outer Spinner */}
                <div className="w-32 h-32 border-8 border-transparent border-t-blue-500 rounded-full animate-spin shadow-xl" />
        
                {/* Inner Spinner */}
                    <div className="absolute w-20 h-20 border-4 border-transparent border-t-red-500 rounded-full animate-spin-reverse" />
            
                    {/* Glow center dot */}
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-pulse" />
                </div>
        
                <p className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
                    Loading, please wait...
                </p>
        </section>
    );
};

export default Loader;
