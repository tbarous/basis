import HtmlWebpackPlugin from 'html-webpack-plugin';export default {"mode":"production","entry":"C:\\Users\\tasos\\Desktop\\basis\\products\\microfrontends\\mf2/src/index.tsx","output":{"globalObject":"this","filename":"index.js","library":{"name":"mf2","type":"umd"}},"module":{"rules":[{"test":/.(js|jsx|tsx|ts)$/,"exclude":/node_modules/,"loader":"babel-loader"}]},"plugins":[new HtmlWebpackPlugin({scriptLoading: 'blocking',inject: 'body',templateContent: '<div id=\"root\"></div>',filename: 'C:\\Users\\tasos\\Desktop\\basis\\products\\microfrontends\\mf2/public/index.html',publicPath: 'http://localhost:3000'})],"resolve":{"extensions":["*",".js",".jsx",".tsx",".ts"]}}