import { Router } from 'express';
import { GetUserByID, AddUser } from '../../../lib/database';

const router = Router();

router.get('/getuser/:id', async (req, res) => {
    const params = req.params;
    const id = params ? params.id : null;

    if (id) {
        try {
            const user = await GetUserByID(id);
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

router.post('/adduser', async (req, res) => {
    try {
        const username = req.body.name;
        const birthday = req.body.birthday;
        if (username && birthday) {
            const user = await AddUser(username, birthday);
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
