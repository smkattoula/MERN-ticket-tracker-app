const router = require('express').Router();
let Ticket = require('../models/ticketModel');

router.route('/').get((req, res) => {
    Ticket.find()
        .then(tickets => res.json(tickets))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const displayName = req.body.displayName;
    const category = req.body.category;
    const priority = req.body.priority;
    const subject = req.body.subject;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newTicket = new Ticket({
        displayName,
        category,
        priority,
        subject,
        description,
        date,
    });

    newTicket.save()
    .then(() => res.json("Ticket added!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Ticket.findByIdAndDelete(req.params.id)
        .then(() => res.json("Ticket deleted."))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => {
            ticket.displayName = req.body.username;
            ticket.category = req.body.category;
            ticket.priority = req.body.priority;
            ticket.subject = req.body.subject;
            ticket.description = req.body.description;
            ticket.date = Date.parse(req.body.date);
        
            ticket.save()
                .then(() => res.json("Ticket updated!"))
                .catch(err => res.status(400).json('Error ' + err));
        })
            .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;