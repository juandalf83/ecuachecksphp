<?php

class UsersModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'users';
    }

    public function exists_user_by_email($email){
        $sql = "SELECT * FROM {$this->table} WHERE email = ?";
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$email])) {
                if($row->rowCount() > 0){
                    // $records = $row->fetchAll(PDO::FETCH_OBJ);
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

    public function get_user_by_id($id){
        return $this->get_by_field ('id', $id);
    }

    public function get_user_by_email($email){
        return $this->get_by_field ('email', $email);
    }

    public function get_user_by_token($token){
        $return = '';
        $sql = "SELECT u.id, u.email, u.phone, u.token, u.status, u.rol_id, u.company_id, 
            c.name AS company_name, r.name AS rol_name 
            FROM users u, companies c, roles r
            WHERE u.rol_id = r.id
            AND u.company_id = c.id
            AND token = ?";
        
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$token])) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = $this->sendMessage(1, $records[0]);
                }else{
                    $return = $this->sendMessage(0, 'Su sesion a caducado, salga del sistema y vuelva a ingresar para intentarlo de nuevo');
                }
            }
            $row = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = $this->sendMessage(0, $e->getMessage());
        }
        return $return;
    }

    public function get_users_company($company_id){
        $return = '';
        $sql = "SELECT u.id, u.email, r.name AS rol_name, u.phone, u.status, u.rol_id 
                FROM users u, roles r 
                WHERE u.rol_id = r.id
                AND u.company_id = ?";
        
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$company_id])) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = $this->sendMessage(1, $records);
                }else{
                    $return = $this->sendMessage(0, 'Su sesion a caducado, salga del sistema y vuelva a ingresar para intentarlo de nuevo');
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

    public function update_status_company($company_id, $status, $author_id){
        $data = array('status' => $status);
        return $this->update('company_id', $company_id, $data, $author_id);
    }

    public function get_random_password(){
        $charters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz";
        $max = strlen($charters) - 1;
        $pass = "";
        for ($i=0; $i < 10; $i++) { 
            $pass .= substr($charters, rand(0, $max), 1);
        }
        return $pass;
    }
}