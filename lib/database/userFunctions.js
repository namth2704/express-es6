import DBConnector from './DBConnector';

const dbConnector = new DBConnector();

const GetUserByID = async (userID) => {
    return await dbConnector.query(`select * from user where userid = ?`, [userID]);
};

const AddUser = async (username, birthday) => {
    const result = await dbConnector.query(`select userid from user order by userid desc limit 0, 1`);
    const nextUserID = parseInt(result[0].userid) + 1;
    return await dbConnector.query(`insert into user set ?`, {userid: nextUserID, name: username, dateofbirth: birthday});
};

export default {
    GetUserByID,
    AddUser
};
