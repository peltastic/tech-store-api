const {initializeApp} = require('firebase/app')
const {getStorage} = require('firebase/storage')
const configs = require('../config/firebase')

const firebaseConfig = {
    apiKey: configs.FIREBASE_API_KEY,
    authDomain: configs.FIREBASE_DOMAIN,
    projectId: configs.FIREBASE_PROJECT_ID,
    storageBucket: configs.FIREBASE_STORAGE_BUCKET
}

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

module.exports = {storage}