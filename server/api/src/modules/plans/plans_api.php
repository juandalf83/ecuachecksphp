<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'plans_model.php';
require 'plans_domain.php';

$app->get('/plans', function(Request $request, Response $response){
    $plansModel = new PlansModel();
    $plans = $plansModel->get_plans();
    $response->getBody()->write(json_encode($plans));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/plans/update_status', function( Request $request, Response $response){
    $plansDomain = new PlansDomain();
    $result = $plansDomain->update_status($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($result));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/plans/save', function( Request $request, Response $response){
    $plansDomain = new PlansDomain();
    $result = $plansDomain->save($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($result));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});
