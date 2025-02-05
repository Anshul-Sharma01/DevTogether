
import NavigationLayout from "../../layouts/NavigationLayout.jsx";

const LandingPage = () => {
    return (
        <NavigationLayout>
            <section className="dark:bg-gray-500 h-[100vh] bg-white flex flex-col items-center justify-center">
                <h1 className="text-4xl dark:text-cyan-400 text-black mb-4">Landing Page</h1>
            </section>
        </NavigationLayout>
    );
};

export default LandingPage;
