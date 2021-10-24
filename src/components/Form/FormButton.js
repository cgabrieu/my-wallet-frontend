import Loader from 'react-loader-spinner';
import Button from '../Button';

export default function FormButton ({ isLoading = false, children, ...props }) {
  return (
    <Button {...props}>
      {
        (isLoading === true)
         ? <Loader type="ThreeDots" color="#FFF" height={15} width={50} />
         : children
      }
    </Button>
  )
}