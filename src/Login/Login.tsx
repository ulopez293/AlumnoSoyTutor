import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import { FormEvent, useState } from 'react'
import soytutorIMG from '../assets/img/soytutor.png'
// import { useAtom } from 'jotai'
// import { userDataAtom } from '../atoms/userDataAtom'

const credentials = {
  email: 'admin@soytutor.com',
  password: '064DEtww2rvEJ2b',
}

export const Login = () => {
  //const [,setUserData] = useAtom(userDataAtom)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email === credentials.email && password === credentials.password) {
      // setUserData({ login: true, email })
    } else {
      alert('Credenciales inválidas')
      console.error('Credenciales inválidas')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-sm p-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <img src={soytutorIMG} alt="SoyTutor Logo" className="mx-auto" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" placeholder="name@soytutor.com" required value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required value={password} onChange={handlePasswordChange} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" disabled />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  )
}