<?php

class CompaniesDomain
{
    private $companies_model;
    private $contracts_model;
    private $users_model;

    public function __construct() {
        $this->companies_model = new CompaniesModel();
        $this->contracts_model = new ContractsModel();
        $this->users_model = new UsersModel();
    }

    public function get_companies(){
        $companies = $this->companies_model->get_companies();
        if($companies['status'] == 1){
            $companies_result = array();
            foreach($companies['text'] as $company){
                $count_contracts = $this->contracts_model->count_contracts_company($company->id);
                $company->num_contracts = $count_contracts;
                $companies_result[] = $company;
            }
            $result = $this->companies_model->sendMessage(1, $companies_result);
        }else{
            $result = $companies;
        }
        return $result;
    }

    public function update_status($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            $this->users_model->update_status_company($data['id'], $data['status'], $user['text']->id);
            return $this->companies_model->update_status($data['id'], $data['status'], $user['text']->id);
        }
        return $user;
    }
}