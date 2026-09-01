import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);

            if (storedValue !== null) {
                return JSON.parse(storedValue);
            }

            return initialValue;
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;