export default function useLogin() {
    /* Make login call to backend using ReactQuery */
    /* Then make routeguard when user is in state */
    function loginUser() {
        console.log("loging in...");
    }

    return {
        loginUser,
    };
}
