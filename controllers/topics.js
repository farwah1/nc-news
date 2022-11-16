const { 
    selectTopics,
    selectArticles,
    selectArticleByArticleId,
    selectCommentsByArticleId,
    addComment,
    selectUsers
 } = require('../models/topics.js')


exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((slugs) => {
        res.send({ slugs });
    });
};

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((articles) => {
        res.send(articles.rows);
    });
};


exports.getArticleByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleByArticleId(article_id)
    .then((article) => {
        res.send({ article });
    })
    .catch((error) => {
        next(error);
    });
};


exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    selectCommentsByArticleId(article_id)
    .then((comments) => {
        res.send({ comments });
    })
    .catch((err) => {
        next(err);
    });
};

exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
    addComment(article_id, username, body)
    .then((comment) => {
        res.status(201).send({ comment })
    })
    .catch((error) => {
        next(error)
    })
}

exports.getUsers = (req, res, next) => {
    selectUsers()
    .then((users) => {
        res.status(200).send({ users })
    })
    .catch((error) => {
        next(error)
    })
}

