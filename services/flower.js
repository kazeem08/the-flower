const FlowerModel = require('../models/flower');

module.exports = {
    async getFlowers(params) {
        const query = params;
        return FlowerModel.find(query);
    },

    async addNames(params) {
        let { names } = params;
        const flowers = await this.getFlowers({ status: 'IN_PROGRESS', });

        console.log('FLOWERS', flowers)
        let tracker = 0;

        for (let i = 0; i < names.length; i++) {
            console.log(tracker, flowers.length)
            if (tracker === flowers.length) {
                tracker = 0;
            }
            const flower = flowers[tracker];
            const { level4, _id: id } = flower;

            // check if level 4 is filled already
            if (level4.length > 7) {
                continue
            }

            // add name to level 4 array
            level4.push(names[i]);  //add name to level 4

            if (level4.length === 8) {
                // call split flower function
                flower.status = 'COMPLETED';
                await this.splitAndSaveFlower(flower);
                console.log('HERE');
            }

            delete flower._id;

            // check if there are more names to add after the first cycle
            if (i === flowers.length && names.length - i > 0) {
                names = names.slice(i + 1)
                i = -1;
            }
            await FlowerModel.findByIdAndUpdate(id, flower);
            tracker++;

        }
    },

    async splitAndSaveFlower(params) {
        const body = params;
        const status = 'IN_PROGRESS';
        const { level2, level3, level4 } = body;
        const newFlower1 = {
            level1: level2[0],
            level2: [level3[0], level3[1]],
            level3: [level4[0], level4[1], level4[2], level4[3]],
            status,
        }

        const newFlower2 = {
            level1: level2[1],
            level2: [level3[2], level3[3]],
            level3: [level4[4], level4[5], level4[6], level4[7]],
            status,
        }

        return FlowerModel.insertMany([newFlower1, newFlower2]);

    }
}