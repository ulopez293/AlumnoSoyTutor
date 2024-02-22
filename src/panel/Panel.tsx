import { Tabs } from 'flowbite-react'
import { MdDashboard } from "react-icons/md"
import { TableUsers } from '../components/TableUsers/TableUsers'

export const Panel = () => {
    return (
        <>
            <Tabs aria-label="Default tabs" style="default">
                <Tabs.Item active title="Dashboard" icon={MdDashboard as React.FC<React.SVGProps<SVGSVGElement>>}>
                    <TableUsers />
                </Tabs.Item>
            </Tabs>
        </>
    )
}