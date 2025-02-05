import ThemeToggle from "../components/Misc/ThemeToggle";

function NavigationLayout({ children }){

    const isLoggedIn = true;

    return(
        <div>
            <nav className="flex flex-row justify-between pr-6 items-center dark:bg-gray-700 dark:text-white py-4 sticky top-0">
                <div className="w-40 h-10 flex flex-row justify-center items-center text-white">
                    <img src="https://i0.wp.com/onegroupnetwork.com/wp-content/uploads/2020/09/dummy-logo-5b.png?ssl=1" alt="" />
                </div>
                <div className="font-bold  tracking-widest text-xl">
                    <span className="dark:text-cyan-300 text-red-400 font-extrabold ">Dev</span>
                    Together
                </div>
                <ul className="flex flex-row justify-center items-center gap-4">


                    {
                        isLoggedIn && (
                            <>
                                <li className="font-mono">
                                    collabs
                                </li>
                            </>
                        )
                    }
                    {
                        !isLoggedIn && (
                            <>
                                <li>
                                    LogIn
                                </li>
                                <li>
                                    SignIn
                                </li>
                            </>
                        )
                    }
                    <li>
                        <ThemeToggle/>
                    </li>
                    {
                        isLoggedIn && (
                            <li className=" w-10 rounded-full hover:cursor-pointer">
                                <img className="h-10 w-20 rounded-full border-gray-200 border-solid border-2" src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" alt="" />
                            </li>
                        )
                    }
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}

export default NavigationLayout;

