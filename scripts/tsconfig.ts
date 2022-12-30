export const tsConfigs = {
  frontend: {
    compilerOptions: {
      sourceMap: true,
      noImplicitAny: true,
      module: 'es6',
      noEmit: false,
      target: 'es5',
      allowJs: false,
      moduleResolution: 'node',
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      declaration: true,
      outDir: 'dist',
      jsx: 'react',
    },
    'ts-node': {
      compilerOptions: {
        module: 'CommonJS',
      },
    },
  },
};
