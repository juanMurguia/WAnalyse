const fs = require('fs');
const readline = require('readline');

class Chat {

    constructor(name) {

        this.name = name;
        this.path =  `./uploads/${name}`
        this.totalMessages = 0;
        this.user1 = "";
        this.user2 = "";
        this.totalMessagesUser1 = 0;
        this.totalMessagesUser2 = 0;
        this.stream = fs.createReadStream(this.path);
    }

    // Properties
    get getDAta(){
        return {
            
        }
    }

    // Methods
    countTotalMessages() {
        const rl = readline.createInterface({
            input: this.stream,
            crlfDelay: Infinity
        });
        let contador = 0

        rl.on('line', (line) => {
            contador ++;
        });

        rl.on('close', () => {
            this.totalMessages = contador;

            console.log(`Total de mensajes: ${this.totalMessages}`);
        });
    }



    analyse() {

        this.totalMessages = this.countTotalMessages();

        // const { nameUser1 , nameUser2 } = this.identifyUsers();
        // this.user1 = nameUser1;
        // this.user2 = nameUser2;
    }


    





}


module.exports = { Chat }