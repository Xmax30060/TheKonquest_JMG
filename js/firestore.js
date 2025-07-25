import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, query, getDoc, updateDoc, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZWMlPN9SYdfSO1MmWrvX5D0NoZg_PxUo",
    authDomain: "thekonquest.firebaseapp.com",
    projectId: "thekonquest",
    storageBucket: "thekonquest.firebasestorage.app",
    messagingSenderId: "552548750619",
    appId: "1:552548750619:web:7afbbb365dd41d6e1a6fbe",
    measurementId: "G-8K6DJDW3H1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.create_party = async function () {
    try {
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        const q = query(collection(db, "party"), where("code", "==", code));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return create_party(name, owner);
        }
        if (localStorage.getItem("USER_ID") === null) {
            sessionStorage.setItem("Wait_user_profile", 'true');
            window.location.href = "Profil_Creation.html";
            return;
        }
        const owner = localStorage.getItem('USER_ID');
        const name = prompt("Nom de la partie ?") || "Partie sans nom";
        setDoc(doc(db, "party", code), {
            code: code,
            name: name,
            owner: owner,
            members: [owner]
        });
        console.log("Party créée avec ID :", code);
        document.getElementById("game-code").innerText = code;
        document.getElementById("start-btn").disabled = false;
        party_info.set_party_info({
            party_code: code,
            party_name: name,
            party_owner: owner,
            party_members: [owner]
        });
        return code;
    } catch (e) {
        console.error("Erreur d'ajout :", e);
    }
}

window.db_join_party = async function (code, name) {
    try {

        const q = query(collection(db, "party"), where("code", "==", code));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("Aucune party trouvée avec le code :", code);
            return false;
        }
        localStorage.setItem("CurentPartyCode", code);
        const partyDoc = querySnapshot.docs[0];
        const partyData = partyDoc.data();

        const members = partyData.members || [];
        if (!members.includes(name)) {
            members.push(name);
        } else {
            console.log("Le membre est déjà dans la party ", name);
        }
        await updateDoc(doc(db, "party", partyDoc.id), {
            members: members
        });
        console.log("Party rejoint avec ID :", partyDoc.id);
    } catch (e) {
        console.error("Erreur d'ajout :", e);
    }
}
