import { Tabs } from 'flowbite-react'
import { MdDashboard } from "react-icons/md"
import { DashboardAlumno } from '../components/Dashboard/DashboardAlumno'
import panel from "./Panel.module.css"
import { IoStorefront } from "react-icons/io5"
import { useAtom } from 'jotai'
import { tabDataAtom } from '../atoms/tabDataAtom'

export const Panel = () => {
    const [tabData, setTabData] = useAtom(tabDataAtom)
    
    const handleHover = () => {
        if (tabData.activeFoot) setTabData({ activeFoot: false })
    }

    return (
        <div>
            <Tabs aria-label="Default tabs" style="default" >
                <Tabs.Item  active title="Tablero" icon={MdDashboard as React.FC<React.SVGProps<SVGSVGElement>>}>
                    <DashboardAlumno />
                </Tabs.Item>
                <Tabs.Item title="Tienda" icon={IoStorefront as React.FC<React.SVGProps<SVGSVGElement>>}>
                    <iframe onMouseEnter={handleHover} className={panel.iframe} id="miIframe" src="https://soytutor.io/tienda/"></iframe>
                </Tabs.Item>
            </Tabs>
        </div>
    )
}