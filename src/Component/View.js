import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import {edit} from 'react-icons-kit/feather/edit'

const View = ({forms ,onEditClick ,deleteForm}) => {
  return forms.map((form,index)=>(
    <tr>
        <td>{form.name}</td>
        <td>{form.email}</td>
        <td>{form.pincode}</td>
        <td>{form.number}</td>
        <td className='edit-btn' onClick={()=> onEditClick(index)}>
                <Icon icon={edit}/>
        </td> 
        <td className='delete-btn' onClick={()=>deleteForm(form.name)}>
                <Icon icon={trash}/>
        </td>  
    </tr>
  ))
}

export default View
