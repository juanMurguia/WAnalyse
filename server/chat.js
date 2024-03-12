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
        const stream = fs.createReadStream(this.path);
    }

    // Properties
    get getDAta(){
        return {
            
        }
    }

    // Methods
    analyse() {

        this.totalMessages = countTotalMessages();

        const { nameUser1 , nameUser2 } = this.identifyUsers();
        this.user1 = nameUser1;
        this.user2 = nameUser2;

        


    }


    countTotalMessages() {
        const rl = readline.createInterface({
            input: this.stream,
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            this.totalMessages += 1;
        });

        rl.on('close', () => {
            console.log(`Total de mensajes: ${this.totalMessages}`);
        });
    }





}