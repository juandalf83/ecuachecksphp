<?php

class ConsultationsModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'consultations';
    }

    public function get_consultations(){
        $sql = "SELECT c.id, c.name, c.field, o.name AS organisms_name, c.section
                FROM consultations c, organisms o
                WHERE c.organisms_id = o.id
                AND c.status = 1
                ORDER BY c.position";
        
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute()) {
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