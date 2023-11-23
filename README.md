# ORM and Sequelize Starter for CreateApp
prepared by croftd Nov. 19, 2023 \

Object relational mappers are common with most frameworks (e.g. ActiveRecord for Ruby on Rails, Laravel PHP framework etc.). This repo provides code samples to introduce Object-Relational mapping with node.js and the Sequelize package:
https://sequelize.org/docs/v6/getting-started/ \

Examples in server.js are adapted form this tutorial:
https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql \

## Setup
npm install --save sequelize \
npm install --save mysql2

### Install sequalize-auto
This is from: https://ratneshpandey.hashnode.dev/auto-generate-models-for-sequelize-using-sequelize-auto \
npm i sequelize-auto

### Generate the models using node by querying the existing create_app database
node node_modules/sequelize-auto/bin/sequelize-auto -o "./models" -d create_app -u croftd -x test1234 --config "./sequelize-auto-config.json"


