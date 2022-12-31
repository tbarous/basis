import { writeToFile } from '@tbarous/utils';

class Webpack {
  path: string;
  name: string;
  before: string;

  config: {
    mode: 'development' | 'production';
    entry: any;
    output: any;
    module: any;
    plugins: any;
    resolve: any;
    externals: any;
  } = {
    mode: 'production',
    entry: {},
    output: {},
    module: {},
    plugins: [],
    resolve: {},
    externals: {},
  };

  static jsTsReactRegex = '/.(js|jsx|tsx|ts)$/';
  static nodeModulesRegex = '/node_modules/';

  constructor(path: string, name: string) {
    this.path = path;
    this.name = name;
  }

  setTypescriptEntry() {
    this.config.entry = `${this.path}/src/index.ts`;
  }

  setReactEntry() {
    this.config.entry = `${this.path}/src/index.tsx`;
  }

  setReactDemoEntry() {
    this.config.entry = `${this.path}/src/demo.tsx`;
  }

  setIndexOutput() {
    this.config.output = { filename: 'index.js' };
  }

  setLibraryOutput() {
    this.config.output = {
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
    this.config.module = {
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
    this.config.plugins.push(
      `REMOVEnew HtmlWebpackPlugin({scriptLoading: 'blocking',inject: 'body',templateContent: '<div id="root"></div>',filename: '${this.path}/public/index.html',publicPath: 'http://localhost:3000'})REMOVE`
    );
  }

  setTsResolves() {
    this.config.resolve = { extensions: ['.tsx', '.ts'] };
  }

  setProduction() {
    this.config.mode = 'production';
  }

  setDevelopment() {
    this.config.mode = 'development';
  }

  setReactAsExternal() {
    this.config.externals = {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
    };
  }

  addDevServer() {
    this.config['devServer'] = {
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

  get stringConfig() {
    return JSON.stringify(this.config);
  }

  setBefore(before: string) {
    this.before = before;
  }

  cleanupStringConfig(stringConfig: string) {
    return stringConfig
      .replace(`"${Webpack.jsTsReactRegex}"`, Webpack.jsTsReactRegex)
      .replace(`"${Webpack.nodeModulesRegex}"`, Webpack.nodeModulesRegex)
      .replace(`"REMOVE`, '')
      .replace(`REMOVE"`, '');
  }

  async export(path: string) {
    const string = `${this.before};export default ${this.stringConfig}`;

    await writeToFile(path, this.cleanupStringConfig(string));
  }
}

export default Webpack;
