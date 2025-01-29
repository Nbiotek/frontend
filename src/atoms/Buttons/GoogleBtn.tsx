import { FcGoogle } from 'react-icons/fc';
import Button from '.';

const GoogleBtn = () => {
  return (
    <Button
      className="font-medium"
      type="button"
      variant="outlined"
      leftIcon={<FcGoogle className="text-xl" />}
      text="Continue with Google"
    />
  );
};

export default GoogleBtn;
