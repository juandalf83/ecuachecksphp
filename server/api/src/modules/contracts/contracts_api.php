<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'contracts_model.php';
require 'contracts_domain.php';

$app->get('/contracts', function(Request $request, Response $response){
    $contractsModel = new ContractsModel();
    $contracts = $contractsModel->get_contracts();
    $response->getBody()->write(json_encode($contracts));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->get('/contracts/valid_credits/{company_id}', function(Request $request, Response $response){
    $contractsModel = new ContractsModel();
    $company_id = $request->getAttribute('company_id');
    $contracts = $contractsModel->get_firts_contract_company($company_id);
    $response->getBody()->write(json_encode($contracts));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/contracts/update_status', function( Request $request, Response $response){
    $contractsDomain = new ContractsDomain();
    $users = $contractsDomain->update_status($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/contracts/update_credits', function( Request $request, Response $response){
    $contractsDomain = new ContractsDomain();
    $users = $contractsDomain->update_credits($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/contracts/create_contract_company', function( Request $request, Response $response){
    $contractsDomain = new ContractsDomain();
    $users = $contractsDomain->create_contract_company($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/contracts/consume_credits', function( Request $request, Response $response){
    $contractsDomain = new ContractsDomain();
    $users = $contractsDomain->consume_credits($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});
