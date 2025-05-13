<?php

class ContractsModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'contracts';
    }
    
    public function get_contracts(){
        $sql = "SELECT ct.id, ct.company_id, c.name AS company_name, ct.name, ct.credits, ct.credits_available,
            ct.date_ini, ct.date_end, ct.additional, ct.type, ct.status, ct.month_value, ct.year_value
            FROM contracts ct, companies c
            WHERE ct.company_id = c.id 
            AND c.status = 1 
            AND ct.credits_available > 0
            AND ct.additional_available > 0";

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

    public function count_contracts_company($company_id){
        $sql = "SELECT COUNT(*) AS num_data 
            FROM {$this->table} 
            WHERE company_id = ? 
            AND status = 1 
            ORDER BY id DESC";
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$company_id])) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = $this->sendMessage(1, $records[0]->num_data);
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

    public function get_contracts_company($company_id){
        $sql = "SELECT * FROM {$this->table} 
            WHERE company_id = ? 
            AND status = 1 
            ORDER BY id DESC";
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$company_id])) {
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

    public function get_contract_by_id($id){
        return $this->get_by_field ('id', $id);
    }

    public function get_firts_contract_company($company_id){
        $current_date = date('Y-m-d H:i:s');
        $sql = "SELECT * FROM {$this->table} 
            WHERE company_id = ? 
            AND status = 1 
            AND date_end >= '$current_date'
            ORDER BY date_ini";
        // var_dump($sql);
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$company_id])) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = $this->sendMessage(1, $records[0]);
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
    
    public function update_status($id, $status, $author_id){
        $data = array('status' => $status);
        return $this->update('id', $id, $data, $author_id);
    }

    public function consume_credit($id, $credits, $author_id){
        $contract = $this->get_by_field ('id', $id);
        if($contract['status'] == 1){
            $data = array();
            if ($contract['text']->credits_available > 0){
                $contract['text']->credits_available = $contract['text']->credits_available - $credits;
                $data = array('credits_available' => $contract['text']->credits_available);
            }else{
                $contract['text']->additional_available = $contract['text']->additional_available - $credits;
                $data = array('additional_available' => $contract['text']->additional_available);
            }
            $this->update('id', $id, $data, $author_id);
            return $this->get_by_field ('id', $id);
        }else{
            return $contract;
        }
    }
}