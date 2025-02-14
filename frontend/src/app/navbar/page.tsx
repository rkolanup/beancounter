import './navbar.css'
import Link from "next/link"

export default function Navbar() {
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="" className="app-name-wrapper">
                    <span className="app-name">Bean Counter</span>
                </a>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>*/}
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg> */}
                    </button>
                </div>
                <div className="menu-wrapper" id="navbar-sticky">
                    <ul className="list">
                        <Link href="/">
                            <p>Home</p>
                        </Link>
                        <Link href="/about">
                            <p>Overview</p>
                        </Link>
                        <Link href="/about">
                            <p>Spending Habits</p>
                        </Link>
                        <Link href="/about">
                            <p>Transactions</p>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>

    );
}