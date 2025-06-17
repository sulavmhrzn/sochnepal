import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
