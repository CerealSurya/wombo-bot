import { createRequire } from 'module';
const require = createRequire(import.meta.url); //Getting require working with ESM modules

require('dotenv').config()

export default {
    prefix: "?",
    token: process.env.TOKEN //Exporting our tokens and stuff
}