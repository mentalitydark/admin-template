import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    darkMode?: boolean;
    toggleDarkMode?: () => void;
}

const AppContext = createContext<AppContextProps>({});

export function AppProvider(props) {
    const [darkMode, setDarkMode] = useState(false);

    function toggleDarkMode() {
        const dark = !darkMode;

        setDarkMode(dark);
        localStorage.setItem('darkMode', String(dark));
    }

    useEffect(() => {
        const value = localStorage.getItem('darkMode');
        setDarkMode(value === 'true');
    }, [])

    return (
        <AppContext.Provider value={{
            darkMode,
            toggleDarkMode
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
export const AppConsumer = AppContext.Consumer;
export default AppContext;