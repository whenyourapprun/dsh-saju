// SAJU bundle — Host plugin.
//
// Registers one bundled expertise skill (`saju`) whose instruction body lives
// in assets/saju/SKILL.md. Mirrors the K-Beauty bundle provider pattern: the
// skill body loads on demand and `references/` is exposed as the resource base.
// Self-contained (Node built-ins only) so a local/git install resolves cleanly.

import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { isAbsolute, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Cordis plugin identity (shown in Plugin Manager). */
export const name = 'saju';

/** Services this plugin injects: the skill registry. */
export const inject = ['skills'];

const SKILL_NAME = 'saju';
const PROVIDER_NAME = 'saju';
const SKILL_RANK = 600;

/**
 * Parse a skill file's YAML frontmatter with a small, dependency-free reader.
 * Only single-line `name` and `description` keys are required.
 */
function parseSkill(raw, path) {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u.exec(raw);
  if (!frontmatter?.[1]) throw new Error(`saju: ${path} has no YAML frontmatter`);
  const meta = {};
  for (const line of frontmatter[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  const description = typeof meta.description === 'string' ? meta.description : '';
  if (description.length === 0) throw new Error(`saju: ${path} has no description`);
  return { description, content: raw.slice(frontmatter[0].length).trim() };
}

/**
 * Register the SAJU skill provider on the skill registry.
 * @param {object} ctx - Cordis context carrying `ctx.skills`.
 * @param {object} [config] - Optional `{ assetRoot }` override.
 */
export function apply(ctx, config = {}) {
  const assetRoot = config.assetRoot ?? fileURLToPath(new URL('./assets/', import.meta.url));
  if (!isAbsolute(assetRoot)) throw new Error('saju: assetRoot must be an absolute directory');

  const skillDir = join(assetRoot, SKILL_NAME);
  const locator = join(skillDir, 'SKILL.md');
  const { description } = parseSkill(readFileSync(locator, 'utf8'), locator);

  const candidate = {
    name: SKILL_NAME,
    description,
    whenToUse:
      'For 사주팔자(four pillars), 오늘의 운세(daily fortune), 타로(tarot), or 궁합(compatibility) interpretation and content writing.',
    invocation: { modelInvocable: true, userInvocable: true },
    provider: PROVIDER_NAME,
    source: 'bundled',
    rank: SKILL_RANK,
    resourceBase: { kind: 'directory', path: skillDir.split(sep).join('/') },
    locator,
  };

  const provider = {
    name: PROVIDER_NAME,
    list: () => Promise.resolve([candidate]),
    async get(selected, options) {
      const { rank: _rank, locator: file, ...summary } = selected;
      const parsed = parseSkill(await readFile(file, { encoding: 'utf8', signal: options.signal }), file);
      return { ...summary, content: parsed.content };
    },
  };

  ctx.skills.registerProvider(() => provider);
}
