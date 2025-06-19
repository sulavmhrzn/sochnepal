import AccountForm from "@/components/dashboard/account-settings/AccountForm";
import ChangePassword from "@/components/dashboard/account-settings/ChangePasswordForm";
import DangerZone from "@/components/dashboard/account-settings/DanzerZone";
import ProfileForm from "@/components/dashboard/account-settings/ProfileForm";

const AccountSettings = () => {
    return (
        <div className="space-y-4">
            <AccountForm />
            <ProfileForm />
            <ChangePassword />
            <DangerZone />
        </div>
    );
};

export default AccountSettings;
