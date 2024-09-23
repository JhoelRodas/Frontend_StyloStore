import {Popover, Button} from  'antd'
import CustomAvatar from './CustomAvatar'
import {user} from '../../../utils/test'


const CurrentUser = () => {
  return (
    <>
        <Popover
            placement='bottomRight'
            trigger="click"
            overlayInnerStyle={{padding:0}}
            overlayStyle={{zIndex:999}}
        >
            <CustomAvatar
            name={user}
            src={user?.avatarUrl}
            size="default"
            style={{cursor:'pointer'}}
            />
        </Popover>
    </>
  )
}

export default CurrentUser