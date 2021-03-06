/**
 * Copyright 2018-present Facebook.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @format
 */

var babylon = require('@babel/parser');
var fs = require('fs');

var electronStubs = babylon.parseExpression(
  fs.readFileSync('static/electron-stubs.notjs').toString(),
);

module.exports = function(babel) {
  return {
    name: 'replace-electron-requires-with-stubs',
    visitor: {
      CallExpression(path) {
        if (
          path.node.type === 'CallExpression' &&
          path.node.callee.type === 'Identifier' &&
          path.node.callee.name === 'require' &&
          path.node.arguments.length > 0
        ) {
          if (path.node.arguments[0].value === 'electron') {
            path.replaceWith(electronStubs);
          }
        }
      },
    },
  };
};
