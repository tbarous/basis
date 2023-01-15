import IPart from './IPart';
import File from '../../File';
import { chainable } from '../../Decorators';

class Webpack {
  filename = 'webpack.config.js';

  private name: string;
  private before: string = 'module.exports = ';
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

  setName(name: string): Webpack {
    this.name = name;
    return this;
  }

  setTypescriptEntry(): Webpack {
    this.entry = `src/index.ts`;
    return this;
  }

  setReactEntry(): Webpack {
    this.entry = `src/index.tsx`;
    return this;
  }

  setReactDemoEntry(): Webpack {
    this.entry = `src/demo.tsx`;
    return this;
  }

  setIndexOutput(): Webpack {
    this.output = { filename: 'index.js' };
    return this;
  }

  setLibraryOutput(): Webpack {
    this.output = {
      globalObject: 'this',
      filename: 'index.js',
      library: {
        name: this.name,
        type: 'umd',
      },
    };
    return this;
  }

  importHtmlWebpackPlugin(): Webpack {
    this.setBefore("import HtmlWebpackPlugin from 'html-webpack-plugin'");
    return this;
  }

  setTsModulesParsing(): Webpack {
    this.module = {
      rules: [
        {
          test: Webpack.jsTsReactRegex,
          exclude: Webpack.nodeModulesRegex,
          loader: 'babel-loader',
        },
      ],
    };
    return this;
  }

  addHtmlWebpackPlugin(): Webpack {
    this.plugins.push(
      `REMOVEnew HtmlWebpackPlugin({scriptLoading: 'blocking',inject: 'body',templateContent: '<div id="root"></div>',filename: 'public/index.html',publicPath: 'http://localhost:3000'})REMOVE`
    );
    return this;
  }

  setTsResolves(): Webpack {
    this.resolve = { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] };
    return this;
  }

  setProduction(): Webpack {
    this.mode = 'production';
    return this;
  }

  setDevelopment(): Webpack {
    this.mode = 'development';
    return this;
  }

  setReactAsExternal(): Webpack {
    this.externals = {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
    };
    return this;
  }

  addDevServer(): Webpack {
    this.devServer = {
      static: [
        {
          directory: `dist`,
          publicPath: '/dist',
          watch: true,
        },
        {
          directory: `public`,
          watch: true,
        },
      ],
      compress: true,
      port: 3000,
      hot: true,
      open: true,
    };
    return this;
  }

  setBefore(before: string): Webpack {
    this.before = before;
    return this;
  }

  toJson() {
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

    return result;
  }

  toString() {
    return (
      this.before +
      JSON.stringify(this.toJson())
        .replace(`"${Webpack.jsTsReactRegex}"`, Webpack.jsTsReactRegex)
        .replace(`"${Webpack.nodeModulesRegex}"`, Webpack.nodeModulesRegex)
        .replace(`"REMOVE`, '')
        .replace(`REMOVE"`, '')
    );
  }

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }

  async export(target: string) {
    await File.createFile(target, this.toString());
  }
}

export default Webpack;
