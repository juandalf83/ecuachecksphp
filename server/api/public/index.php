<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');
header('content-type: application/pdf; charset=utf-8');


error_reporting(0);
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Selective\BasePath\BasePathMiddleware;
use Slim\Factory\AppFactory;

require '../vendor/autoload.php';
require '../src/config/db.php';

// $app = new \Slim\App;
$app = AppFactory::create();

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->add(new BasePathMiddleware($app));
$app->addErrorMiddleware(true, true, true);

//Modulo usuarios
require '../src/utilities/base_model.php';
require '../src/modules/authentication/authentication_api.php';
require '../src/modules/companies/companies_api.php';
require '../src/modules/consultations/consultations_api.php';
require '../src/modules/contracts/contracts_api.php';
require '../src/modules/plans/plans_api.php';
require '../src/modules/query/query_api.php';
require '../src/modules/roles/roles_api.php';
require '../src/modules/rules/rules_api.php';
require '../src/modules/users/users_api.php';

$app->run();