import merge from 'merge-deep';
import base, { fromRoot } from './base';

export default merge(base, {
  entry: fromRoot('src/index.tsx'),
  mode: 'production',
});
