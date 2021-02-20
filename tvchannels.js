class TVChannel {
    constructor(chNum, name, price, category) {
        this.channel = chNum
        this.name = name
        this.price = price
        this.category = category
    }
}

class DuplicateChannelException extends Error {
    constructor(message) {
        super(message)
        this.name = 'DuplicateChannelException'
    }
}

class ChannelNotFound extends Error {
    constructor(message) {
        super(message)
        this.name = "Channel is not found"
    }
}

class ChannelManager {
    #allChannels
    #subscribeChannels
    constructor() {
        this.#allChannels = []
        this.#subscribeChannels = []
    }



    // Add a new channel to the management system.  If a channel already exists with the
    // same channel number this method will throw a DuplicateChannelException.
    addChannel(ch) {
        let foundChannel = this.#allChannels.find((x) => x.channel == ch.channel)
        if (foundChannel) {
            throw new DuplicateChannelException(`Adding Channel ${ch.channel}`)
        }
        this.#allChannels.push(ch)
    }

    // Remove a channel from the management system.  If the channel does not exist, the
    // method will throw a ChannelNotFound exception.
    deleteChannel(chNum) {

        let foundIndex = this.#allChannels.findIndex(x => x.channel === chNum)
        console.log((foundIndex))

        //Channel does not exist
        if (!foundIndex) {

            throw new ChannelNotFound(`Channel not found`)

        }
        this.#allChannels.splice(foundIndex, 1)

    }

    // Returns the number of channels.
    countChannels() {
        return this.#allChannels.length
    }

    // Returns a copy of the TV channel with the given channel number.  Notice that it does not
    // return the actual object!  If you get a channel and change information about it (say its name) and
    // ask again for the same TV channel, you will not see the change that you just made.  If the
    // channel does not exist you will get back undefined.
    getChannel(chNum) {
        return this.#allChannels.find((x) => x.channel == chNum)
    }

    getAllChannels() {

        return this.#allChannels.filter(value => value)

    }

    getSubChannels() {

        return this.#subscribeChannels.filter(value => value)

    }



    // Add the channel number to the subscriptions.  The function returns true if
    // the operation was successful and false if the channel was not already subscribed.
    // No exception is thrown.
    subscribeChannel(chNum) {

        let x = new Boolean(true);
        let foundChannel = this.#allChannels.find((x) => x.channel == chNum)
        let foundsubscribe = this.#subscribeChannels.includes(chNum)
        //Not subscribed
        if (foundChannel && !foundsubscribe) {

            this.#subscribeChannels.push(chNum)
            x = false

        }
        //Already subscirbed
        else {
            x = true
        }

        return x

    }
    //Add the subscribed channels
    addSubChannel(ch) {

        this.#subscribeChannels.push(ch)

    }

    // Unsubscribe from the channel.  If the channel is not currently subscribed this
    // operation is ignored.
    unsubscribeChannel(chNum) {

        let foundIndex = this.#subscribeChannels.indexOf(chNum)
        this.#subscribeChannels.splice(foundIndex, 1)
    }

    // Return the number of currently subscribed channels
    countSubcribedChannels() {
        return this.#subscribeChannels.length
    }

    // Return the cost (total) of all currently subscribed channels
    totalSubscribedCost() {

        let total = 0;

        for (let i = 0; i < this.#subscribeChannels.length; i++) {
            let foundChannel = this.#allChannels.find((x) => x.channel == this.#subscribeChannels[i])
            total += foundChannel.price
        }

        return total
    }

    // Returns the next subscribed channel (in order).  Suppose you are
    // subscribed to the channels [3, 6, 7, 10] and you ask for what comes next after channel 7,
    // you chould get a response of 10.  If you ask what comes next after 10, you would get 3.
    // If there are no currently subscribed channels, this function will throw the exception
    // NoSubscribedChannels.
    nextSubscribedChannel(currentCh) {

        let find = this.#subscribeChannels.includes(currentCh)
        if (!find) {
            throw new ChannelNotFound('Channel not found ')

        }

        let lastNum = this.#subscribeChannels[this.#subscribeChannels.length - 1]
        if (lastNum === currentCh) {
            return this.#subscribeChannels[0]
        }
        else {
            let currentChIndex = this.#subscribeChannels.indexOf(currentCh)
            let nextSubChannel = this.#subscribeChannels[currentChIndex + 1]
            return nextSubChannel
        }

    }

    // Returns the previous subscribed channel (in order).  Suppose you are
    // subscribed to the channels [3, 6, 7, 10] and you ask for what comes before channel 7,
    // you chould get a response of 6.  If you ask what comes before 3, you would get 10.
    // If there are no currently subscribed channels, this function will throw the exception
    // NoSubscribedChannels.
    previousSubscribedChannel(currentCh) {

        let find = this.#subscribeChannels.includes(currentCh)
        if (!find) {
            throw new Error('Channel not found ')
        }
        let firstNum = this.#subscribeChannels[0]
        if (firstNum === currentCh) {
            return this.#subscribeChannels[this.#subscribeChannels.length - 1]
        }
        else {
            let currentChIndex = this.#subscribeChannels.indexOf(currentCh)
            let prevSubChannel = this.#subscribeChannels[currentChIndex - 1]
            return prevSubChannel
        }
    }

}


module.exports = {
    TVChannel,
    ChannelManager
}



