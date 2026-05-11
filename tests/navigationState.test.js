import test from 'node:test';
import assert from 'node:assert/strict';
import { TEAMS_DATA } from '../src/data/stickers.js';
import { buildGroupItems, buildAlphaItems, getValidItemForMode } from '../src/utils/navigationState.js';

test('buildGroupItems keeps FWC first and CC last', () => {
  const items = buildGroupItems(TEAMS_DATA);
  assert.equal(items[0], 'FWC');
  assert.equal(items.at(-1), 'CC');
});

test('getValidItemForMode returns mode-specific fallback for group', () => {
  const groupItems = buildGroupItems(TEAMS_DATA);
  const alphaItems = buildAlphaItems(TEAMS_DATA, 'asc');
  const next = getValidItemForMode('group', 'NOT-EXISTS', groupItems, alphaItems);
  assert.equal(next, 'FWC');
});

test('getValidItemForMode returns first sorted alpha fallback', () => {
  const groupItems = buildGroupItems(TEAMS_DATA);
  const alphaItems = buildAlphaItems(TEAMS_DATA, 'asc');
  const next = getValidItemForMode('alpha', 'NOT-EXISTS', groupItems, alphaItems);
  assert.equal(next, alphaItems[0]);
});

test('getValidItemForMode preserves valid candidate in each mode', () => {
  const groupItems = buildGroupItems(TEAMS_DATA);
  const alphaItems = buildAlphaItems(TEAMS_DATA, 'asc');
  assert.equal(getValidItemForMode('group', 'A', groupItems, alphaItems), 'A');
  assert.equal(getValidItemForMode('alpha', 'ARG', groupItems, alphaItems), 'ARG');
});
