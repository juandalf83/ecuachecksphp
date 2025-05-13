<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'consultations_model.php';

$app->get('/consultations', function(Request $request, Response $response){
    $consultationsModel = new ConsultationsModel();
    $companies = $consultationsModel->get_consultations();
    $response->getBody()->write(json_encode($companies));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});