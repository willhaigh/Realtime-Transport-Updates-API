'use-strict'

const server = require('./server')
const config = require('./config')

const startServer = async env => {
    try {
        let configEnv
        env === 'prod' ? configEnv = config.prod : configEnv = config.test
        const app = await server(configEnv)
        await app.start()
        console.log(`Server running at http://${configEnv.host}:${configEnv.port}`)
    }
    catch(err) {
        console.log('Startup error', err)
    }
}

startServer(process.argv[2])