<?php

class PlansDomain
{
    private $plans_model;
    private $users_model;
    
    public function __construct() {
        $this->plans_model = new PlansModel();
        $this->users_model = new UsersModel();
    }

    public function update_status($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            return $this->plans_model->update_status($data['id'], $data['status'], $user['text']->id);
        }
        return $user;
    }

    public function save($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            if($data['id'] == '0'){
                $result = $this->create_plan($data['data'], $user['text']->id);
            }else{
                $result = $this->update_plan($data['id'], $data['data'], $user['text']->id);
            }
            return $result;
        }
        return $user;
    }

    protected function create_plan($data, $author_id){
        $date_ini = date('Y-m-d H:i:s');
        $date_end = date("Y-m-d H:i:s",strtotime($date_ini."+ 1 year"));
        $plan_data = array(
            'name' => $data['name'], 
            'credits' => $data['credits'],
            'status' => 1, 
            'month_value' => $data['month_value'], 
            'year_value' => $data['year_value'], 
            'additional' => $data['additional'], 
            'additional_value' => $data['additional_value'], 
            'date_ini' => $date_ini, 
            'date_end' => $date_end, 
            'free' => 0,
        );
        return $this->plans_model->insert($plan_data, $author_id);
    }

    protected function update_plan($id, $data, $author_id){
        $plan_data = array(
            'name' => $data['name'], 
            'credits' => $data['credits'],
            'month_value' => $data['month_value'], 
            'year_value' => $data['year_value'], 
            'additional' => $data['additional'], 
            'additional_value' => $data['additional_value'] 
        );
        return $this->plans_model->update('id', $id, $plan_data, $author_id);
    }
}