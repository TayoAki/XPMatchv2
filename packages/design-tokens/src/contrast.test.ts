import { describe, expect, it } from 'vitest';
import { checkContrast, contrastRatio } from './contrast';
import { ACCENTS, MODES, accents, base } from './tokens';

describe('contrast math', () => {
  it('matches known WCAG values', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
    // PRD brand pairs from the UI plan's independent check.
    expect(contrastRatio('#182B28', '#FFFFFF')).toBeCloseTo(14.84, 2);
    expect(contrastRatio('#174D42', '#F7F8F5')).toBeCloseTo(9.05, 2);
  });

  it('rejects malformed colors', () => {
    expect(() => contrastRatio('#FFF', '#000000')).toThrow();
  });
});

describe('theme contrast (UI plan §4.4)', () => {
  const results = checkContrast();

  it('checks every mode and accent', () => {
    expect(results.length).toBe(2 * 25 + 2 * ACCENTS.length * 9);
  });

  it('has no failing pair', () => {
    const failures = results
      .filter((r) => !r.passes)
      .map(
        (r) =>
          `${r.mode}/${r.accent}: ${r.label} ${r.fg} on ${r.bg} = ${r.ratio.toFixed(2)} (needs ${r.min})`,
      );
    expect(failures).toEqual([]);
  });

  it('keeps fit, catch, unknown and error colors fixed across accents', () => {
    for (const mode of MODES) {
      for (const accent of ACCENTS) {
        expect(Object.keys(accents[accent][mode]).sort()).toEqual([
          'accent',
          'primary',
          'primary-foreground',
          'ring',
        ]);
      }
      expect(base[mode].fit).toBeDefined();
    }
  });
});

describe('generated CSS', () => {
  it('declares every token in both modes', async () => {
    const { buildGlobalCss } = await import('./css');
    const css = buildGlobalCss();
    for (const mode of MODES) expect(css).toContain(`@variant ${mode} {`);
    for (const token of Object.keys(base.light)) expect(css).toContain(`--color-${token}:`);
    for (const token of ['primary', 'primary-foreground', 'accent', 'ring']) {
      expect(css).toContain(`--color-${token}:`);
    }
  });

  it('gives each accent the four accent variables per mode', async () => {
    const { accentCssVariables } = await import('./css');
    expect(accentCssVariables('ocean', 'dark')).toEqual({
      '--color-primary': '#9EC5F2',
      '--color-primary-foreground': '#0D2744',
      '--color-accent': '#1B2E45',
      '--color-ring': '#9EC5F2',
    });
  });
});
