const express = require('express');
const app = express();
app.use(express.json());

const users = [{
    name: 'Pratham',
    kidneys: [{
        healthy: false
    }, {
        healthy: true
    }]
}];

app.get('/', function(req, res) {
    const prathamKidneys = users[0].kidneys;
    const numberOfKidneys = prathamKidneys.length;

    // Filter to find healthy kidneys
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < prathamKidneys.length; i++) {
        if (prathamKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

app.post('/', function(req, res) {
    let isHealthy = req.body.isHealthy;

    // Logging the parsed boolean value
    console.log('Parsed isHealthy:', isHealthy);

    users[0].kidneys.push({
        healthy: isHealthy
    });

    res.json({
        msg: "Done!"
    });
});

app.put('/', function(req, res) {
    const prathamKidneys = users[0].kidneys;

    // Update all kidneys to healthy
    for (let i = 0; i < prathamKidneys.length; i++) {
        prathamKidneys[i].healthy = true;
    }
    res.json({ msg: 'Updated' });
});

app.delete('/', function(req, res) { // Fixed the closing parenthesis
    // Implementation for DELETE request
    if (unhealthyKidneyQ()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                });
            }
        }
        users[0].kidneys = newKidneys;
        res.json({ msg: "upgraded!" });
    } else {
        res.status(411).json({ msg: 'You have no bad kidneys' });
    }
});

function unhealthyKidneyQ() {
    let unhealthyKidneyQ = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            unhealthyKidneyQ = true;
        }
    }
    return unhealthyKidneyQ; // Fixed the return placement
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
