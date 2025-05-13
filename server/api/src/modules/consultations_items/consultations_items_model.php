<?php

class ConsultationsItemsModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'consultations_items';
    }

    public function get_consultations_items(){
        return $this->getAll();
    }   

    public function get_from_rules($consultations_id){
        $sql = "SELECT ci.id, ci.name, ci.group
                FROM consultations_items ci 
                WHERE ci.consultations_id = ?
                AND ci.status = 1
                ORDER BY ci.id ASC";
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$consultations_id])) {
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
}