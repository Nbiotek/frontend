import { FaFacebook } from 'react-icons/fa6';
import Button from '.';

const FacebookBtn = () => {
  return (
    <Button
      className="font-medium"
      type="button"
      variant="outlined"
      leftIcon={<FaFacebook className="text-lg text-blue-300" />}
      text="Continue with Facebook"
    />
  );
};

export default FacebookBtn;
