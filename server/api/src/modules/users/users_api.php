<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'users_model.php';
require 'users_domain.php';

$app->get('/users/by_token/{token}', function(Request $request, Response $response){
    $usersModel = new UsersModel();
    $token = $request->getAttribute('token');
    $users = $usersModel->get_user_by_token($token);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->get('/users/by_company/{company_id}', function(Request $request, Response $response){
    $usersModel = new UsersModel();
    $company_id = $request->getAttribute('company_id');
    $users = $usersModel->get_users_company($company_id);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/users/update_status', function( Request $request, Response $response){
    $usersDomain = new UsersDomain();
    $result = $usersDomain->update_status($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($result));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/users/save', function( Request $request, Response $response){
    $usersDomain = new UsersDomain();
    $result = $usersDomain->save($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($result));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/users/save_my_account', function( Request $request, Response $response){
    $usersDomain = new UsersDomain();
    $result = $usersDomain->save_my_account($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($result));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/users/reset_password', function( Request $request, Response $response){
    $usersDomain = new UsersDomain();
    $result = $usersDomain->reset_password($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($result));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});
