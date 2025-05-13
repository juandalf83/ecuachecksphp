<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'companies_model.php';
require 'companies_domain.php';

$app->get('/companies', function(Request $request, Response $response){
    $companiesDomain = new CompaniesDomain();
    $companies = $companiesDomain->get_companies();
    $response->getBody()->write(json_encode($companies));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/companies/update_status', function( Request $request, Response $response){
    $companiesDomain = new CompaniesDomain();
    $users = $companiesDomain->update_status($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});