import { auth } from '../config/firebaseConfig';

const uid = "QJIBnt6xs0YgPtlQuvA7MqMVavx1"; 

async function setInitialAdmin() {
    try {
        await auth.setCustomUserClaims(uid, { role: "admin" });

        console.log("Admin role set successfully");
    } catch (error) {
        console.error("Error setting admin role:", error);
    }
}

setInitialAdmin();