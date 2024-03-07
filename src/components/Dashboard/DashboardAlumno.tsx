import { Card, Modal, Timeline } from "flowbite-react"
import useSWR from "swr"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useWindowSize } from "../../hooks/useWindowSize"
import { useAtom } from "jotai"
import { userDataAtom } from "../../atoms/userDataAtom"
import { useState } from "react"
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { tabDataAtom } from "../../atoms/tabDataAtom"

const API_URL = import.meta.env.VITE_APIS_SOYTUTOR as string ?? ""

interface Asesorias {
    fecha: Date
    name_mentor: string
    category: string | null
    subcategory: string | null
    secondCategory: string | null
    secondSubcategory: string | null
}

interface Favoritos {
    OID: number
    image_url: string
    name_mentor: string
    descripcion: string | null | undefined
    UserName: string | null | undefined
    IsMentor: boolean | null | undefined
}

interface DashboardUser {
    name: string
    asesorias_completas: number
    asesorias_pendientes: number
    tus_asesorias: Asesorias[]
    mentores_favoritos: Favoritos[]
}

const fetcher = async (url: string) => {
    const response = await fetch(url)
    const data = await response.json() as DashboardUser
    return data
}

const convertirFecha = (fechaString: Date) => {
    // Crear un objeto Date a partir de la cadena de fecha proporcionada
    const fecha = new Date(fechaString)
    // Días de la semana en español
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    // Meses del año en español
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    // Obtener los componentes de la fecha
    const diaSemana = diasSemana[fecha.getDay()]
    const dia = fecha.getDate()
    const mes = meses[fecha.getMonth()]
    const año = fecha.getFullYear()
    let hora = fecha.getHours()
    const minutos = fecha.getMinutes()
    const periodo = hora >= 12 ? 'PM' : 'AM'
    // Convertir la hora al formato de 12 horas
    if (hora > 12) hora -= 12
    // Ajustar el formato para minutos menores a 10
    const minutosString = minutos < 10 ? '0' + minutos : minutos
    // Crear la cadena de fecha formateada
    const fechaFormateada = `${dia} ${mes} ${año} - ${diaSemana} ${hora}:${minutosString} ${periodo}`
    return fechaFormateada
}

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}

export const DashboardAlumno = () => {
    const [userData] = useAtom(userDataAtom)
    const [tabData, setTabData] = useAtom(tabDataAtom)
    const dashboardSWR = useSWR(API_URL + `/get/dashboard/user/data/${userData.id_user}`, fetcher)
    const { width } = useWindowSize()
    const [openModal, setOpenModal] = useState(false)

    if (dashboardSWR.error) return <h1>failed to load</h1>
    if (dashboardSWR.isLoading) return <h1>loading...</h1>

    console.log(dashboardSWR.data)

    const postMessageSendData = (identificador: string | number | null | undefined) => {
        const sendData = {
            oid_user: identificador,
            mensaje: 'CHANGE_PAGE'
        }
        console.log(`react postMessage: `, sendData)
        window.parent.postMessage(sendData, "*")
    }

    const handleHover = () => {
        if (!tabData.activeFoot) setTabData({ activeFoot: true })
    }

    return (
        <div className="overflow-x-auto pr-10 pl-10" onMouseEnter={handleHover}>
            <p className="text-4xl font-semibold text-gray-900 mb-5 mt-5">¡Hola {dashboardSWR?.data?.name}!</p>
            <div className="grid 2xl:grid-cols-2 gap-4">

                <Card href="#" className="max-w-full m-5 cursor-default">
                    <h5 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {dashboardSWR?.data?.asesorias_completas}
                    </h5>
                    <p className="text-3xl font-normal text-gray-300 dark:text-gray-400 mt-10 mb-5">
                        Asesorías completadas
                    </p>
                </Card>
                <Card href="#" className="max-w-full m-5 cursor-default">
                    <h5 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {dashboardSWR?.data?.asesorias_pendientes}
                    </h5>
                    <p className="text-3xl font-normal text-gray-300 dark:text-gray-400 mt-10 mb-5">
                        Asesorías pendientes
                    </p>
                </Card>


                <Card href="#" className="max-w-full m-5 cursor-default">
                    <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-5">
                        Tus asesorias
                    </h5>
                    <div className="max-h-80 overflow-y-auto">
                        <Timeline>
                            {dashboardSWR?.data?.tus_asesorias.map((asesoria, id) =>
                                <Timeline.Item key={id}>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time className="text-base">{convertirFecha(asesoria.fecha)}</Timeline.Time>
                                        <Timeline.Title>{asesoria.name_mentor}</Timeline.Title>
                                        <Timeline.Body>
                                            {asesoria.category?.trim()} - {asesoria.subcategory?.trim()}
                                            {asesoria.secondCategory ? " || " : ""} {asesoria.secondCategory?.trim()}
                                            {asesoria.secondSubcategory ? " - " : ""} {asesoria.secondSubcategory?.trim()}
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                            )}
                        </Timeline>
                    </div>
                </Card>
                <Card href="#" className="max-w-full m-5 cursor-default">
                    <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-5">
                        Tutores Favoritos
                    </h5>
                    {
                        width > 1400 ?
                            <Slider {...settings} >
                                {dashboardSWR?.data?.mentores_favoritos.map((mentor) =>
                                    <div key={mentor.OID}>
                                        <Card onClick={() => {
                                            if (mentor.IsMentor) {
                                                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                                                postMessageSendData(mentor.UserName || mentor.OID)
                                            } else {
                                                setOpenModal(true)
                                            }
                                        }} className="h-96 m-3 mt-0 mb-0 cursor-pointer transform transition-transform hover:scale-105">
                                            <div className="flex flex-col items-center pb-10">
                                                <img className="mb-3 rounded-full shadow-lg" src={mentor.image_url} alt="Bonnie image" height="96" width="96" />
                                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{mentor.name_mentor}</h5>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{mentor.descripcion}</span>
                                            </div>
                                        </Card>

                                    </div>
                                )}
                            </Slider> :
                            dashboardSWR?.data?.mentores_favoritos.map((mentor) =>
                                <Card key={mentor.OID} onClick={() => {
                                    if (mentor.IsMentor) {
                                        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                                        postMessageSendData(mentor.UserName || mentor.OID)
                                    } else {
                                        setOpenModal(true)
                                    }
                                }} className="h-full cursor-pointer transform transition-transform hover:scale-105">
                                    <div className="flex flex-col items-center pb-10">
                                        <img className="mb-3 rounded-full shadow-lg" src={mentor.image_url} alt="Bonnie image" height="96" width="96" />
                                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{mentor.name_mentor}</h5>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{mentor.descripcion}</span>
                                    </div>
                                </Card>
                            )
                    }
                </Card>
            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Queremos informarte de que este tutor actualmente no está disponible. Te sugerimos que reserves una sesión con otro tutor. Te notificaremos en cuanto vuelva a estar disponible.
                        </h3>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
