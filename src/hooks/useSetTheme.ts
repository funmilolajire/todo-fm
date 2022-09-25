import { useEffect, useState } from "react"

export const useSetTheme = () => {
    const preferredTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    const [theme, setTheme] = useState(preferredTheme || systemTheme);
    
    const handleThemeChange = (theme: 'dark' | 'light') => {
        setTheme(theme);
        localStorage.setItem('theme', theme);
    }

    useEffect(() => {
        if(theme==='dark'){
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        }
    }, [theme])

    return {theme, handleThemeChange}
}