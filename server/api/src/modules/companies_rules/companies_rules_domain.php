<?php

class CompaniesRulesDomain
{
    private $consultations_model;
    private $companies_rules_model;
    private $rules_model;
    private $users_model;

    public function __construct() {
        $this->consultations_model = new ConsultationsModel();
        $this->companies_rules_model = new CompaniesRulesModel();
        $this->rules_model = new RulesModel();
        $this->users_model = new UsersModel();
    }

    public function get_rules($company_id){
        $consultations = $this->consultations_model->get_consultations();
        if($consultations['status'] == 1){
            $result = array();
            foreach($consultations['text'] as $consultation){
                $rules = $this->companies_rules_model->get_rules_company($consultation->id, $company_id);
                if($rules['status'] == 0){
                    $rules = $this->rules_model->get_rules_consultations($consultation->id);
                    foreach($rules['text'] as $rule){
                        $rule->id = 0;
                    }
                }
                if($rules['status'] == 1){
                    $consultation->items = $rules['text'];
                }
                $result[] = $consultation;
            }
            return $result;
        }
        return $consultations;
    }

    public function save($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            $count_save_error = 0;
            $message_error = '';
            foreach($data['data'] as $item){
                if($item['id'] == 0){
                    $result_add = $this->create_rule($item, $user['text']->id);
                    if($result_add['status'] == 0){
                        $count_save_error++;
                        $message_error .= $item['consultations_items_id'].',';
                    }
                }else{
                    $result_update = $this->update_rule($item['id'], $item, $user['text']->id);
                    if($result_update['status'] == 0){
                        $count_save_error++;
                        $message_error .= $item['consultations_items_id'].',';
                    }
                }
        
            }
            $result = $this->rules_model->sendMessage(0, 'Error en los items: '.$message_error);
            if ($count_save_error == 0){
                $result = $this->rules_model->sendMessage(1, 'Registros guardados correctamente');
            }
            return $result;
        }
        return $user;
    }

    protected function create_rule($data, $author_id){
        $user_data = array(
            'consultations_items_id' => $data['consultations_items_id'],
            'company_id' => $data['company_id'], 
            'alert' => $data['alert'], 
            'review' => $data['review'], 
            'clean' => $data['clean'], 
            'informative' => $data['informative'] 
        );
        return $this->companies_rules_model->insert($user_data, $author_id);
    }

    protected function update_rule($id, $data, $author_id){
        $user_data = array(
            'alert' => $data['alert'], 
            'review' => $data['review'], 
            'clean' => $data['clean'], 
            'informative' => $data['informative'] 
        );
        return $this->companies_rules_model->update('id', $id, $user_data, $author_id);
    }
}