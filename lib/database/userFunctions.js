import DBConnector from './DBConnector';

const dbConnector = new DBConnector();

const GetUserByID = async (userid) => {
    return await dbConnector.query(`select * from user where userid = ?`, [userid]);
};

const AddUser = async (userData) => {
    const result = await dbConnector.query(`select userid from user order by userid desc limit 0, 1`);
    let nextUserID = 0;
    if (result && result.length > 0) {
        const maxUserID = parseInt(result[0].userid);
        if (maxUserID != null) {
            nextUserID = maxUserID + 1;
        }
    }
    userData.userid = nextUserID;
    return await dbConnector.query(`insert into user set ?`, userData);
};

const DeleteUser = async (userid) => {
    return await dbConnector.query(`delete from user where userid = ?`, [userid]);
};

const UpdateUser = async (userid, updatedFields) => {
    return await dbConnector.query(`update user set ? where userid = ?`, [updatedFields, userid]);
};

export default {
    GetUserByID,
    AddUser,
    UpdateUser,
    DeleteUser
};
