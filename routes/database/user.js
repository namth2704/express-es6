import { Router } from 'express';
import { UserFunctions } from '../../lib/database';

const router = Router();

router.get('/get/:id', async (req, res) => {
    const params = req.params;
    const id = params ? params.id : null;

    try {
        res.json(await UserFunctions.GetUserById(id));
    }
    catch (ex) {
        res.send(`Error while getting user by id=${id}: ${ex}`);
    }
});

router.post('/add', async (req, res) => {
    try {
        const userData = req.body;
        if (userData) {
            const result = await UserFunctions.AddUser(userData);
            res.send(`Add user successfully: ${JSON.stringify(result)}`);
        }
    }
    catch (ex) {
        res.send(`Error while adding user: ${ex}`);
    }
});

router.post('/update', async (req, res) => {
    try {
        const userid = req.body.userid;

        if (userid) {
            const updatedUserData = req.body;
            const result = await UserFunctions.UpdateUser(userid, updatedUserData);
            res.send(`Update user successfully: ${JSON.stringify(result)}`);
        }
        else {
            res.send('Please provide userid to update the user information');
        }
    }
    catch (ex) {
        res.send(`Error while updating user: ${ex}`);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const userid = req.body.userid;

        if (userid) {
            const result = await UserFunctions.DeleteUser(userid);
            res.send(`Delete user successfully: ${JSON.stringify(result)}`);
        }
        else {
            res.send('Please provide userid to delete the user information');
        }
    }
    catch (ex) {
        res.send(`Error while adding user: ${ex}`);
    }
});

export default router;
