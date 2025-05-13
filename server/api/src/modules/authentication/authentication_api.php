<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'authentication_domain.php';

$app->post('/authentication/login', function( Request $request, Response $response){
    $authenticationDomain = new AuthenticationDomain();
    $users = $authenticationDomain->login($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});


$app->post('/authentication/register', function( Request $request, Response $response){
    $authenticationDomain = new AuthenticationDomain();
    $users = $authenticationDomain->register($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});

$app->post('/authentication/validate', function( Request $request, Response $response){
    $authenticationDomain = new AuthenticationDomain();
    $user = $request->getParsedBody()['data'];
    if($user != '' && $user != NULL){
        $result = $authenticationDomain->validate($user['token']);
        $response->getBody()->write(json_encode($result));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(200);
    }else{
        $response->getBody()->write('');
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(200);
    }
});

$app->post('/authentication/logout', function( Request $request, Response $response){
    $authenticationDomain = new AuthenticationDomain();
    $user = $request->getParsedBody()['data'];
    if($user != '' && $user != NULL){
        $users = $authenticationDomain->logout($user['api_token']);
        $response->getBody()->write(json_encode($users));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(200);
    }else{
        $response->getBody()->write('');
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(200);
    }
});

$app->post('/authentication/reset_password', function( Request $request, Response $response){
    $authenticationDomain = new AuthenticationDomain();
    $users = $authenticationDomain->reset_password($request->getParsedBody()['data']);
    $response->getBody()->write(json_encode($users));
    return $response
        ->withHeader('content-type', 'application/json')
        ->withStatus(200);
});
