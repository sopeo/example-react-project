module.exports = {
  map: false,
  plugins: {
    'postcss-import': {},
    'postcss-apply': {},
    'postcss-mixins': {},
    'postcss-flexbugs-fixes': {},
    'autoprefixer': {
      'browsers': [
        'last 2 Edge versions',
        'last 2 Firefox versions',
        'last 2 Chrome versions',
        'last 2 Safari versions',
        'last 2 Opera versions',
        'iOS >= 9',
        'Android >= 4.0',
        'last 2 ChromeAndroid versions'
      ]
    },
    'postcss-nested': {},
    'postcss-sorting': {},
    'postcss-simple-vars': {}
  }
};
