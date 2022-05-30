const withPWA = require('next-pwa')
 
module.exports = withPWA({
    pwa: {
        dest: 'public'
    },
    env: {
        FIREBASE_KEY: 'AIzaSyCasVyel6MkQ41-1vy_bUSmk6s5qye52Xk',
        FIREBASE_APP_ID: '1:1091373501177:web:5817123aebf20bc9e2f028',
        FIREBASE_SENDER_ID: '1091373501177',
        FIREBASE_PROJECT_ID: 'lugarsitos-9fcfa',
        MODE: 'DEV',
    }
})