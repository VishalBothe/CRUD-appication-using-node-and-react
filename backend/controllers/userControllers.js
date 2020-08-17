const connection = require('../dbConfig');
exports.usersOrganizedEvents = (req, res) => {
    console.log("INSIDE ORGANIZED EVENT");
    let { activeUserId } = req.params;
    var sql = `SELECT e.*,u.fname,u.lname,u.email,u.mobileno
    FROM events e, users u, event_organizers eo, event_registration er
    WHERE e.id = eo.event_id and eo.user_id = u.id and eo.is_event_head = true
    and er.user_id = ${activeUserId} ORDER BY e.starts_at;`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(`ERROR: ${err}`);
            return res.status(400).json({
                msg: "Unable to get your registered event list"
            });
        }
        return res.status(200).json(result.rows);
    });
}

exports.usersRegisteredEvent = (req, res) => {
    console.log("INSIDE REGISTERED EVENT");
    let { activeUserId } = req.params;
    var sql = `SELECT e.*,u.fname,u.lname,u.email,u.mobileno
    FROM events e, users u, event_organizers eo, event_registration er
    WHERE e.id = eo.event_id and eo.user_id = u.id and eo.is_event_head = true
    and er.user_id = ${activeUserId} ORDER BY e.starts_at;`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(`ERROR: ${err}`);
            return res.status(400).json({
                msg: "Unable to get your events"
            });
        }
        return res.status(200).json(result.rows);
    });
}