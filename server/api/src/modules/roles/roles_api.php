<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'roles_model.php';

$app->get('/roles', function(Request $request, Response $response){
    $rolesModel = new RolesModel();
    $roles = $rolesModel->get_roles();
    $response->getBody()->write(json_encode($roles));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});