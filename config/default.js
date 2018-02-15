module.exports = {
    app: {
        name: 'quiz-server',
        version: '0.0.1'
    },
    server: {
        port: process.env.PORT || 3000
    },
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost/test'
    }
};
