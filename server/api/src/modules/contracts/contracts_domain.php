<?php

class ContractsDomain
{
    private $contracts_model;
    private $users_model;
    private $plans_model;

    public function __construct() {
        $this->contracts_model = new ContractsModel();
        $this->users_model = new UsersModel();
        $this->plans_model = new PlansModel();
    }
    
    public function update_status($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            return $this->contracts_model->update_status($data['id'], $data['status'], $user['text']->id);
        }
        return $user;
    }

    public function update_credits($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            $contracts = $this->contracts_model->get_contracts_company($data['data']->id);
            $add_credits = floatval($data['data']['add_credits']);
            // print_r($contracts['text'][0]->id, $add_credits, $data['author_id']);
            $additional = $contracts['text'][0]->additional + $add_credits;
            $additional_available = $contracts['text'][0]->additional_available + $add_credits;
            $data_update = array(
                'additional' => $additional,
                'additional_available' => $additional_available
            );
            return $this->contracts_model->update('id', $contracts['text'][0]->id, $data_update, $user['text']->id);
        }
        return $user;
    }

    public function create_contract_company($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            $plan = $this->plans_model->get_plan_by_id($data['plan_id']);
            if($plan['status'] == 1){
                $date_ini = date('Y-m-d H:i:s');
                $date_end = date("Y-m-d H:i:s",strtotime($current_date."+ 1 year")); 
                $credits = $plan['text']->credits;
                $additional = $plan['text']->additional;
                if( $data['type'] == 'A'){
                    $date_ini = date('Y-m-d H:i:s');
                    $credits = $plan['text']->credits * 12;
                    $additional = $plan['text']->additional * 12;
                }
    
                $contract_data = array(
                    'name' => $plan['text']->name,
                    'credits' => $credits,
                    'credits_available' => $credits,
                    'month_value' => $plan['text']->month_value, 
                    'year_value' => $plan['text']->year_value, 
                    'additional' => $additional, 
                    'additional_value' => $plan['text']->additional_value, 
                    'additional_available' => $additional,
                    'status' => 0, 
                    'date_ini' => $date_ini, 
                    'date_end' => $date_end, 
                    'company_id' => $data['company_id'], 
                    'plan_id' => $data['plan_id'],
                    'type' => $data['type'], 
                );
                
                $result = $this->contracts_model->insert($contract_data, $user['text']->id);
            }else{
                $result = $plan;
            }
        }
        return $result;
    }

    public function consume_credits($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            $contract = $this->contracts_model->get_firts_contract_company($data['company_id']);
            if($contract['status'] == 1){
                $contract_active = $contract['text'];
                $contract_update = $this->contracts_model->consume_credit($contract_active->id, 1, $user['text']->id);
                if ($contract_update['text']->credits_available == 0 || $contract_update['text']->additional_available > 0){
                    $this->contracts_model->update_status($contract_active->id, 2, $user['text']->id);
                }
                return array('status' => 1, 'text' => 'Registro actualizado correctamente');
            }
            return array('status' => 1, 'text' => 'No tiene creditos para la solitud');
        }
        return $user;
    }


    
}