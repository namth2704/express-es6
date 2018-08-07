import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import lessMiddleware from 'less-middleware';
import logger from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';

export default (app) => {
    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(cookieParser());

    app.use(lessMiddleware(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../public')));

    app.use(favicon(path.join(__dirname, '../public', 'images/favicon.ico')));
};