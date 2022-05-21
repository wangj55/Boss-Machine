const isValidIdea = (idea) => {
    if (!idea.hasOwnProperty("numWeeks") || !idea.hasOwnProperty("weeklyRevenue")) {
        return false;
    }

    const {numWeeks, weeklyRevenue} = idea;
    if (isNaN(parseFloat(numWeeks)) || !isFinite(numWeeks)) {
        return false;
    }
    if (isNaN(parseFloat(weeklyRevenue)) || !isFinite(weeklyRevenue)) {
        return false;
    }

    return true;
}

const checkMillionDollarIdea = (req, res, next) => {
    if (!isValidIdea(req.body)) {
        res.status(400).send();
        return;
    }

    const {numWeeks, weeklyRevenue} = req.body;
    const value = numWeeks * weeklyRevenue;
    if (value < 1000000) {
        res.status(400).send();
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
