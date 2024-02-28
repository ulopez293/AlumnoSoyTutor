import { Panel } from './panel/Panel'
import useFlowBiteLoader from './hooks/Flowbite/useFlowBiteLoader'
import { Pie } from './components/Footer/Pie'
import { useAtom } from 'jotai'
import { userDataAtom } from './atoms/userDataAtom'
import { useEffect } from 'react'

function App() {
  const [userData, setUserData] = useAtom(userDataAtom)
  useFlowBiteLoader()
  useEffect(() => {
    // Escucha el mensaje enviado desde la página ASPX
    window.addEventListener('message', function (event) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (event?.data?.id_user) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const id_user = parseInt(event?.data?.id_user as string)
        console.log('Mensaje recibido desde la página ASPX. Id de usuario:', id_user)
        setUserData({ login: true, email: ``, id_user: id_user })
      }
    })
  }, [])
  return (
    <>
      {
        userData.login ? <div>
          <br />
          <Panel />
          <br /><br /><br /><br /><br />
          <Pie />
        </div>
          : <h1>Loding...</h1>
      }
      {/* <div>
        <br />
        <Panel />
        <br /><br /><br /><br /><br />
        <Pie />
      </div> */}
    </>
  )
}

export default App