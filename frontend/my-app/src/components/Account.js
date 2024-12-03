import {useAuth} from "../context/AuthContext"
export default function Account(){
    const {user}=useAuth()
    return(
        <div>
            <h2>Account</h2>
            {user&&(
                <>
                <p>user--{user.account.username}</p>
                </>
            )}
        </div>
    )
}