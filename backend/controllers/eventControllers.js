const connection = require('../dbConfig');

// POST req
exports.organizeEvent = (req, res) => {
    let {
        event_name,
        starts_at,
        ends_at,
        event_type,
        venue,
        joining_details
    } = req.body;

    let { event_heads, other_orgs } = req.body.organizers;

    var sql = `INSERT INTO events(
        event_name,
        starts_at,
        ends_at,
        event_type,
        venue,
        joining_details
    ) VALUES(
        '${event_name}',
        '${starts_at}',
        '${ends_at}',
        '${event_type}',
        '${venue}',
        '${JSON.stringify(joining_details)}'
    ) RETURNING id;`;

    connection.query(sql, (err, event) => {
        if(err || event.rowCount != 1){
            console.log(`ERROR: ${err}`);
            return res.status(400).json({
                msg: "Unable organize event!!"
            });
        }
        sql = "";

        for(let i=0; i<event_heads.length; i++){
            sql = sql + `INSERT INTO event_organizers(event_id,user_id,is_event_head)
            VALUES('${event.rows[0].id}','${event_heads[i]}','${true}');`;
        }
        for (let i = 0; i < other_orgs.length; i++) {
            sql += `INSERT INTO event_organizers(event_id,user_id,is_event_head)
            VALUES('${event.rows[0].id}','${other_orgs[i]}','${false}');`;
        }
        connection.query(sql, (err, result) => {
            if(err){
                console.log(`ERROR TO SCHEDULE EVENT ${err}`);
                connection.query(
                    `DELETE FROM events WHERE id='${event.rows[0].id}'`,
                    (err,event) => {
                        if(err){

                        }
                        res.status(400).json({
                            msg: "Event not scheduled!! try again..."
                        });
                    }
                )
            }
            console.log(result);
            return res.status(200).json({
                msg: "Event scheduled successfully !!",
            });
        });
    });
}

// POST req
exports.attendEvent = (req, res) => {
    let {user_id, event_id,chance_of_attending} = req.body;

    sql = `INSERT INTO event_registration(
        event_id, user_id, chance_of_attending
    ) VALUES(
        '${event_id}','${user_id}','${chance_of_attending}'
    );`;

    connection.query(sql, (err, result) => {
        if(err){
            console.log(`ERROR: ${err}`);
            return res.status(400).json({
                msg: "Event registration failed"
            });
        }
        return res.status(200).json({
            msg: "Successfully registered"
        });
    });
}

// GET req
exports.upcommingEventList = (req, res) => {
    let { activeUserId } = req.params;
    var sql = `SELECT e.*,u.fname,u.lname,u.email,u.mobileno
    FROM events e, users u, event_organizers eo, event_registration er
    WHERE e.id = eo.event_id and eo.user_id = u.id and eo.is_event_head = true
    and er.user_id != ${activeUserId};`;

    connection.query(sql, (err, result) => {
        if(err){
            console.log(`ERROR: ${err}`);
            return res.status(400).json({
                msg: "Unable to get upcomming event list"
            });
        }
        return res.status(200).json(result.rows);
    });
}