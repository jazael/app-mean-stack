const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then((result) => {
      res.status(201).json({
        message: 'Post añadido correctamente',
        postId: result._id
      });
    })
    .catch((err) => {
      console.log('Ha ocurrido un error al crear el Post --> ' + err);
    });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then((result) => {
      res.status(200).json({
        message: 'Post actualizado correctamente'
      });
    })
    .catch((err) => {
      console.log('Ha ocurrido un error al actualizar el Post --> ' + err);
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'Post not found'
        });
      }
    })
    .catch((err) => {
      console.log('Hubo un error al obtener los documentos --> ' + err);
    });
});

router.get('', (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Ok',
        posts: documents
      });
    })
    .catch((err) => {
      console.log('Hubo un error al obtener los documentos --> ' + err);
    });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Post eliminado correctamente'
      });
    })
    .catch((err) => {
      console.log('Hubo un error al eliminar el documento --> ' + err);
    });
});

module.exports = router;
