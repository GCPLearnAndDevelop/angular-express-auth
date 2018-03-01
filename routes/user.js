const express = require('express');

const router = express.Router();

router.route('/')
    .get(
        async (req, res) => {

            try{
                res.status(200).json(req.user);
            }catch( error ){
                res.status(500).send(error);
            }

        }
    );

module.exports = router;