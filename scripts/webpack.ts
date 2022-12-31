import { writeToFile } from '@tbarous/utils';

class Webpack {
  path: string;
  name: string;
  mode: 'development' | 'production';
  entry: any;
  output: any;
  module: any;
  plugins: any = [];
  resolve: any;
  externals: any;
  devServer = {};

  static jsTsReactRegex = '/.(js|jsx|tsx|ts)$/';
  static nodeModulesRegex = '/node_modules/';

  constructor(path: string, name: string) {
    this.path = path;
    this.name = name;
  }

  setTypescriptEntry() {
    this.entry = `${this.path}/src/index.ts`;
  }

  setReactEntry() {
    this.entry = `${this.path}/src/index.tsx`;
  }

  setReactDemoEntry() {
    this.entry = `${this.path}/src/demo.tsx`;
  }

  setIndexOutput() {
    this.output = { filename: 'index.js' };
  }

  setLibraryOutput() {
    this.output = {
      globalObject: 'this',
      filename: 'index.js',
      library: {
        name: this.name,
        type: 'umd',
      },
    };
  }

  importHtmlWebpackPlugin() {
    this.setBefore("import HtmlWebpackPlugin from 'html-webpack-plugin'");
  }

  setTsModulesParsing() {
    this.module = {
      rules: [
        {
          test: Webpack.jsTsReactRegex,
          exclude: Webpack.nodeModulesRegex,
          loader: 'babel-loader',
        },
      ],
    };
  }

  addHtmlWebpackPlugin() {
    this.plugins.push(
      `REMOVEnew HtmlWebpackPlugin({scriptLoading: 'blocking',inject: 'body',templateContent: '<div id="root"></div>',filename: '${this.path}/public/index.html',publicPath: 'http://localhost:3000'})REMOVE`
    );
  }

  setTsResolves() {
    this.resolve = { extensions: ['.tsx', '.ts'] };
  }

  setProduction() {
    this.mode = 'production';
  }

  setDevelopment() {
    this.mode = 'development';
  }

  setReactAsExternal() {
    this.externals = {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
    };
  }

  addDevServer() {
    this.devServer = {
      devServer: {
        static: [
          {
            directory: `${this.path}/dist`,
            publicPath: '/dist',
            watch: true,
          },
          {
            directory: `${this.path}/public`,
            watch: true,
          },
        ],
        compress: true,
        port: 3000,
        hot: true,
        open: true,
      },
    };
  }

  toString() {
    return JSON.stringify(this);
  }

  setBefore(before: string) {
    this.stringConfig = `${before}${this.stringConfig}`;
  }

  get stringConfig() {
    return `export default ${this.toString()}`;
  }

  set stringConfig(stringConfig: string) {
    this.stringConfig = stringConfig;
  }

  cleanupStringConfig() {
    this.stringConfig = this.stringConfig
      .replace(`"${Webpack.jsTsReactRegex}"`, Webpack.jsTsReactRegex)
      .replace(`"${Webpack.nodeModulesRegex}"`, Webpack.nodeModulesRegex)
      .replace(`"REMOVE`, '')
      .replace(`REMOVE"`, '');
  }

  async export(path: string) {
    await writeToFile(path, this.stringConfig);
  }
}

export default Webpack;
