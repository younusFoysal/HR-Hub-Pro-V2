import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
import {RiRobot3Fill} from "react-icons/ri";
const EmployeeMenu = () => {
    return (
        <>
            <MenuItem
                icon={BsFillHouseAddFill}
                label='Work Sheet'
                address='work-sheet' />

            <MenuItem
                icon={MdOutlineManageHistory}
                label='Payment History'
                address='payment-history'
            />
            <MenuItem
                icon={RiRobot3Fill}
                label='AI Assistant'
                address='aiassistant'
            />
        </>
    )
}

export default EmployeeMenu
