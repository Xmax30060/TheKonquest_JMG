import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, query, getDoc, updateDoc, where } from "firebase/firestore";
import { user_info } from "./app";

declare global {
  interface Window {
    create_party: (min_players: number, max_players: number) => Promise<string | undefined>;
    db_join_party: (code: string, name: string) => Promise<boolean | void>;
  }
}

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

const create_party = async function (min_players, max_players) {
    try {
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        const q = query(collection(db, "party"), where("code", "==", code));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return create_party(min_players, max_players);
        }
        const owner = user_info.get_user_id() || "xmax_le_owner";
        const name = prompt("Nom de la partie ?") || "Partie sans nom";
        setDoc(doc(db, "party", code), {
            code: code,
            name: name,
            owner: owner,
            members: [owner]
        });
        console.log("Party créée avec ID :", code);
        const gameCodeElement = document.getElementById("game-code");
        if (gameCodeElement) gameCodeElement.innerText = code;
        const startBtnElement = document.getElementById("start-btn") as HTMLButtonElement;
        if (startBtnElement) startBtnElement.disabled = false;

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

window.create_party = create_party;

window.db_join_party = async function (code, memberId) {
    try {
        const q = query(collection(db, "party"), where("code", "==", code));
        const querySnapshot = await getDoc(q);

        if (!querySnapshot.exists()) {
            console.log("Aucune party trouvée avec le code :", code);
            return false;
        }

        const partyDoc = querySnapshot.get(code);
        const partyData = partyDoc.data();

        const members = partyData.members || [];
        if (!members.includes(memberId)) {
            members.push(memberId);
        } else {
            console.log("Le membre est déjà dans la party ", memberId);
        }
        await updateDoc(doc(db, "party", partyDoc.id), {
            members: members
        });
        console.log("Party rejoint avec ID :", code);
    } catch (e) {
        console.error("Erreur d'ajout :", e);
    }
}
