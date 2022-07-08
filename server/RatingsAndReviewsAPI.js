const axios = require('axios');
const config = require('../config.js');

exports.listReviews = (req, res) => {
  console.log(req.query)
  let options = {
    headers: {
      'Authorization': config.TOKEN
    },
    params: {
      product_id: req.query.product_id,
      page: req.query.page,
      count: req.query.count,
      sort: req.query.sort
    }
   }
   // 40344
   let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`;
  axios.get(url, options)
    .then( (result) => {
      res.status(200).send(result.data);
    })
    .catch( (e) => {
      res.status(400).send(e);
    })
}

exports.getReviewMetadata = (req, res) => {
  let options = {
    headers: {
      'Authorization': config.TOKEN
    },
    params: {
      product_id: req.query.product_id
    }
   }
   let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta`;
   axios.get(url, options)
      .then( (result) => {
        console.log('RESULT IS: ', result)
        res.status(200).send(result.data)
      })
      .catch( (e) => {
        res.status(400).send(e)
      })
}

exports.addReview = (req, res) => {
  let options = {
    headers: {
      'Authorization': config.TOKEN
    },
    // params: {
    //   product_id: req.params.product_id,
    //   rating: req.params.rating,
    //   summary: req.params.summary,
    //   body: req.params.body,
    //   recommend: req.params.recommend,
    //   name: req.params.name,
    //   email: req.params.email,
    //   photos: req.params.photos,
    //   characteristics: req.params.characteristics,
    // }
   }
   let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`;
   axios.post(url, req.body, options)
      .then( (result) => res.status(200).send(result.data) )
      .catch( (e) => res.status(400).send(e) )
}

exports.markAsHelpful = (req, res) => {
  // 1274559
  console.log('REQUEST IS...' ,req)
  console.log('REQUEST PARAMS IS...' ,req.params)
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${req.params.review_id}/helpful`;
  axios.put(url, req.params, options)
      .then( (result) => res.status(200).send(result.data))
      .catch( (e) => res.status(404).send(e))
}

exports.reportReview = (req, res) => {
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  axios.put(`/reviews/${req.params.review_id}/report`, options)
      .then( (result) => res.status(200).send(result.data))
      .catch( (e) => res.status(404).send(e))
}