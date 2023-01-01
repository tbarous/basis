import { writeToFile } from '@tbarous/utils';
import { off } from 'process';

class Webpack {
  private path: string;
  private name: string;
  private before: string;
  private mode: 'development' | 'production';
  private entry: any;
  private output: any = {};
  private module: any = {};
  private plugins: any = [];
  private resolve: any;
  private externals: any;
  private devServer: any;

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
    this.resolve = { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] };
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
    };
  }

  get stringConfig() {
    const result: any = {
      mode: this.mode,
      entry: this.entry,
      output: this.output,
      module: this.module,
      plugins: this.plugins,
      resolve: this.resolve,
    };

    if (this.devServer) {
      result.devServer = this.devServer;
    }

    if (this.externals) {
      result.externals = this.externals;
    }

    return JSON.stringify(result);
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
