module.exports = {
    devServer: {
        proxy: 'http://localhost:6985/',
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "YziMusic";
                return args;
            })
    }
};