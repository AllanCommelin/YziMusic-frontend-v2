module.exports = {
    theme: {
        minHeight: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        },
        borderWidth: {
            '1': '1px',
            '2': '2px',
            '3': '3px',
            '4': '4px',
            '5': '5px',
            '6': '6px',
            '7': '7px',
            '8': '8px',
        },
        extend: {
            inset: {
                '1': '.5rem',
                '2': '1rem',
                '3': '1.5rem',
                '4': '2rem',
                '-20': '-5rem',
                '-22': '-5.5rem',
                '-24': '-6rem',
                '-25': '-6.5rem',
            },
            colors: {
                'main': '#7149F9',
                'main-light': '#b49bfc',
                'ym-grey': '#e3e3e9',
                'ym-blue': '#1cb4ff',
                'ym-light-blue': '#A1C6EA',
                'ym-black': '#0D0D0D',
                'ym-sm-light-black': '#191919',
                'ym-light-black': '#292929',
            },
            spacing: {
                '18': '4.5rem',
                '19': '4.77rem',
                '28': '7.5rem',
                '48': '12rem',
                '52': '13rem',
                '56': '14rem',
                '64': '16rem',
                '72': '18rem',
                '96': '24rem',
                '144': '36rem',
            },
            maxWidth: {
                '56': '14rem',
            },
            minWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
            }
        }
    },
    variants: {
        extend: {
            borderColor: ['active']
        },
        borderStyle: ['responsive'],
    },
    plugins: [require("@tailwindcss/custom-forms")]
}