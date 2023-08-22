import { Suspense, useEffect, useState} from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'
import { PointLight } from 'three'

const Avatar = ({ isMobile }) => {

  const avatar = useGLTF('./model/me3.glb')

  return (
    <mesh>
      <hemisphereLight 
        intensity={3} 
        groundColor='white'
      />
      <spotLight 
        position ={[1, 1, 1]}
        angle={0.12}
        penubra={1}
        intensity={10}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={3} position ={[0, 3, -4]} />
      <pointLight intensity={1} position ={[-1, -1, 2]} />
      <pointLight intensity={1} position ={[1, -1, 2]} />
      <pointLight intensity={1} position ={[1, 3, 3]} />
      <primitive 
        object={avatar.scene}
        scale={isMobile ? 3 : 6}
        position={[0, -5.25, 0]}
      />
    </mesh>
  )
}

const AvatarCanvas = () => {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ fov: 75, near: 0.1, far: 1000, position: [10, 0, 10] }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Avatar isMobile={isMobile}/>
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default AvatarCanvas