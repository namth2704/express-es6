import { Router } from 'express';
import { UserFunctions } from '../../lib/database';

const router = Router();

router.get('/get/:id', async (req, res) => {
    const params = req.params;
    const id = params ? params.id : null;

    if (id) {
        try {
            const user = await UserFunctions.GetUserByID(id);
            res.json(user);
        }
        catch (ex) {
            res.send(`Error while getting user by id=${id}: ${ex}`);
        }
    }
    else {
        res.send('Required userID');
    }
});

router.post('/add', async (req, res) => {
    try {
        const username = req.body.name;
        const birthday = req.body.birthday;
        if (username && birthday) {
            const user = await UserFunctions.AddUser(username, birthday);
            if (user) {
                res.send(`Add user success: ${user}`);
            }
            else {
                res.send(`Error while adding user`);
            }
        }
    }
    catch (ex) {
        console.log(ex);
        res.send(`Error while adding user: ${ex}`);
    }
});

export default router;
