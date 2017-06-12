module.exports = {
  extends: [
    'angular'
  ],
  rules: {
    'angular/no-service-method': 0,
    'angular/window-service': 0,
    'eol-last': 0,
    'no-unused-vars': 0,
    'no-multiple-empty-lines': 0,
    'padded-blocks': 0,
    'no-negated-condition': 0,
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'no-else-return': 0,
    'indent':0,
    'max':0,
    'linebreak-style':0,
    'no-lonely-if': 0,
    'object-curly-spacing': 0,
    'angular/module-getter': 0
  },
  globals: {
    '_': true,
    'Parse': true,
    'Dexie': true,
    'localforage': true
  }
}
