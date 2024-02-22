import { Checkbox, Table } from 'flowbite-react'
import useSWR from 'swr'

const fetcher = async (url: string) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}


export const TableUsers = () => {
    const { data, error, isLoading } = useSWR('https://soytutorapis-dev.up.railway.app/users/ALL_MEENTES', fetcher)

    if (error) return <h1>failed to load</h1>
    if (isLoading) return <h1>loading...</h1>

    console.log(data)

    const handleCheckboxChange = (usuario: any) => {
        console.log(`Checkbox changed for usuario ${usuario.OID}`)
    }

    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell># OID</Table.HeadCell>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell>Correo</Table.HeadCell>
                    <Table.HeadCell>Telefono</Table.HeadCell>
                    <Table.HeadCell>Tipo</Table.HeadCell>
                    <Table.HeadCell className="p-4">Activar Suscripcion</Table.HeadCell>
                    <Table.HeadCell>Editar</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        data.map((usuario: any) => {
                            return (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={usuario.OID}>
                                    <Table.Cell>{usuario.OID}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {usuario.Name} {usuario.LastName}
                                    </Table.Cell>
                                    <Table.Cell>{usuario.Email}</Table.Cell>
                                    <Table.Cell>{usuario.Phone}</Table.Cell>
                                    <Table.Cell>{usuario.UserType}</Table.Cell>
                                    <Table.Cell className="p-4">
                                        <Checkbox checked={usuario.Member === true} onChange={() => handleCheckboxChange(usuario)} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </div>
    )
}
