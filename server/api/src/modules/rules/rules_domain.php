<?php

class RulesDomain
{
    private $consultations_model;
    private $rules_model;
    private $consultations_items_model;
    private $users_model;

    public function __construct() {
        $this->consultations_model = new ConsultationsModel();
        $this->rules_model = new RulesModel();
        $this->consultations_items_model = new ConsultationsItemsModel();
        $this->users_model = new UsersModel();
    }

    public function get_rules(){
        $consultations = $this->consultations_model->get_consultations();
        if($consultations['status'] == 1){
            $result = array();
            foreach($consultations['text'] as $consultation){
                $rules = $this->rules_model->get_rules_consultations($consultation->id);
                if($rules['status'] == 0){
                    $rules = $this->get_rules_empty($consultation->id);
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

    protected function get_rules_empty($consultation_id){
        $result = array();
        $consultation_items = $this->consultations_items_model->get_from_rules($consultation_id);
        if($consultation_items['status'] == 1){
            foreach($consultation_items['text'] as $consultation){
                $consultation->consultations_items_id = $consultation->id;
                $consultation->consultations_items_name = $consultation->name;
                $consultation->id = 0;
                $consultation->alert = 0;
                $consultation->review = 0;
                $consultation->clean = 0;
                $consultation->informative = 0;
                $result[] = $consultation;
            }
            return array('status' => 1, 'text' => $result);
        }
        return $consultation_items;
    }

    protected function create_rule($data, $author_id){
        $user_data = array(
            'consultations_items_id' => $data['consultations_items_id'], 
            'alert' => $data['alert'], 
            'review' => $data['review'], 
            'clean' => $data['clean'], 
            'informative' => $data['informative'] 
        );
        return $this->rules_model->insert($user_data, $author_id);
    }

    protected function update_rule($id, $data, $author_id){
        $user_data = array(
            'alert' => $data['alert'], 
            'review' => $data['review'], 
            'clean' => $data['clean'], 
            'informative' => $data['informative'] 
        );
        return $this->rules_model->update('id', $id, $user_data, $author_id);
    }
}