export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF1A00',
                bg: '#DDDBD6',
                dark: '#1a1a1a',
                'text-light': '#6a6a6a',
                overlay: 'rgba(26, 26, 26, 0.92)',
            },
            fontFamily: {
                display: ['"Montserrat"', 'sans-serif'],
                body: ['"Montserrat"', 'sans-serif'],
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
            },
            keyframes: {
                heroPulse: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
                    '50%': { transform: 'scale(1.1)', opacity: '1' },
                },
                scrollLine: {
                    '0%': { top: '-100%' },
                    '50%': { top: '0%' },
                    '100%': { top: '100%' },
                }
            },
            animation: {
                'hero-pulse': 'heroPulse 8s ease-in-out infinite',
                'scroll-line': 'scrollLine 2s cubic-bezier(0.76, 0, 0.24, 1) infinite',
            }
        },
    },
    plugins: [],
}
