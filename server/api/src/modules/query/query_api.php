<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'query_domain.php';

$app->get('/query/status/{task_id}', function(Request $request, Response $response){
    $queryDomain = new QueryDomain();
    $task_id = $request->getAttribute('task_id');
    $result = $queryDomain->status_query($task_id);
    $response->getBody()->write($result);
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->get('/query/data/{task_id}', function(Request $request, Response $response){
    $queryDomain = new QueryDomain();
    $task_id = $request->getAttribute('task_id');
    $result = $queryDomain->data_query($task_id);
    $response->getBody()->write($result);
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/query/run', function( Request $request, Response $response){
    $queryDomain = new QueryDomain();
    $result = $queryDomain->run_query($request->getParsedBody()['data']);
    $response->getBody()->write($result);
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});