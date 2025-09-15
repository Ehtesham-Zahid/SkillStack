import ProfileInfoForm from "./ProfileInfoForm";
import ProfileImageForm from "./ProfileImageForm";
const ProfileInfo = () => {
  return (
    <div className="w-full bg-surface dark:bg-surface-dark p-5 rounded-md h-full flex flex-col items-center justify-center">
      <ProfileImageForm />
      <ProfileInfoForm />
    </div>
  );
};

export default ProfileInfo;
