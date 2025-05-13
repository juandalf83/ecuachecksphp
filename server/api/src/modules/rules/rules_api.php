<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'rules_model.php';
require __DIR__.'/../companies_rules/companies_rules_model.php';
require __DIR__.'/../consultations_items/consultations_items_model.php';
require 'rules_domain.php';
require __DIR__.'/../companies_rules/companies_rules_domain.php';

$app->get('/rules', function(Request $request, Response $response){
    $rulesDomain = new RulesDomain();
    $rules = $rulesDomain->get_rules();
    $response->getBody()->write(json_encode($rules));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->get('/rules/by_company/{company_id}', function(Request $request, Response $response){
    $companiesRulesDomain = new CompaniesRulesDomain();
    $company_id = $request->getAttribute('company_id');
    $branchOffice = $companiesRulesDomain->get_rules($company_id);
    $response->getBody()->write(json_encode($branchOffice));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/rules/save_admin', function( Request $request, Response $response){
    $rulesDomain = new RulesDomain();
    $result = $rulesDomain->save($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($result));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/rules/save_company', function( Request $request, Response $response){
    $companiesRulesDomain = new CompaniesRulesDomain();
    $result = $companiesRulesDomain->save($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($result));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

