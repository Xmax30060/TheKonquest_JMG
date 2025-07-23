const indexmenu = {
    create_party(){
        // Génération simple de code (8 caractères alphanumériques)
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        document.getElementById("game-code").innerText = code;
        // Activer bouton "Lancer la Partie"
        document.getElementById("start-btn").disabled = false;
        // TODO : Ajouter traitement création partie côté serveur ou stockage local
        alert("Partie créée avec le code : " + code);

    },
    join_party(){

    },
    join_party_by_code(){

    },
    join_last_party(){

    }
}
const user_info  = {
    constructor(){
        this.code = '';
        this.user_id = '';
        this.username = '';
        this.userTeritory = [];
    },
    get_user_info(){

    },
    set_user_info(){

    },
    get_user_id(){

    },
    set_user_id(){

    }
}
const party_info = {
    constructor(){
        this.party_id = '';
        this.party_name = '';
        this.party_code = '';
        this.party_owner = '';
        this.party_members = [];
        this.party_territory = [];
    },
    get_party_info(){

    },
    set_party_info(){

    },
    get_party_id(){

    },
    set_party_id(){

    }
}
function create_party() {
    indexmenu.create_party();
}