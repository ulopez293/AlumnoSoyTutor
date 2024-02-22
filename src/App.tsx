import { Panel } from './panel/Panel'
import useFlowBiteLoader from './hooks/Flowbite/useFlowBiteLoader'

function App() {
  useFlowBiteLoader()
  return (
    <>
      <Panel />
    </>
  )
}

export default App