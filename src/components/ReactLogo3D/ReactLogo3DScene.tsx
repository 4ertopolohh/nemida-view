import { memo, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, SSAO, Vignette, Noise, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import {
  MathUtils,
  MeshPhysicalMaterial,
  SphereGeometry,
  TorusGeometry,
  type Group,
  type Mesh,
  type WebGLRenderer,
} from 'three'

type ReactAtomProps = {
  scale?: number
  interactive?: boolean
  active?: boolean
}

type RingParams = {
  radius: number
  tube: number
  baseRot: readonly [number, number, number]
  offset: readonly [number, number, number]
  seed: number
  dir: 1 | -1
  speed: readonly [number, number, number]
}

type ReactLogo3DSceneProps = {
  isOptimised: boolean
  active: boolean
  interactive: boolean
}

const CHROME_PROPS = {
  metalness: 1,
  roughness: 0.03,
  envMapIntensity: 2.2,
  clearcoat: 1,
  clearcoatRoughness: 0.015,
  ior: 1.5,
  reflectivity: 1,
  specularIntensity: 1,
  specularColor: '#ffffff',
} as const

const RING_PARAMS: readonly RingParams[] = [
  {
    radius: 0.49,
    tube: 0.03,
    baseRot: [0.55, 0.12, 0.1],
    offset: [0, 0.018, -0.045],
    seed: 1.15,
    dir: 1,
    speed: [0.95, 0.35, 0.7],
  },
  {
    radius: 0.59,
    tube: 0.028,
    baseRot: [0.1, 0.62, Math.PI / 3],
    offset: [0, -0.014, 0],
    seed: 2.35,
    dir: -1,
    speed: [0.6, 0.85, 0.3],
  },
  {
    radius: 0.69,
    tube: 0.026,
    baseRot: [0.08, 0.18, (2 * Math.PI) / 3],
    offset: [0, 0, 0.045],
    seed: 3.75,
    dir: 1,
    speed: [0.4, 0.55, 0.95],
  },
] as const

const CAMERA = { position: [0, 0, 2.5] as [number, number, number], fov: 42 }
const GL_CONFIG = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as const,
}

const TAU = Math.PI * 2
const POINTER_EVENT_OPTIONS: AddEventListenerOptions = { passive: true }
const wrapAngle = (angle: number) => ((angle % TAU) + TAU) % TAU

function ReactAtom({ scale = 1, interactive = true, active = true }: ReactAtomProps) {
  const group = useRef<Group | null>(null)
  const core = useRef<Mesh | null>(null)
  const ringsPivot = useRef<Group | null>(null)
  const rings = useRef<Array<Mesh | null>>([])

  const { gl } = useThree()

  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })

  const coreGeometry = useMemo(() => new SphereGeometry(0.22, 64, 64), [])
  const ringGeometries = useMemo(
    () => RING_PARAMS.map((params) => new TorusGeometry(params.radius, params.tube, 28, 320)),
    [],
  )
  const coreMaterial = useMemo(() => new MeshPhysicalMaterial({ color: '#f3f3f3', ...CHROME_PROPS }), [])
  const ringMaterial = useMemo(() => new MeshPhysicalMaterial({ color: '#f7f7f7', ...CHROME_PROPS }), [])

  useEffect(() => {
    return () => {
      coreGeometry.dispose()

      for (const geometry of ringGeometries) {
        geometry.dispose()
      }

      coreMaterial.dispose()
      ringMaterial.dispose()
    }
  }, [coreGeometry, ringGeometries, coreMaterial, ringMaterial])

  useEffect(() => {
    if (!interactive || !active) return

    const element = gl.domElement

    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return

      const dx = event.clientX - last.current.x
      const dy = event.clientY - last.current.y

      if (dx === 0 && dy === 0) return

      last.current.x = event.clientX
      last.current.y = event.clientY

      const speed = 0.006
      targetRot.current.y += dx * speed
      targetRot.current.x += dy * speed
      targetRot.current.x = MathUtils.clamp(targetRot.current.x, -1.1, 1.1)
    }

    const stopDrag = (event: PointerEvent) => {
      dragging.current = false
      element.releasePointerCapture?.(event.pointerId)

      window.removeEventListener('pointerup', stopDrag)
      window.removeEventListener('pointercancel', stopDrag)
      window.removeEventListener('pointermove', onMove)
    }

    const onDown = (event: PointerEvent) => {
      dragging.current = true
      last.current.x = event.clientX
      last.current.y = event.clientY
      element.setPointerCapture?.(event.pointerId)

      window.addEventListener('pointerup', stopDrag, POINTER_EVENT_OPTIONS)
      window.addEventListener('pointercancel', stopDrag, POINTER_EVENT_OPTIONS)
      window.addEventListener('pointermove', onMove, POINTER_EVENT_OPTIONS)
    }

    element.addEventListener('pointerdown', onDown, POINTER_EVENT_OPTIONS)

    return () => {
      dragging.current = false
      element.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', stopDrag)
      window.removeEventListener('pointercancel', stopDrag)
      window.removeEventListener('pointermove', onMove)
    }
  }, [gl, interactive, active])

  useEffect(() => {
    if (!active) {
      dragging.current = false
    }
  }, [active])

  useFrame((state, delta) => {
    if (!active) return

    const elapsed = state.clock.getElapsedTime()

    if (group.current) {
      group.current.position.y = Math.sin(elapsed * 0.9) * 0.01
    }

    if (core.current) {
      const scalePulse = 1 + Math.sin(elapsed * 1.6) * 0.015 + Math.sin(elapsed * 0.9) * 0.008
      core.current.scale.setScalar(scalePulse)
      core.current.position.y = Math.sin(elapsed * 1.15) * 0.045
      core.current.position.x = Math.sin(elapsed * 0.85) * 0.012
      core.current.position.z = Math.cos(elapsed * 0.75) * 0.01
    }

    const damp = 1 - Math.exp(-delta * 12)
    currentRot.current.x = MathUtils.lerp(currentRot.current.x, interactive ? targetRot.current.x : 0, damp)
    currentRot.current.y = MathUtils.lerp(currentRot.current.y, interactive ? targetRot.current.y : 0, damp)

    if (ringsPivot.current) {
      ringsPivot.current.rotation.x = currentRot.current.x
      ringsPivot.current.rotation.y = currentRot.current.y
      ringsPivot.current.rotation.z = 0
    }

    for (let index = 0; index < RING_PARAMS.length; index += 1) {
      const ring = rings.current[index]
      const params = RING_PARAMS[index]

      if (!ring || !params) continue

      const seed = params.seed
      const direction = params.dir
      const speedScale = 0.65

      const sx = direction * elapsed * params.speed[0] * speedScale
      const sy = -direction * elapsed * params.speed[1] * speedScale
      const sz = direction * elapsed * params.speed[2] * speedScale

      const pre = elapsed * (0.22 + index * 0.05) + seed
      const preX = Math.sin(pre) * 0.28
      const preY = Math.cos(pre * 0.9) * 0.24

      const nut = Math.sin(elapsed * (0.95 + index * 0.12) + seed * 1.7) * 0.1

      const wobX = Math.sin(elapsed * 1.6 + seed) * 0.045
      const wobY = Math.cos(elapsed * 1.3 + seed * 2) * 0.045
      const wobZ = Math.sin(elapsed * 1.1 + seed * 3) * 0.035

      const rx = params.baseRot[0] + sx + preX + wobX
      const ry = params.baseRot[1] + sy + preY + wobY
      const rz = params.baseRot[2] + sz + nut + wobZ

      ring.rotation.set(wrapAngle(rx), wrapAngle(ry), wrapAngle(rz))
    }
  })

  return (
    <group ref={group} scale={scale}>
      <mesh ref={core} castShadow geometry={coreGeometry} material={coreMaterial} />

      <group ref={ringsPivot}>
        {RING_PARAMS.map((params, index) => (
          <mesh
            key={index}
            ref={(element) => {
              rings.current[index] = element
            }}
            position={params.offset}
            castShadow
            geometry={ringGeometries[index]}
            material={ringMaterial}
          />
        ))}
      </group>
    </group>
  )
}

const ReactLogo3DScene = memo(function ReactLogo3DScene({ isOptimised, active, interactive }: ReactLogo3DSceneProps) {
  const dpr: [number, number] = isOptimised ? [1, 1.75] : [1.5, 2.5]
  const envResolution = isOptimised ? 512 : 1024
  const shadowMapSize = isOptimised ? 512 : 1024
  const multisampling = active ? (isOptimised ? 2 : 4) : 0
  const ssaoSamples = active ? (isOptimised ? 6 : 10) : 2
  const frameloop: 'always' | 'demand' = active ? 'always' : 'demand'

  return (
    <Canvas
      shadows
      camera={CAMERA}
      dpr={dpr}
      frameloop={frameloop}
      gl={GL_CONFIG}
      onCreated={({ gl }) => {
        const typed = gl as WebGLRenderer & { physicallyCorrectLights?: boolean }

        if ('physicallyCorrectLights' in typed) {
          typed.physicallyCorrectLights = true
        }

        gl.setClearColor(0x000000, 0)
      }}
    >
      <ambientLight intensity={0.12} />

      <directionalLight
        position={[3.5, 4.2, 3.5]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={0.1}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      <directionalLight position={[-4, 1.5, 2]} intensity={0.75} />
      <directionalLight position={[0, 2.5, -4]} intensity={0.85} />

      <Environment resolution={envResolution} background={false} blur={0.12}>
        <Lightformer intensity={10} position={[0, 0.6, 3.5]} rotation={[0, 0, 0]} scale={[12, 2.2, 1]} />
        <Lightformer intensity={7} position={[4.5, 0.2, 0]} rotation={[0, Math.PI / 2, 0]} scale={[10, 3.5, 1]} />
        <Lightformer intensity={6} position={[0, -0.6, -3.5]} rotation={[0, Math.PI, 0]} scale={[10, 2.8, 1]} />
        <Lightformer intensity={3} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[12, 12, 1]} />
      </Environment>

      <Center>
        <ReactAtom scale={1.15} interactive={interactive} active={active} />
      </Center>

      <EffectComposer multisampling={multisampling}>
        <ToneMapping />
        <SSAO samples={ssaoSamples} radius={0.11} intensity={11} luminanceInfluence={0.65} />
        <Bloom intensity={0.55} luminanceThreshold={0.9} luminanceSmoothing={0.15} />
        <Vignette eskil={false} offset={0.25} darkness={0.75} />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.12} />
      </EffectComposer>
    </Canvas>
  )
})

export default ReactLogo3DScene
