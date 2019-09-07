const router = require('express').Router();


// GET EXCERCISE table 
router.get('/', (req, res) => {
  database('excercises').then(excercise => {
    res.status(200).json(excercise);
  }).catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
})

//POST to EXCERCISE table
router.post('/', (req, res) => {
  database('excercises').insert(req.body, ['id', 'name'])
    .then(ids => {
      database('excercises')
        .where({ id: ids[0] })
        .first()
        .then(r => {
          res.status(200).json(r)
        })
    }).catch(error => {
      res.status(500).json({ error: "POST ERROR!" })
    })
})



// GET EXCERCISE table with ID



router.get('/:id', (req, res) => {
  database('excercises')
    .where({ id: req.params.id })
    .first()
    .then(specificExcerciseID => {
      if (specificExcerciseID) {
        res.status(200).json(specificExcerciseID);
      } else {
        res.status(404).json({ message: 'Excercise Id not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})


// DEL request to with ID
router.delete('/:id', (req, res) => {
  db('excercises')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? 'records DELETED' : 'record DELETED'}`
        })

      } else {
        res.status(404).json({ message: 'Excercise does not exist' })
      }

    }).catch(error => {
      res.status(500).json(error)
    })

})

module.exports = router;