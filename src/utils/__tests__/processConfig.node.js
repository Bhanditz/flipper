/**
 * Copyright 2018-present Facebook.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @format
 */

import {default as config, resetConfigForTesting} from '../processConfig.js';

afterEach(() => {
  resetConfigForTesting();
});

test('config is decoded from env', () => {
  process.env.CONFIG = JSON.stringify({
    disabledPlugins: ['pluginA', 'pluginB', 'pluginC'],
    pluginPaths: ['/a/path', 'b/path'],
    lastWindowPosition: {x: 4, y: 8, width: 15, height: 16},
    updaterEnabled: false,
    screenCapturePath: '/my/screenshot/path',
  });

  expect(config()).toEqual({
    disabledPlugins: new Set(['pluginA', 'pluginB', 'pluginC']),
    pluginPaths: ['/a/path', 'b/path'],
    lastWindowPosition: {x: 4, y: 8, width: 15, height: 16},
    updaterEnabled: false,
    screenCapturePath: '/my/screenshot/path',
  });
});

test('config is decoded from env with defaults', () => {
  process.env.CONFIG = '{}';

  expect(config()).toEqual({
    disabledPlugins: new Set([]),
    pluginPaths: [],
    lastWindowPosition: undefined,
    updaterEnabled: true,
    screenCapturePath: undefined,
  });
});
