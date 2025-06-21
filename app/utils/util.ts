import { useEffect, useState } from "react";

/**
 * Custom hook that returns true if the given media query matches
 * @param query The media query to match against
 */
export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener("change", listener);

        return () => {
            mediaQuery.removeEventListener("change", listener);
        };
    }, [query]);

    return matches;
};
