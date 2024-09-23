import {Avatar as AntAvatar} from 'antd'

const CustomAvatar = (props) => {
  const firstName =props.name[0]?.firstName || '';
  const firstLastName = props.name[0]?.firstLastName || '';
  const initialFirstName = firstName.charAt(0).toUpperCase();
  const initialFirstLastName = firstLastName.charAt(0).toUpperCase();
  const initials = `${initialFirstName}${initialFirstLastName}`;
  
  return (
    <AntAvatar
        alt={'DevelopSaleth'}
        size="big"
        style={{
            backgroundColor:"#1677FF",
            display:'flex',
            alignItems:'center',
            border:'none'
        }}
    >
      {initials}
    </AntAvatar>
  )
}

export default CustomAvatar