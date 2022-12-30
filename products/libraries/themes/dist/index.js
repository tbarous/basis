'use strict';

var react = require('@chakra-ui/react');

// 1. Import `extendTheme`
// 2. Call `extendTheme` and pass your custom values
react.extendTheme({
    colors: {
        brand: {
            100: '#f7fafc',
            900: '#1a202c',
        },
    },
});
