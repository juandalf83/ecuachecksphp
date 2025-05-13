<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

error_reporting(0);
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

function clear_special_characters($string ){
    $string = htmlentities($string);
    $string = preg_replace('/\&(.)[^;]*;/', '\\1', $string);
    return $string;
}

require_once __DIR__ . '/vendor/autoload.php';
require_once 'view.php';

$defaultConfig = (new Mpdf\Config\ConfigVariables())->getDefaults();
$fontDirs = $defaultConfig['fontDir'];

$defaultFontConfig = (new Mpdf\Config\FontVariables())->getDefaults();
$fontData = $defaultFontConfig['fontdata'];

$mpdf = new \Mpdf\Mpdf([
    'tempDir' => __DIR__ . '/tmp',
    'fontDir' => array_merge($fontDirs, [
        __DIR__ . '/templates/font',
    ]),
    'fontdata' => $fontData + [
        'poppins' => [
            'R' => 'Poppins-Light.ttf',
            'B' => 'Poppins-SemiBold.ttf',
            'I' => 'Poppins-Medium.ttf',
            'BI' => 'Poppins-SemiBold.ttf',
        ]
    ],
    'default_font' => 'poppins',
]);

$view = new View();

$urlCss = __DIR__ . '/templates/report/style.css';
$styles = file_get_contents($urlCss);

$post = json_decode(file_get_contents('php://input'));
$register = $post->data->register;
$control_organisms = $post->data->control_organisms;
$dataBody = array();
$dataBody['register'] = $register;
$dataBody['control_organisms'] = $control_organisms;
$dataBody['date_str'] = date('Y-m-d');

$types_alerts_message = array(
    array('type' => 'Alerta', 'color' => '#ff0000', 'backgroud' => '#ff00001f'), 
    array('type' => 'Limpio', 'color' => '#00ff00', 'backgroud' => '#00ff001f')
);

$header_participants = array(
    array('title' => 'Obligado principal', 'field' => 'legal_representative'),
    array('title' => 'Rep. legal', 'field' => 'primary_obligator')
);

$num_processes_defendant = 0;
$num_processes_demanding = 0;
if(isset($register->judicial_processes)){
    $num_processes_defendant = sizeof($register->judicial_processes->defendant);
    $num_processes_demanding = sizeof($register->judicial_processes->demanding);
}

$num_ministry_education = 0;
if($register->min_educacion){
    $num_ministry_education = sizeof($register->min_educacion);
}

$num_senescyt = 0;
if($register->senescyt){
    $num_senescyt = sizeof($register->senescyt);
}

$num_ant = 0;
if($register->ant){
    $num_ant = sizeof($register->ant);
}

$number_items = array(
    'num_processes_defendant' => $num_processes_defendant,
    'num_processes_demanding' => $num_processes_demanding,
    'num_ministry_education' => $num_ministry_education,
    'num_senescyt' => $num_senescyt,
    'num_ant' => $num_ant,
);

$dataBody['types_alerts_message'] = $types_alerts_message;
$dataBody['header_participants'] = $header_participants;
$dataBody['number_items'] = $number_items;

$urlBody = __DIR__ . '/templates/report/template.php';
$html = $view->print_view($urlBody, $dataBody);

$evaluated_name = clear_special_characters($register->name);
$evaluated_name = trim($evaluated_name);
$evaluated_name = str_replace(' ', '_', $evaluated_name);
$mpdf->WriteHTML($styles, \Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->WriteHTML($html, \Mpdf\HTMLParserMode::HTML_BODY);
$path_pdf = 'pdfs/report_'.$evaluated_name.'.pdf';
$mpdf->Output(__DIR__ .'/'.$path_pdf, \Mpdf\Output\Destination::FILE);

$url_delete = __DIR__ .'/tmp/*.png';
array_map('unlink', glob($url_delete));

$url_delete = __DIR__ .'/tmp/*.svg';
array_map('unlink', glob($url_delete));

echo json_encode($path_pdf);