const FlowerModel = require('../models/flower');
const config = require('../config')
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

        // loop through flowers and add names to each
        for (let i = 0; i < names.length; i++) {
            console.log(tracker, flowers.length)
            if (tracker === flowers.length) {
                tracker = 0;
            }
            const flower = flowers[tracker];
            const { _id: id } = flower;

            // check if flower is already full
            if (flower.counter === 8) {
                continue
            }

            // select which layer to add the flower
            if (flower.counter === 0) {
                flower.flower.children[0].children[0].children[0].name = names[i];
                flower.counter += 1;
            } else if (flower.counter === 1) {
                flower.flower.children[0].children[0].children[1].name = names[i];
                flower.counter += 1;
            } else if (flower.counter === 2) {
                flower.flower.children[0].children[1].children[0].name = names[i];
                flower.counter += 1;
            } else if (flower.counter === 3) {
                flower.flower.children[0].children[1].children[1].name = names[i];
                flower.counter += 1;
            } else if (flower.counter === 4) {
                flower.flower.children[1].children[0].children[0].name = names[i];
                flower.counter += 1;

            } else if (flower.counter === 5) {
                flower.flower.children[1].children[0].children[1].name = names[i];
                flower.counter += 1;

            } else if (flower.counter === 6) {
                flower.flower.children[1].children[1].children[0].name = names[i];
                flower.counter += 1;
            } else if (flower.counter === 7) {
                flower.flower.children[1].children[1].children[1].name = names[i];
                flower.counter += 1;
                flower.status = 'COMPLETED';
                await this.splitAndSaveFlower(flower); // call split flowe

            }

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

        const { template } = config;

        const body = params;
        const status = 'IN_PROGRESS';
        const { flower } = body;

        const template2 = { ...template }

        // form the first flower from the parent
        template.flower.name = flower.children[0].name;
        template.flower.children[0].name = flower.children[0].children[0].name;
        template.flower.children[0].children[0].name = flower.children[0].children[0].children[0].name;
        template.flower.children[0].children[1].name = flower.children[0].children[0].children[1].name;
        template.flower.children[1].name = flower.children[0].children[1].name;
        template.flower.children[1].children[0].name = flower.children[0].children[1].children[0].name;
        template.flower.children[1].children[1].name = flower.children[0].children[1].children[1].name;
        template.status = status;
        template.counter = 0;
        template.parentId = body._id;

        // save the flower
        await FlowerModel.create(template);

        console.log('template', template);

        // form the second flower from the parent
        template2.flower.name = flower.children[1].name;
        template2.flower.children[1].name = flower.children[1].children[0].name;
        template2.flower.children[1].children[0].name = flower.children[1].children[0].children[0].name;
        template2.flower.children[1].children[1].name = flower.children[1].children[0].children[1].name;
        template2.flower.children[0].name = flower.children[1].children[1].name;
        template2.flower.children[0].children[1].name = flower.children[1].children[1].children[1].name;
        template2.flower.children[0].children[0].name = flower.children[1].children[1].children[0].name;
        template2.counter = 0;
        template2.status = status;
        template2.parentId = body._id;

        //save the second flower
        return FlowerModel.create(template2);

    },

    async getFlowerFamily(params) {
        const { id } = params;
        const obj = {};

        // Get flower
        const result = await FlowerModel.findById(id);
        obj.flower = result;

        // get children
        const children = await FlowerModel.find({ parentId: result._id });
        obj.children = children;

        // Get parent
        const parent = await FlowerModel.find({ _id: result.parentId });
        obj.parent = parent[0];

        return obj;

    }
}