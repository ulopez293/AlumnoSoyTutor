import { Panel } from './panel/Panel'
import useFlowBiteLoader from './hooks/Flowbite/useFlowBiteLoader'
import { Pie } from './components/Footer/Pie'
import { useAtom } from 'jotai'
import { userDataAtom } from './atoms/userDataAtom'
import { tabDataAtom } from './atoms/tabDataAtom'

const ENVIRONMENT = import.meta.env.VITE_ENVIRONTMENT as string ?? ""

function App() {
  const [userData, setUserData] = useAtom(userDataAtom)
  const [tabData, ] = useAtom(tabDataAtom)
  useFlowBiteLoader()

  // Escucha el mensaje enviado desde la página ASPX
  window.addEventListener('message', function (event) {
    console.log("entro a message de react")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event?.data?.id_user) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const id_user = parseInt(event?.data?.id_user as string)
      console.log('Mensaje recibido desde la página ASPX. Id de usuario:', id_user)
      setUserData({ login: true, email: ``, id_user: id_user })
    }
  })

  return (
    <>
      {ENVIRONMENT === 'production' ?
        userData.login ? <div>
          <br />
          <Panel />
          <br /><br /><br /><br /><br />
          {tabData.activeFoot ? <>
            <br /><br /><br /><br /><br />
            <Pie />
          </> : null}
        </div>
          : <h1>Loading...</h1> :
        <div>
          <br />
          <Panel />
          {tabData.activeFoot ? <>
            <br /><br /><br /><br /><br />
            <Pie />
          </> : null}
        </div>
      }
    </>
  )
}

export default App