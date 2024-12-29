import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import {BsFingerprint} from "react-icons/bs";
import { PiUsersThreeLight } from "react-icons/pi";
import { IoMailUnreadOutline } from "react-icons/io5";
import {RiRobot3Fill} from "react-icons/ri";

const AdminMenu = () => {
    return (
        <>
            <MenuItem
                icon={PiUsersThreeLight}
                label='All Employee Llist'
                address='all-employee-list'
            />
            <MenuItem
                icon={IoMailUnreadOutline}
                label='Messages'
                address='all-messages'
            />
            <MenuItem
                icon={RiRobot3Fill}
                label='AI Assistant'
                address='aiassistant'
            />
        </>
    )
}

export default AdminMenu
