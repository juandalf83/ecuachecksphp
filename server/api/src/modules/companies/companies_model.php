<?php

class CompaniesModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'companies';
    }

    public function get_companies(){
        $return = '';
        $current_date = date('Y-m-d H:i:s');
        $sql = "SELECT cp.id, cp.name, u.id AS user_id, u.email AS user_name, u.phone AS user_phone,
                cp.create_at, SUM(ct.credits) AS credits_company, SUM(ct.credits_available) AS credits_available,
                cp.status
                FROM companies cp, contracts ct, users u, plans p
                WHERE cp.id = ct.company_id
                AND ct.plan_id = p.id
                AND u.rol_id = 2
                AND ct.date_end >= '$current_date'
                AND ct.status != 0
                GROUP BY cp.id";
        
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

    public function exists_company_by_name($name){
        $sql = "SELECT id FROM {$this->table} WHERE name = ?";
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$name])) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = true;                
                }else{
                    $return = false;
                }
            }
            $row = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = $this->sendMessage(0, $e->getMessage());
        }
        return $return;    
    }

    public function update_status($id, $status, $author_id){
        $data = array('status' => $status);
        return $this->update('id', $id, $data, $author_id);
    }
}