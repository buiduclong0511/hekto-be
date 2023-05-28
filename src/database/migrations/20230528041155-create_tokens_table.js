"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("blacklist_tokens", {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            exp: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
            },
            updated_at: {
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("blacklist_tokens");
    },
};
