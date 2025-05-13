<?php

class RulesModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'rules';
    }

    public function get_rules(){
        return $this->getAll();
    }

    public function get_rule_by_id($id){
        return $this->get_by_field ('id', $id);
    }

    public function get_rules_consultations($consultation_id){
        $sql = "SELECT r.id, r.consultations_items_id, ci.name AS consultations_items_name, 
                ci.group, r.alert, r.review, r.clean, r.informative
                FROM rules r, consultations_items ci
                WHERE r.consultations_items_id = ci.id
                AND ci.status = 1
                AND ci.consultations_id = ?";
        
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$consultation_id])) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = $this->sendMessage(1, $records);
                }else{
                    $return = $this->sendMessage(0, 'No existe registros en la BBDD');
                }
            }
            $row = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = $this->sendMessage(0, $e->getMessage());
        }
        return $return;
    }
}