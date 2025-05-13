<?php

class QueryDomain
{
    private $url_api;

    public function __construct() {
        $this->url_api = 'http://localhost:8088/scrappers/';
    }

    public function run_query($data){
        $curl = curl_init();
        $path_api = $this->url_api.'run/'.$data['search_id'].'?targets='.$data['targets'];

        curl_setopt_array($curl, array(
            CURLOPT_URL => $path_api,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    public function status_query($task_id){
        $curl = curl_init();
        $path_api = $this->url_api.'status/'.$task_id;

        curl_setopt_array($curl, array(
            CURLOPT_URL => $path_api,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_FRESH_CONNECT => true
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        // $result = json_decode($response);
        // if($result->remaining_tasks > 0){
        //     $response = $this->status_query($task_id);
        // }
        return $response;
    }

    public function data_query($task_id){
        $curl = curl_init();
        $path_api = $this->url_api.'data/'.$task_id;

        curl_setopt_array($curl, array(
            CURLOPT_URL => $path_api,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_FRESH_CONNECT => true
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }
}