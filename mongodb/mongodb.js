db.sessions.find({
    start_time: {
        $gte: "10/01/2013"
    },
    start_time: {
        $lte: "11/01/2013"
    },
    api_key: "26981JUU"
}).count();


db.sessions.group({
    keyf: function(doc) {
        var date = new Date(doc.start_time);
        var dateKey = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        return {
            'date': dateKey
        };
    },
    // key: {
    //     date: true
    // },
    cond: {
        start_time: {
            $gte: "10/01/2013"
        },
        start_time: {
            $lte: "11/01/2013"
        },
        api_key: "26981JUU"
    },
    initial: {
        session_count: 0
    },
    reduce: function(obj, aggregator) {
        aggregator.session_count++;
    }
});

db.sessions.update({}, {
    $function: function() {
        var date = new Date(doc.start_time);
        var dateKey = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        this.date = dateKey;

    }
})

db.sessions.find().snapshot().forEach(function(doc) {
    var date = new Date(doc.start_time);
    var dateKey = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    doc.date = dateKey;
    db.sessions.save(doc);
})


db.sessions.mapReduce(function() {
    emit(this.date, this.session_id)
}, function(date, sessions) {
    return {
        date: date,
        session_count: sessions.length
    };
}, {
    out: {
        inline: 1
    }
});


db.sessions.aggregate({
    $project: {
        date: 1,
        session_id: 1
    }
}, {
    $group: {
        _id: "$date",
        // memebers: {
        //     $addToSet: "$session_id"
        // },
        count : { $sum : 1 },
    }
});
