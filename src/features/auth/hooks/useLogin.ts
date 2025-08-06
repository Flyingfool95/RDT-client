export default function useLogin() {
    function loginUser() {
        console.log("loging in...");
    }

    return {
        loginUser,
    };
}
