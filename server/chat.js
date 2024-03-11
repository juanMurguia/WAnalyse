class Chat {

    constructor(name) {

        this.name = name;
        this.path =  `./uploads/ + ${name}`
        this.totalMessages = 0;
        this.user1 = "";
        this.user2 = "";
        this.totalMessagesUser1 = 0;
        this.totalMessagesUser2 = 0;
    }
}