class MyExampleExtension1712785754482 {
    constructor(zigbee, mqtt, state, publishEntityState, eventBus, settings, logger) {
        logger.info('Loaded  MyExampleExtension1712785754482');
        mqtt.publish('example/extension', 'hello from MyExampleExtension1712785754482');
        this.mqttBaseTopic = settings.get().mqtt.base_topic;
        this.eventBus = eventBus;
        this.mqtt = mqtt;
        this.eventBus.on('stateChange', this.onStateChange.bind(this), this.constructor.name);
    }

    async onStateChange(data) {
        console.log('State changed', data); // comment this out if clutters logs

        const { entity, update } = data;

        //example how to toggle state
        if (entity.ID === '0x00158d000224154d') {
            //state changed for some device (example: clicked a button)
            if (update.action === 'single') {
                const myLampIeeAddr = '0x00124b001e73227f'; // change this
                this.mqtt.onMessage(`${this.mqttBaseTopic}/${myLampIeeAddr}/set`, JSON.stringify({ state: 'toggle' }));
            }
        }
    }

    async onMQTTMessage(topic, message) {
        // console.log({topic, message});
    }

    async stop() {
        this.eventBus.removeListeners(this.constructor.name);
    }
}

module.exports = MyExampleExtension1712785754482;
