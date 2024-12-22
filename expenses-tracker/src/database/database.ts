import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('expense_tracker_db', 'postgres', 'project', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;
