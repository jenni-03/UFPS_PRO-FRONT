import React , {useContext}from 'react'
import Page from '../../../components/container/Page'
import UserProfileForm from '../../../components/forms/UserProfileForm'
import { AppContext } from '../../../components/context/AppProvider'

export default function PrincipalPageUser() {

  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<UserProfileForm/>} msg={"Panel Principal"} />
  )
}
