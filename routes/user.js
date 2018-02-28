const express = require('express');

const router = express.Router();

router.route('/')
    .get(
        async (req, res) => {

            try{
                console.log(req.locals.profile)
                res.status(200).json(res.locals.profile);
            }catch( error ){
                rs.status(500).send(error);
            }

        }
    );

module.exports = router;