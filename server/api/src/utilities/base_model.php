<?php

class BaseModel 
{
    public $db;
    public $conection;
    public $table;

    public function __construct() {
        $this->db = new DB();
        $this->conection = $this->db->conectionDB();
    }

    public function sendMessage($status, $message){
        return array(
            'status' => $status,
            'text' => $message
        );
    }

    public function getAll () {
        $return = '';
        $sql = "SELECT * FROM {$this->table}";
        try{
            $row = $this->conection->query($sql);
            if($row->rowCount() > 0){
                $records = $row->fetchAll(PDO::FETCH_OBJ);
                $return = $records;
            }else{
                $return = $this->sendMessage(0, 'No existe registros en la BBDD');
            }
            $row = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = $this->sendMessage(0, $e->getMessage());
        }
        return $return;
    }

    public function get_by_field ($field, $id) {
        $return = '';
        $sql = "SELECT * FROM {$this->table} WHERE $field = ?";
        
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute([$id])) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = $this->sendMessage(1, $records[0]);
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

    public function insert ($data, $author_id) {
        $fields = $values = '';
        $values_sql = array();
        foreach($data as $field => $value){
            $value = ltrim($value,' ');
            $value = rtrim($value,' ');
            $fields .= $field.',';
            $values .= '?,'; 
            $values_sql[] = $value;
        }

        $fields .= 'create_at,update_at,last_updated_by';
        $values .= '?,?,?';
        $values_sql[] = date('Y-m-d H:i:s');
        $values_sql[] = date('Y-m-d H:i:s');
        $values_sql[] = $author_id;

        $sql = "INSERT INTO {$this->table} ($fields) VALUES ($values)";
        try{
            $result = $this->conection->prepare($sql);
            if ($result->execute($values_sql)) {
                if($result->rowCount() > 0){
                    $return = $this->sendMessage(1, 'Ingresado con exito');
                }else{
                    $return = $this->sendMessage(0, 'Ocurrio un error al insertar el registro');
                }
            }
            $result = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = $this->sendMessage(0, $e->getMessage());
        }
        return $return;
    }

    public function insert_batch ($data, $author_id) {

        $fields = '';
        $fields_array = array();
        foreach($data[0] as $field => $value){
            $fields .= $field.',';
            $fields_array[] = $field;
        }

        $fields .= 'create_at,update_at,last_updated_by';

        $sql = "INSERT INTO {$this->table} ($fields) VALUES ";
        $values_sql = array();
        foreach($data as $item){
            $values = '';
            if(is_object($item)){
                $item = (array)$item;
            }
            $row_sql = array();
            foreach($fields_array as $field){
                $value = ltrim($item[$field],' ');
                $value = rtrim($value,' ');
                $values .= "?,";
                $row_sql[] = $value;
            }

            $values .= '?,?,?';
            $row_sql[] = date('Y-m-d H:i:s');
            $row_sql[] = date('Y-m-d H:i:s');
            $row_sql[] = $author_id;

            $values_sql[] = $row_sql;
            $sql .= "($values)";
        }
        $stmt = $this->conection->prepare($sql);
        try {
            $this->conection->beginTransaction();
            foreach ($values_sql as $row){
                $stmt->execute($row);
            }
            $this->conection->commit();
            $return = $this->sendMessage(1, 'Ingresado con exito');
        }catch (Exception $e){
            $this->conection->rollback();
            $return = $this->sendMessage(0, $e->getMessage());
        }
        
        return $return;
    }

    public function update ($field, $id, $data, $author_id) {
        $fields = array_keys($data);
        $values = array_values($data);
        $values_sql = array();
        $sql = "UPDATE {$this->table} SET";
        foreach ($fields as $index => $field_data){
            $value = ltrim($values[$index],' ');
            $value = rtrim($value,' ');
            $values_sql[] = $value;
            $sql .= " $field_data = ? ,";
        }
        $current_date = date('Y-m-d H:i:s');
        $sql .= " update_at = '$current_date', last_updated_by = ?";
        $sql .= " WHERE $field = ? ";

        $values_sql[] = $author_id;
        $values_sql[] = $id;
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute($values_sql)) {
                $return = $this->sendMessage(1, 'Actualizado con exito');
            }
            $result = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = $this->sendMessage(0, $e->getMessage());
        }
        return $return;
    }

    public function delete ($field, $value){
        $sql = "DELETE FROM {$this->table} WHERE $field = ?";
        try{
            
            $result = $this->conection->prepare($sql);
            $result->execute([$value]);
            if($result->rowCount() > 0){
                $return = $this->sendMessage(1, 'Eliminado con exito');
            }else{
                $return = $this->sendMessage(2, 'No existe el registro para ser eliminado');
            }

            $result = null;
            $this->db = null;
        }catch(PDOException $e){
            $message_error = $e->getMessage();
            if(strpos($e->getMessage(), 'SQLSTATE[23000]') !== false){
                $message_error = 'El registro no se puede borrar ya que esta siendo usado en otra tabla';
            }
            $return = $this->sendMessage(0, $message_error);
        }
        return $return;
    }

    public function validateRepeat ($field_id, $id, $field, $value) {
        $return = false;
        $sql = "SELECT * FROM {$this->table} WHERE $field = ? AND $field_id != ?";
        try{
            
            $row = $this->conection->prepare($sql);
            if ($row->execute([$value, $id])) {
                if($row->rowCount() > 0){
                    $return = false;
                }else{
                    $return = true;
                }
            }
            $row = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = false;
        }
        return $return;
    }

    public function get_insert_id(){
        return $this->conection->lastInsertId();
    }
}
