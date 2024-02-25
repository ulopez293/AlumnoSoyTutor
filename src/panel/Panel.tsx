import { Tabs } from 'flowbite-react'
import { MdDashboard } from "react-icons/md"
import { DashboardAlumno } from '../components/Dashboard/DashboardAlumno'

export const Panel = () => {
    return (
        <>
            <Tabs aria-label="Default tabs" style="default">
                <Tabs.Item active title="Dashboard" icon={MdDashboard as React.FC<React.SVGProps<SVGSVGElement>>}>
                    <DashboardAlumno />
                </Tabs.Item>
            </Tabs>
        </>
    )
}