import Link from "next/link"

export default function Header() {
    return (
        <header>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <Link
                        className="hover:text-blue-600"
                        href="/about">
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        className="hover:text-blue-600"
                        href="/contact">
                        Contact
                    </Link>
                </li>
                <li>
                    <Link
                        className="hover:text-blue-600"
                        href="/careers">
                        Careers
                    </Link>
                </li>
                <li>
                    <Link
                        className="hover:text-blue-600"
                        href="/license">
                        License
                    </Link>
                </li>
                <li className="mx-1000">
                    Sign In
                </li>
            </ul>
        </header>
    )
}