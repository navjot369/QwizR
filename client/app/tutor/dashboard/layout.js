

export default function DashboardLayout({ children }) {
    return (
        <div>
            <header>
                <h1>Dashboard</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} QwizR</p>
            </footer>
        </div>
    );
}