import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import { GramsNavBar } from './components'
import { Routes } from './core'

function App() {

  return (
    <ThirdwebProvider activeChain={Mumbai} clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}>
      <GramsNavBar />
      <Routes />
    </ThirdwebProvider>
  )
}

export default App
