const indexmenu = {
    join_party_by_code(Code = null){
        if (!user_info.get_user_id()){
            sessionStorage.setItem("Wait_user_profile", 'true');
            window.location.href = "Profil_Creation.html";
            return;
        }
        const user_id = user_info.get_user_id();
        if (!Code) console.log("No code found");
        const username = user_info.username;
        user_info.set_user_info({ user_id, username, Code });
        join_party(Code, user_id);
        localStorage.setItem("CurentPartyCode", Code);
        alert("Tu as rejoint la partie " + Code);
    },
    join_last_party(){
        const party_code = localStorage.getItem("CurentPartyCode");
        if (party_code) db_join_party(party_code,user_info.user_id);
        alert("Tu as rejoint la partie " + party_code);
    }
}

const user_info = {
    code: '',
    user_id: '',
    username: '',
    userTeritory: [],
    userMoney : 0,

    get_user_info() {
        return {
            code: this.code,
            user_id: this.user_id,
            username: this.username,
            userTeritory: this.userTeritory,
            user_info : this.userMoney
        };
    },

    set_user_info({ code_i = this.code, user_id = this.user_id, username = this.username, userTeritory = [] = this.userTeritory }) {
        this.code = code_i;
        this.user_id = user_id;
        this.username = username;
        this.userTeritory = userTeritory;
        this.userMoney = 0;
    },

    get_user_id() {
        return this.user_id;
    },
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

    set_party_info({party_name, party_code, party_owner, party_members, party_territory = [] }) {
        this.party_name = party_name;
        this.party_code = party_code;
        this.party_owner = party_owner;
        this.party_members = party_members;
        this.party_territory = party_territory;
    },
}

function join_party(method, value = null) {
    if (method === 'code' && value) {
        indexmenu.join_party_by_code(value);
    } else if (method === 'last') {
        indexmenu.join_last_party();
    } else {
        console.error("Méthode de jointure inconnue :", method);
    }
}

window.user_info = user_info;