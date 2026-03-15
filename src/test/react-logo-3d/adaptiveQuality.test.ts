import {
  createAdaptiveCounters,
  evaluateAdaptiveQuality,
  resolveAutoQualityPolicyFromSignals,
} from '../../components/ReactLogo3D/adaptiveQuality'
import { describe, expect, it } from 'vitest'

describe('3D Auto Quality Policy', () => {
  it('forces strong tier for reduced-motion users', () => {
    const policy = resolveAutoQualityPolicyFromSignals({
      prefersReducedMotion: true,
      saveDataEnabled: false,
      memory: 8,
      cores: 8,
      isMobile: false,
    })

    expect(policy).toEqual({ initialTier: 'strong', maxTier: 'strong' })
  })

  it('limits low-end hardware to strong -> low', () => {
    const policy = resolveAutoQualityPolicyFromSignals({
      prefersReducedMotion: false,
      saveDataEnabled: false,
      memory: 2,
      cores: 8,
      isMobile: false,
    })

    expect(policy).toEqual({ initialTier: 'strong', maxTier: 'low' })
  })

  it('chooses low -> medium for mobile devices', () => {
    const policy = resolveAutoQualityPolicyFromSignals({
      prefersReducedMotion: false,
      saveDataEnabled: false,
      memory: 8,
      cores: 8,
      isMobile: true,
    })

    expect(policy).toEqual({ initialTier: 'low', maxTier: 'medium' })
  })

  it('allows medium -> high on desktop capable hardware', () => {
    const policy = resolveAutoQualityPolicyFromSignals({
      prefersReducedMotion: false,
      saveDataEnabled: false,
      memory: 16,
      cores: 12,
      isMobile: false,
    })

    expect(policy).toEqual({ initialTier: 'medium', maxTier: 'high' })
  })
})

describe('3D Adaptive Quality Controller Logic', () => {
  it('downgrades quality after sustained over-budget frame time', () => {
    const frameBudgetMs = 20
    const overloadedFrameMs = 27

    const firstPass = evaluateAdaptiveQuality({
      averageFrameMs: overloadedFrameMs,
      frameBudgetMs,
      counters: createAdaptiveCounters(),
      timeSinceTierChangeMs: 3500,
      qualityTier: 'medium',
      maxTier: 'high',
    })

    expect(firstPass.tierChanged).toBe(false)
    expect(firstPass.counters.overBudgetHits).toBe(1)

    const secondPass = evaluateAdaptiveQuality({
      averageFrameMs: overloadedFrameMs,
      frameBudgetMs,
      counters: firstPass.counters,
      timeSinceTierChangeMs: 3500,
      qualityTier: 'medium',
      maxTier: 'high',
    })

    expect(secondPass.tierChanged).toBe(true)
    expect(secondPass.nextTier).toBe('low')
    expect(secondPass.counters).toEqual(createAdaptiveCounters())
  })

  it('upgrades quality after sustained under-budget frame time', () => {
    const frameBudgetMs = 33
    const fastFrameMs = 20

    const pass1 = evaluateAdaptiveQuality({
      averageFrameMs: fastFrameMs,
      frameBudgetMs,
      counters: createAdaptiveCounters(),
      timeSinceTierChangeMs: 9500,
      qualityTier: 'low',
      maxTier: 'high',
    })
    const pass2 = evaluateAdaptiveQuality({
      averageFrameMs: fastFrameMs,
      frameBudgetMs,
      counters: pass1.counters,
      timeSinceTierChangeMs: 9500,
      qualityTier: 'low',
      maxTier: 'high',
    })
    const pass3 = evaluateAdaptiveQuality({
      averageFrameMs: fastFrameMs,
      frameBudgetMs,
      counters: pass2.counters,
      timeSinceTierChangeMs: 9500,
      qualityTier: 'low',
      maxTier: 'high',
    })

    expect(pass3.tierChanged).toBe(true)
    expect(pass3.nextTier).toBe('medium')
    expect(pass3.counters).toEqual(createAdaptiveCounters())
  })

  it('never upgrades beyond max tier', () => {
    const result = evaluateAdaptiveQuality({
      averageFrameMs: 12,
      frameBudgetMs: 20,
      counters: { overBudgetHits: 0, underBudgetHits: 2 },
      timeSinceTierChangeMs: 9500,
      qualityTier: 'medium',
      maxTier: 'medium',
    })

    expect(result.tierChanged).toBe(false)
    expect(result.nextTier).toBe('medium')
  })

  it('decays over-budget hits when frame time returns to normal', () => {
    const result = evaluateAdaptiveQuality({
      averageFrameMs: 20,
      frameBudgetMs: 20,
      counters: { overBudgetHits: 2, underBudgetHits: 0 },
      timeSinceTierChangeMs: 1000,
      qualityTier: 'medium',
      maxTier: 'high',
    })

    expect(result.tierChanged).toBe(false)
    expect(result.counters.overBudgetHits).toBe(1)
    expect(result.counters.underBudgetHits).toBe(0)
  })
})
