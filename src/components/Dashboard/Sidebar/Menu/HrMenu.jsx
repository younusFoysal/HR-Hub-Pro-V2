import { BsFingerprint } from 'react-icons/bs'
import { CiViewList } from "react-icons/ci";
import { GrUserAdmin } from 'react-icons/gr'
import { useState } from 'react'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAuth from '../../../../hooks/useAuth.js'
import {RiRobot3Fill} from "react-icons/ri";
import {FaPeopleGroup} from "react-icons/fa6";
import {MdOutlineRateReview} from "react-icons/md";


const HrMenu = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [role] = useRole()
    

    
    return (
        <>

            <MenuItem
                icon={FaPeopleGroup }
                label='Employee Llist'
                address='employee-list'
            />
            <MenuItem
                icon={CiViewList}
                label='Work Records'
                address='progress'
            />
            <MenuItem
                icon={RiRobot3Fill}
                label='AI Assistant'
                address='aiassistant'
            />
            <MenuItem
                icon={MdOutlineRateReview}
                label='Give Review'
                address='addreview'
            />





        </>
    )
}

export default HrMenu
