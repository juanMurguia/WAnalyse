const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

class Chat {

    constructor(name) {

        this.name = name;
        this.path =  `./uploads/${name}`
        this.totalMessages = 0;
        this.nameUser1 = "";
        this.nameUser2 = "";
        this.messageCountUser1 = 0;
        this.messageCountUser2 = 0;
        this.stream = fs.createReadStream(this.path);
    }

    // Properties
    get getData(){
        return {
            "NameuUser1" : this.nameUser1,
            "NameUser2" : this.nameUser2,
            "totalMessages" : this.totalMessages,
            "User1MessageCount" : this.messageCountUser1,
            "User2MessageCount": this.messageCountUser2,
        }
    }

    // Methods
    countMessages() {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(this.path);

            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                const regex = /\] ([^:]+):/g;
                let match;

                while ((match = regex.exec(line)) !== null) {

                    if (match[1] == this.nameUser1) {
                        this.messageCountUser1++;
                    }
                    else if (match[1] == this.nameUser2){
                        this.messageCountUser2++;
                    }
                }
            });

            rl.on('close', () => {
                this.totalMessages = this.messageCountUser1 + this.messageCountUser2;
                resolve();
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }



    indetifyUserNames(){
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(this.path);
            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                const regex = /\] ([^:]+):/g;
                let match;
                while ((match = regex.exec(line)) !== null && this.nameUser1 == this.nameUser2 ) {

                    if (this.nameUser1 == "") {
                        this.nameUser1 = match[1];
                        this.nameUser2 = match[1];
                    }
                    else if (match[1] != this.nameUser1) {
                        this.nameUser2 = match[1]
                    }
                }
            });

            rl.on('close', () => {
                resolve();
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }

    deleteFile(){
        fs.unlink(this.path, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
                return;
            }
            console.log('Archivo eliminado con éxito ');
        });
    }



    async analyse() {

        await this.indetifyUserNames();
        await this.countMessages();

        // this.nameUser1 = nameUser1;
        // this.nameUser2 = nameUser2;
    }


    





}


module.exports = { Chat }