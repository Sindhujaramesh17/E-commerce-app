import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

function Layout({ children }) {
    return (
        <div className="app-layout">

            <Header />

            <div className="app-body">

                <Sidebar />

                <main className="app-content">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;