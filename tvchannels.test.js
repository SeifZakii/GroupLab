const { TextsmsTwoTone } = require("@material-ui/icons");
const { expect, test, describe } = require("@jest/globals")
const { TVChannel, ChannelManager } = require("./tvchannels")

describe("creating/deleting from the array", () => {
    test("adding 2 arrays then remove 1 and count", () => {
        let cm = new ChannelManager()
        cm.addChannel(new TVChannel(766, 'Zee Tamil', 2, 'General'))
        cm.addChannel(new TVChannel(210, 'Adala TV', 8, 'General'))
        cm.deleteChannel(766)
        let x = cm.countChannels()

        console.log(x)
        console.log(ChannelManager)
        expect(x).toBe(1)
    })
    test("Adding duplicate channel", () => {
        let exceptionThrown = false
        try {
            let cm = new ChannelManager()
            cm.addChannel(new TVChannel(766, 'Zee Tamil', 2, 'General'))
            cm.addChannel(new TVChannel(210, 'Adala TV', 8, 'General'))
            cm.addChannel(new TVChannel(210, 'Adala TV', 8, 'General'))
        }
        catch (e) {
            exceptionThrown = true
        }
        expect(exceptionThrown).toBe(true)
    })
    test('Initializing Channel Manager', () => {
        let manager = new ChannelManager()
        let count = manager.countChannels()
        expect(count).toBe(0)
    })

    test('Getting Channel Info', () => {
        let manager = new ChannelManager()
        manager.addChannel(new TVChannel(210, 'Adala TV', 8, 'General'))
        let error = false
        try {
            manager.getChannel(210)
        }
        catch (e) {
            error = true
        }
        expect(error).toBe(false)
    })


    test('Getting previous subscribed channel', () => {
        let manager = new ChannelManager()
        let channel = new TVChannel(233, 'Future International', 4, 'General')
        let channel2 = new TVChannel(210, 'Adala TV', 8, 'General')
        let channel3 = new TVChannel(313, 'Cartoon Network', 1, 'Kids')
        manager.addChannel(channel)
        manager.addChannel(channel2)
        manager.addChannel(channel3)
        manager.subscribeChannel(233)
        manager.subscribeChannel(210)
        manager.subscribeChannel(313)


        let prevChannel = manager.previousSubscribedChannel(channel2.channel)
        expect(prevChannel).toBe(233)
    })

    test('Getting next subscribed channel', () => {
        let manager = new ChannelManager()
        let channel = new TVChannel(233, 'Future International', 4, 'General')
        let channel2 = new TVChannel(210, 'Adala TV', 8, 'General')
        let channel3 = new TVChannel(313, 'Cartoon Network', 1, 'Kids')
        manager.addChannel(channel)
        manager.addChannel(channel2)
        manager.addChannel(channel3)
        manager.subscribeChannel(233)
        manager.subscribeChannel(210)
        manager.subscribeChannel(313)
        let currentchannel = manager.nextSubscribedChannel(233)
        expect(currentchannel).toBe(210)
    })
       test('Getting count subscribed channel', () => {
        let manager = new ChannelManager()
        let channel = new TVChannel(233, 'Future International', 4, 'General')
        let channel2 = new TVChannel(210, 'Adala TV', 8, 'General')
        let channel3 = new TVChannel(313, 'Cartoon Network', 1, 'Kids')
        manager.addChannel(channel)
        manager.addChannel(channel2)
        manager.addChannel(channel3)
        manager.subscribeChannel(233)
        manager.subscribeChannel(210)
        manager.subscribeChannel(313)
        let currentchannel = manager.countSubcribedChannels()
        expect(currentchannel).toBe(3)
    })

    test('Getting cost subscribed channel', () => {
        let manager = new ChannelManager()
        let channel = new TVChannel(233, 'Future International', 4, 'General')
        let channel2 = new TVChannel(210, 'Adala TV', 8, 'General')
        let channel3 = new TVChannel(313, 'Cartoon Network', 1, 'Kids')
        manager.addChannel(channel)
        manager.addChannel(channel2)
        manager.addChannel(channel3)
        manager.subscribeChannel(233)
        manager.subscribeChannel(210)
        manager.subscribeChannel(313)
        let currentchannel = manager.totalSubscribedCost()
        expect(currentchannel).toBe(13)
    })
    test('Getting previous subscribed channel total cost', () => {
        let manager = new ChannelManager()

        let channel = new TVChannel(233, 'Future International', 4, 'General')
        let channel2 = new TVChannel(210, 'Adala TV', 8, 'General')
        let channel3 = new TVChannel(313, 'Cartoon Network', 1, 'Kids')
        manager.addChannel(channel)
        manager.addChannel(channel2)
        manager.addChannel(channel3)
        manager.subscribeChannel(233)
        manager.subscribeChannel(210)
        manager.subscribeChannel(313)
        let currentchannel = manager.totalSubscribedCost()
        expect(currentchannel).toBe(13)
    })
    test('Getting subscribed list length', () => {
        let manager = new ChannelManager()

        let channel = new TVChannel(233, 'Future International', 4, 'General')
        let channel2 = new TVChannel(210, 'Adala TV', 8, 'General')
        let channel3 = new TVChannel(313, 'Cartoon Network', 1, 'Kids')
        manager.addChannel(channel)
        manager.addChannel(channel2)
        manager.addChannel(channel3)
        manager.subscribeChannel(233)
        manager.subscribeChannel(210)
        manager.subscribeChannel(313)
        let currentchannel = manager.countSubcribedChannels()
        expect(currentchannel).toBe(3)
    })
    
    

})