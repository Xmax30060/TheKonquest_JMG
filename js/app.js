
const indexmenu = {
    create_party() {
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        const owner = user_info.get_user_id(); // assure-toi qu'il est défini
        const name = prompt("Nom de la partie ?") || "Partie sans nom";

        document.getElementById("game-code").innerText = code;
        document.getElementById("start-btn").disabled = false;

        party_info.set_party_info({
            party_id: code,
            party_code: code,
            party_name: name,
            party_owner: owner,
            party_members: [owner]
        });

        // Envoi au backend
        fetch("https://script.google.com/macros/s/AKfycbyjgkyWLvgt9365aqizyTgsF5xku4SWcFweY3kYbehc/dev", {
            method: "POST",
            body: JSON.stringify({
                action: "create_party",
                party_code: code,
                party_name: name,
                party_owner: owner
            }),
            headers: { "Content-Type": "application/json" }
        }).then(() => alert("Partie créée avec le code : " + code));
    },

    join_party() {
        const user_id = user_info.get_user_id();
        const username = user_info.username;
        const party_code = prompt("Entrez le code de la partie :").toUpperCase();

        user_info.set_user_info({ user_id, username, code: party_code });

        fetch("https://script.google.com/macros/s/AKfycbyjgkyWLvgt9365aqizyTgsF5xku4SWcFweY3kYbehc/dev", {
            method: "POST",
            body: JSON.stringify({
                action: "join_party",
                user_id,
                username,
                party_code
            }),
            headers: { "Content-Type": "application/json" }
        }).then(() => alert("Tu as rejoint la partie " + party_code));
    },

    join_party_by_code(){

    },
    join_last_party(){

    }
}
const user_info = {
    code: '',
    user_id: '',
    username: '',
    userTeritory: [],

    get_user_info() {
        return {
            code: this.code,
            user_id: this.user_id,
            username: this.username,
            userTeritory: this.userTeritory
        };
    },

    set_user_info({ code, user_id, username, userTeritory = [] }) {
        this.code = code;
        this.user_id = user_id;
        this.username = username;
        this.userTeritory = userTeritory;
    },

    get_user_id() {
        return this.user_id;
    },

    set_user_id(id) {
        this.user_id = id;
    }
}

const party_info = {
    party_id: '',
    party_name: '',
    party_code: '',
    party_owner: '',
    party_members: [],
    party_territory: [],

    get_party_info() {
        return {
            party_id: this.party_id,
            party_name: this.party_name,
            party_code: this.party_code,
            party_owner: this.party_owner,
            party_members: this.party_members,
            party_territory: this.party_territory
        };
    },

    set_party_info({ party_id, party_name, party_code, party_owner, party_members, party_territory = [] }) {
        this.party_id = party_id;
        this.party_name = party_name;
        this.party_code = party_code;
        this.party_owner = party_owner;
        this.party_members = party_members;
        this.party_territory = party_territory;
    },

    get_party_id() {
        return this.party_id;
    },

    set_party_id(id) {
        this.party_id = id;
    }
}

function create_party() {
    indexmenu.create_party();
}