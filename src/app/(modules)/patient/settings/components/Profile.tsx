import Input from '@/atoms/fields/Input';

const Profile = () => {
  return (
    <div className="w-full">
      <fieldset className="">
        <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
          <Input
            className="md:mb-0 md:w-[50%]"
            type="text"
            id="fname"
            label="First Name"
            placeholder="Adeolu"
          />
          <Input
            className="md:mb-0 md:w-[50%]"
            type="text"
            id="lname"
            label="Last Name"
            placeholder="John"
          />
        </div>
        <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
          <Input
            className="md:mb-0 md:w-[50%]"
            type="text"
            id="fname"
            label="First Name"
            placeholder="Adeolu"
          />
          <Input
            className="md:mb-0 md:w-[50%]"
            type="text"
            id="lname"
            label="Last Name"
            placeholder="John"
          />
        </div>
        <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
          <Input
            className="md:mb-0 md:w-[50%]"
            type="text"
            id="fname"
            label="First Name"
            placeholder="Adeolu"
          />
          <Input
            className="md:mb-0 md:w-[50%]"
            type="text"
            id="lname"
            label="Last Name"
            placeholder="John"
          />
        </div>

        <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
          <Input
            className="md:mb-0 md:w-[50%]"
            type="text"
            id="fname"
            label="First Name"
            placeholder="Adeolu"
          />
          <Input
            className="md:mb-0 md:w-[50%]"
            type="text"
            id="lname"
            label="Last Name"
            placeholder="John"
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Profile;
