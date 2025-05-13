<?php

class PlansModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'plans';
    }

    public function get_plans(){
        $sql = "SELECT * FROM {$this->table} WHERE free = 0";
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute()) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = $this->sendMessage(1, $records);
                }else{
                    $return = $this->sendMessage(0, 'No existe registros en la base de datos');
                }
            }
            $row = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = $this->sendMessage(0, $e->getMessage());
        }
        return $return;
    }

    public function get_plan_by_id($id){
        return $this->get_by_field ('id', $id);
    }

    public function update_status($id, $status, $author_id){
        $data = array('status' => $status);
        return $this->update('id', $id, $data, $author_id);
    }
}