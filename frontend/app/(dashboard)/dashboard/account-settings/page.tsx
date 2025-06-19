import AccountForm from "@/components/dashboard/account-settings/AccountForm";
import ProfileForm from "@/components/dashboard/account-settings/ProfileForm";

const AccountSettings = () => {
    return (
        <div className="space-y-4">
            <AccountForm />
            <ProfileForm />
        </div>
    );
};

export default AccountSettings;
