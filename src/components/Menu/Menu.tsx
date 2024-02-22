import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import soytutorIMG from '../../assets/img/soytutor.png'
import react from '../../assets/react.svg'
import { useAtom } from 'jotai'
import { userDataAtom } from '../../atoms/userDataAtom'

export const Menu = () => {
  const [, setUserData] = useAtom(userDataAtom)

  return (
    <>
      <Navbar fluid rounded className="p-6 px-10 shadow-md" style={{ paddingLeft: `3rem`, paddingRight: `3rem` }}>
        <Navbar.Brand href="/">
          <img src={soytutorIMG} className="h-10 sm:h-12" alt="Soytutor Logo" />
          <span className="ml-6 self-center whitespace-nowrap text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800">Panel Administrativo</span>
        </Navbar.Brand>
        <div className="flex md:order-2 mt-3 items-center ml-auto">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" className='me-3' img={react} rounded />
            }
          >
            <Dropdown.Item onClick={() => { setUserData({ login: false, email: `` }) }}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="ml-auto">
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
